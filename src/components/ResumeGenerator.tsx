import { useState } from "react";
import axios from "axios";
import { BsCloudUpload } from "react-icons/bs";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"; // Import the worker
import mammoth from "mammoth";

// Set the worker path for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const ResumeGenerator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && isValidFileType(selectedFile)) {
      setFile(selectedFile);
      setError(null); // Clear previous errors
      parseFile(selectedFile);
    } else {
      setError("Only PDF and DOCX files are allowed.");
    }
  };

  const isValidFileType = (file: File) => {
    return (
      file.type === "application/pdf" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    );
  };

  const parseFile = async (file: File) => {
    setLoading(true);
    try {
      if (file.type === "application/pdf") {
        await parsePDF(file);
      } else if (file.name.endsWith(".docx")) {
        await parseDOCX(file);
      }
    } catch (err) {
      setError("Failed to parse the file. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parsePDF = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ") + " ";
      }

      processExtractedText(text);
    };
    reader.readAsArrayBuffer(file);
  };

  const parseDOCX = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const result = await mammoth.extractRawText({ arrayBuffer: reader.result as ArrayBuffer });
      processExtractedText(result.value);
    };
    reader.readAsArrayBuffer(file);
  };

  const processExtractedText = (text: string) => {
    const extractedData = {
      name: extractName(text),
      email: extractEmail(text),
      phone: extractPhone(text),
      skills: extractSkills(text),
    };
    setParsedData(extractedData);
    sendToBackend(extractedData);
  };

  const extractName = (text: string): string => {
    const match = text.match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/);
    return match ? match[0] : "Unknown";
  };

  const extractEmail = (text: string): string => {
    const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    return match ? match[0] : "Not found";
  };

  const extractPhone = (text: string): string => {
    const match = text.match(/\+?\d[\d -]{8,}\d/);
    return match ? match[0] : "Not found";
  };

  const extractSkills = (text: string): string[] => {
    const keywords = ["JavaScript", "React", "Node.js", "Python", "Java", "C++"];
    return keywords.filter((skill) => text.includes(skill));
  };

  const sendToBackend = async (data: any) => {
    try {
      await axios.post("http://localhost:5000/resume", data);
      alert("Resume data sent to backend!");
    } catch (err) {
      setError("Error sending data to backend.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-lg font-semibold mb-4">Upload Your Resume:</h1>

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer transition hover:border-blue-400"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <BsCloudUpload className="text-blue-500 text-5xl mb-3" />
          <p className="text-gray-600">
            {file ? file.name : "Drag & Drop"} <br />
            or <span className="text-blue-500 cursor-pointer">browse</span>
          </p>
          <p className="text-gray-400 text-sm mt-2">Supports: PDF, DOCX</p>
        </div>

        <input
          id="fileInput"
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={handleFileSelect}
        />

        {loading && <p className="text-blue-500 text-center mt-4">Processing...</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {parsedData && (
          <div className="mt-4 p-4 border rounded bg-gray-50 text-sm text-gray-800">
            <h2 className="font-bold mb-2">Extracted Data:</h2>
            <p>
              <strong>Name:</strong> {parsedData.name}
            </p>
            <p>
              <strong>Email:</strong> {parsedData.email}
            </p>
            <p>
              <strong>Phone:</strong> {parsedData.phone}
            </p>
            <p>
              <strong>Skills:</strong> {parsedData.skills.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};