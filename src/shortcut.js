const { globalShortcut } = remote;

globalShortcut.register("CommandOrControl+T", () => {
  addTab();
});

globalShortcut.register("CommandOrControl+W", () => {
  try {
    var currentTab = document.querySelector(".active").children[2];
    closeTab(currentTab);
  } catch (err) {
    console.log(err);
  }
});

globalShortcut.register("CommandOrControl+Q", () => {
  remote.app.quit();
});
