const pdfjs = require("pdfjs-dist");

pdfjs.GlobalWorkerOptions.workerSrc =
  "./node_modules/pdfjs-dist/build/pdf.worker.js";

var thePdf = null;
var scale = 1;

function displayPdf(url, element) {
  if (!isEmptyOrSpaces(url)) {
    pdfjs.getDocument(url).promise.then(function (pdf) {
      thePdf = pdf;
      viewer = element; //document.getElementById("pdf-renderer");
      for (page = 1; page <= pdf.numPages; page++) {
        canvas = document.createElement("canvas");
        canvas.className = "pdf-page-canvas";
        viewer.appendChild(canvas);
        renderPage(page, canvas);
      }
    });
  }
}

function renderPage(pageNumber, canvas) {
  thePdf.getPage(pageNumber).then(function (page) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const transform = [devicePixelRatio, 0, 0, devicePixelRatio, 0, 0];
    viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height * devicePixelRatio;
    canvas.width = viewport.width * devicePixelRatio;
    canvas.style.height = viewport.height + "px";
    canvas.style.width = viewport.width + "px";
    page.render({
      canvasContext: canvas.getContext("2d"),
      viewport: viewport,
      transform: transform,
    });
  });
}

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}
