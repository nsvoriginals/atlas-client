const pdfjsLib = require("pdfjs-dist");
const path = require("path");

// Set workerSrc manually for Node.js
pdfjsLib.GlobalWorkerOptions.workerSrc = path.join(
  __dirname,
  "node_modules/pdfjs-dist/build/pdf.worker.min.js"
);

async function GetTextFromPDF(pdfPath:string) {
  let doc = await pdfjsLib.getDocument(pdfPath).promise;
  let text = [];

  for (let i = 1; i <= doc.numPages; i++) {
    let page = await doc.getPage(i);
    let content = await page.getTextContent();
    
    let strings = content.items.map((item:any) => item.str);
    text.push(...strings);
  }

  return text;
}

module.exports = { GetTextFromPDF };
