const remote = require("electron").remote;

const win = remote.getCurrentWindow();

// When document has loaded, initialise
document.onreadystatechange = (e) => {
  if (document.readyState == "complete") {
    handleWindowControls();
    tSwitch();
  }
};

window.onbeforeunload = (e) => {
  //If window is reloaded, remove win event listeners
  win.removeAllListeners();
};

function handleWindowControls() {
  document.getElementById("min-button").addEventListener("click", (e) => {
    win.minimize();
  });

  document.getElementById("max-button").addEventListener("click", (e) => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  document.getElementById("close-button").addEventListener("click", (e) => {
    win.close();
  });
}
