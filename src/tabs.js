// normal tab = ".tab"
// active tab = ".active"
// normal renderer = ".renderer"
// active renderer = ".render-active"
var TABS = [];
var key = 0;

function toggleTabs(e) {
  var tabValue = e.parentElement.getAttribute("data-value");

  if (e.parentElement.classList.contains("active")) {
    return;
  } else {
    for (var i of TABS) {
      if (i.key !== tabValue && i.tab.classList.contains("active")) {
        i.tab.classList.remove("active");
        i.rend.classList.remove("render-active");
      } else if (i.key === tabValue) {
        i.tab.classList.add("active");
        i.rend.classList.add("render-active");
      }
    }
  }
}

//newone
function closeTab(e) {
  var tabValue = e.parentElement.getAttribute("data-value");

  for (var i of TABS) {
    if (i.key === tabValue) {
      if (i.tab.classList.contains("active")) {
        i.tab.parentElement.removeChild(i.tab);
        i.rend.parentElement.removeChild(i.rend);
        // needs fix (not a effective solution!)
        if (TABS.length > 1 && TABS.indexOf(i) !== 0) {
          // if index not equals to 0 activate previous tab
          TABS[TABS.indexOf(i) - 1].tab.classList.add("active");
          TABS[TABS.indexOf(i) - 1].rend.classList.add("render-active");
        } else if (TABS.length > 1 && TABS.indexOf(i) === 0) {
          // if index equals to 0 activate next tab
          TABS[TABS.indexOf(i) + 1].tab.classList.add("active");
          TABS[TABS.indexOf(i) + 1].rend.classList.add("render-active");
        }
        TABS.splice(TABS.indexOf(i), 1);
      } else {
        i.tab.parentElement.removeChild(i.tab);
        i.rend.parentElement.removeChild(i.rend);
        TABS.splice(TABS.indexOf(i), 1);
      }
    }
  }
}

function addTab() {
  var rend = document.createElement("div");
  var tab = document.createElement("div");
  var close = document.createElement("button");
  var clickRegion = document.createElement("div");
  var pdfRenderer = document.createElement("div");
  var tabName = document.createElement("p");
  var index;

  for (var i of TABS) {
    if (i.tab.classList.contains("active")) {
      i.tab.classList.remove("active");
    }
    if (i.rend.classList.contains("render-active")) {
      i.rend.classList.remove("render-active");
    }
  }

  tabName.appendChild(document.createTextNode(`New Tab`));

  pdfRenderer.setAttribute("id", "pdf-renderer");

  close.appendChild(document.createTextNode(`\u2716`));
  close.setAttribute("onclick", "closeTab(this)");

  clickRegion.classList.add("click-region");
  clickRegion.setAttribute("onclick", "toggleTabs(this)");
  //clickRegion.appendChild(document.createTextNode(`tab ${key}`));

  tab.classList.add("tab", "active");
  tab.setAttribute("data-value", key);
  //tab.setAttribute("onclick","toggleTabs(this)");
  tab.appendChild(clickRegion);
  tab.appendChild(tabName);
  tab.appendChild(close);

  rend.classList.add("renderer", "render-active");
  rend.setAttribute("data-value", key);
  rend.appendChild(pdfRenderer);

  document.querySelector(".tabs").appendChild(tab);
  document.querySelector(".rens").appendChild(rend);
  TABS.push({ key: `${key}`, tab, rend });

  for (var i of TABS) {
    if (i.key === String(key)) {
      index = TABS.indexOf(i);
    }
  }
  uploadPdf(pdfRenderer, TABS, index);
  key++;
}
