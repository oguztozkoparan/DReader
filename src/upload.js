const path = require("path");

var exportUrl = "";

function uploadPdf(element, TABS, index) {
  //clearPage(); // first clear the page

  global.filepath = undefined;
  var { dialog } = remote;

  if (process.platform !== "darwin") {
    dialog
      .showOpenDialog({
        title: "Select the PDF File",
        defaultPath: path.join(__dirname),
        properties: ["openFile"],
        filters: [{ name: ".pdf", extensions: ["pdf"] }],
      })
      .then((file) => {
        //console.log(file.canceled);
        if (!file.canceled) {
          global.filepath = file.filePaths[0].toString();
          //console.log(global.filepath);
          exportUrl = global.filepath;
          document.querySelector(
            ".active"
          ).childNodes[1].innerText = filepath.split("\\")[
            filepath.split("\\").length - 1
          ];
          displayPdf(exportUrl, element); // call the display function
        } else {
          //console.log(index);
          if (!TABS[index].rend.children[0].hasChildNodes()) {
            closeTab(TABS[index].tab.children[2]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    dialog
      .showOpenDialog({
        title: "Select the PDF File",
        defaultPath: path.join(__dirname),
        filters: [
          {
            name: ".pdf",
            extensions: ["pdf"],
          },
        ],
        properties: ["openFile"],
      })
      .then((file) => {
        console.log(file.canceled);
        if (!file.canceled) {
          global.filepath = file.filePaths[0].toString();
          //console.log(global.filepath);
          exportUrl = global.filepath;
          displayPdf(exportUrl, element); // call the display function
        } else {
          //console.log(index);
          if (!TABS[index].rend.children[0].hasChildNodes()) {
            closeTab(TABS[index].tab.children[2]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
