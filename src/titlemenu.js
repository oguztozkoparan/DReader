const { Menu, MenuItem } = remote;
const menu = new Menu();
const Store = require("electron-store");
const store = new Store();
// Build menu one item at a time, unlike
menu.append(
  new MenuItem({
    label: "Open",
    click() {
      addTab();
    },
    accelerator: "CommandOrControl+T",
  })
);
menu.append(
  new MenuItem({
    label: "Close Tab",
    click() {
      try {
        var currentTab = document.querySelector(".active").children[2];
        closeTab(currentTab);
      } catch (err) {
        console.log(err);
      }
    },
    accelerator: "CommandOrControl+W",
  })
);
menu.append(
  new MenuItem({
    label: "Settings",
    submenu: [
      {
        label: "Dark Mode",
        type: "checkbox",
        checked: store.get("theme.dark"),
        click(item) {
          if (item.checked) {
            store.set("theme.dark", true);
            tSwitch();
          } else {
            store.set("theme.dark", false);
            tSwitch();
          }
        },
      },
    ],
  })
);
menu.append(new MenuItem({ type: "separator" })); // separator for the menu
menu.append(
  new MenuItem({
    label: "Zoom in",
    role: "zoomin",
    //accelerator: "CommandOrControl++",
  })
);

menu.append(
  new MenuItem({
    label: "Zoom out",
    role: "zoomout",
    //accelerator: "CommandOrControl+-",
  })
);

menu.append(
  new MenuItem({
    label: "Reset zoom",
    role: "resetzoom",
    //accelerator: "CommandOrControl+0",
  })
);

menu.append(
  new MenuItem({
    label: "Dev Tools",
    click() {
      remote.getCurrentWindow().toggleDevTools();
    },
  })
);
menu.append(new MenuItem({ type: "separator" }));
menu.append(
  new MenuItem({
    label: "Exit",
    click() {
      win.close();
    },
    accelerator: "CommandOrControl+Q",
  })
);

// Prevent default action of right click in chromium. Replace with our menu.
document.getElementById("menu-button").addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
  },
  false
);
