const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  globalShortcut,
} = require("electron");

// creating window
function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 840,
    height: 620,
    icon: __dirname + "/img/x128icon.ico",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      //webviewTag: true,
    },
  });

  mainWindow.loadFile(__dirname + "/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
