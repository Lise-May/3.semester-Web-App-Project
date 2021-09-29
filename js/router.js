console.log("router.js er oppe at gøre!");

/*global variables*/
let _icons = [];

/* --------------------------------------- NAV BAR ---------------------------------------------------*/
//alle ruter fra nav. "path": "id of page in DOM"
const routes = {
    "#/": "home",
    "#/camera": "camera",
    "#/search": "search",
    "#/washingSymbolFilter": "washingSymbolFilter",
};

//Ændre display til none for alle siderne
function hideAllPages() {
    let pages = document.querySelectorAll(".page");
    for (let page of pages) {
        page.style.display = "none";
    }
}

//Naviger til specifik side, givet fra pathnames
function navigateTo(pathname) {
    hideAllPages();
    const basePath = location.pathname.replace("index.html", "");
    window.history.pushState({}, pathname, basePath + pathname);
    document.querySelector(`#${routes[pathname]}`).style.display = "block";
    setActiveTab(pathname);
};

//sets active tabbar/ menu item
function setActiveTab(pathname) {
    let navLinks = document.querySelectorAll("nav a");
    for (let link of navLinks) {
        if (pathname === link.getAttribute("href")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }
}

//Tilføjer event til nav links og forhindrepreventing default anchor link event
function attachNavLinkEvents() {
    const navLinks = document.querySelectorAll(".nav-link");
    for (const link of navLinks) {
        link.addEventListener("click", function (event) {
            const path = link.getAttribute("href");
            navigateTo(path);
            event.preventDefault();
        });
    }
}

//Initialising router, kaller attachNavLinkEvents() og navigateTo()*/
function initRouter() {
    attachNavLinkEvents();

    let defaultPath = "#/";
    if (routes[location.hash]) {
        defaultPath = location.hash;
    }
    navigateTo(defaultPath);
}

initRouter();

/* --------------------------------------- Vaske symbol med filter side ---------------------------------------------------*/

//Fetches json data fra  the file icons.json
async function fetchData() {
    const response = await fetch('json/icons.json');
    const data = await response.json();
    _icons = data;
    console.log(_icons);
    appendIcons(_icons);
}
  
fetchData();

//definere appenIcons
function appendIcons(icons) {
    let htmlTemplate = "";
    for (let icon of icons) {
      htmlTemplate += /*html*/`
        <article onclick="showDetailView(${icons.id})">
            <img src="${icons.img}">
            <h3>${icons.title}</h3>
            <h4>${icons.type}</h4>
            <img src="${icons.arrow}">
        </article>
      `;
    }
    document.querySelector('#icons-container').innerHTML = htmlTemplate;
}

//Filter funktioen
function sortBy(option) { //orderBy hvis sortBy ikke vikre
    if (option === "vask") {
        sortByVask();
    } else if (option === "blegning") {
        sortByBlegning();
    } else if (option === "rensing") {
        sortByRensning();
    } else if (option === "tørring") {
        sortByTørring();
    } else if (option === "strygning") {
        sortByStrygning();
    } 
}
  
function sortByVask() {
    _icons.sort((icon1, icon2) => {
        return icon1.vask.localeCompare(icon2.vask);
    });
    appendIcons(_icons);
}
  
function sortByBlegnin() {
    _icons.sort((icon1, icon2) => {
        return icon1.blegning.localeCompare(icon2.blegning);
    });
    appendIcons(_icons);
}
  
function sortByRensning() {
    _icons.sort((icon1, icon2) => {
        return icon1.rensning.localeCompare(icon2.rensning);
    });
    appendIcons(_icons);
}

function sortByTørring() {
    _icons.sort((icon1, icon2) => {
        return icon1.tørring.localeCompare(icon2.tørring);
    });
    appendIcons(_icons);
}

function sortByStrygning() {
    _icons.sort((icon1, icon2) => {
        return icon1.strygning.localeCompare(icon2.strygning);
    });
    appendIcons(_icons);
}

//vis detaljeret info om ikonet
function showDetailView(id) {
    const iconToShow = _icons.find(icon => icon.id === id);
    navigateTo("detail-view");
    document.querySelector("#detail-view .title").innerHTML = iconToShow.model;
    document.querySelector("#detail-view-container").innerHTML = /*html*/`
      <img src="${iconToShow.img}">
      <article>
        <h2>${iconToShow.title}</h2>
        <h3>${iconToShow.type}</h3>
        <p>${iconToShow.description}</p>
      </article>
    `;
  }
  
