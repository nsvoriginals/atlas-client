import { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import * as pdfjs from "pj"; // Import pdfjs to read PDFs

export const ResumeGenerator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedText, setParsedText] = useState<string>("");

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];

    if (uploadedFile && isValidFileType(uploadedFile)) {
      setFile(uploadedFile);
      parsePDF(uploadedFile);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && isValidFileType(uploadedFile)) {
      setFile(uploadedFile);
      parsePDF(uploadedFile);
    } else {
      alert("Only PDF files are allowed.");
    }
  };
 console.log(parsedText)
  const isValidFileType = (file: File) => {
    return file.type === "application/pdf";
  };

  const parsePDF = async (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      const pdfData = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item: any) => item.str).join(" ") + " ";
      }

      setParsedText(extractedText); // Save extracted text in state
    };
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
        <h1 className="text-lg font-semibold mb-4">Upload your Resume:</h1>

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer transition hover:border-blue-400"
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <BsCloudUpload className="text-blue-500 text-5xl mb-3" />
          <p className="text-gray-600">
            {file ? file.name : "Drag & Drop"} <br />
            or <span className="text-blue-500 cursor-pointer">browse</span>
          </p>
          <p className="text-gray-400 text-sm mt-2">Supports: PDF</p>
        </div>

        {/* Hidden File Input */}
        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Display Extracted Text */}
        {parsedText && (
          <div className="mt-4 p-4 border rounded bg-gray-50 text-sm text-gray-800">
            <h2 className="font-bold mb-2">Extracted Text:</h2>
            <p>{parsedText.substring(0, 500)}...</p> {/* Show first 500 chars */}
          </div>
        )}
      </div>
    </div>
  );
};
