console.log("app.js is running!");

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
        <article class="choose_category_section" onclick="showDetailView(${icon.id})">
            <img class="choose_category_img" src="${icon.img}">
            <h3>${icon.title}</h3>
            <h4>${icon.type}</h4>
            <img class="choose_category_arrow" src="${icon.arrow}">
        </article>
      `;
    }
    document.querySelector('#icons-container').innerHTML = htmlTemplate;
}

//Filter funktioen sortBy
function sortBy(option) {
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
  
function sortByBlegning() {
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
    document.querySelector("#detail-view .title").innerHTML = iconToShow.icon;
    document.querySelector("#detail-view-container").innerHTML = /*html*/`
      <img class="icon_img_about" src="${iconToShow.img}">
      <article>
        <h2>${iconToShow.title}</h2>
        <h3>${iconToShow.type}</h3>
        <p class="description_icon_text">${iconToShow.description}</p>
      </article>
    `;
  }