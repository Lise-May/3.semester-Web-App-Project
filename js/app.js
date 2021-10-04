console.log("app.js is running!");

/*global variables*/
let _icons = [];

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
        <div class="line"></div>
      `;
    }
    document.querySelector('#icons-container').innerHTML = htmlTemplate;
}

//Filter
function filterByCategory(type) {
    if (type === "all") {
        appendIcons(_icons);
    } else {
        const results = _icons.filter(icon => icon.Category === type);
        appendIcons(results)
    }
}

function resetFilterByCategory() {
    document.querySelector("#filterByCategory").value = "all";
}

//vis detaljeret info om ikonet
function showDetailView(id) {
    const iconToShow = _icons.find(icon => icon.id === id);
    navigateTo("#/detail-view");
    document.querySelector("#detail-view-container").innerHTML = /*html*/`
      <img class="detaild_view_img" src="${iconToShow.img}">
      <article class="detaild_view_article">
        <h2 class="detaild_view_h2">${iconToShow.title}</h2>
        <h3 class="detaild_view_h3">${iconToShow.type}</h3>
        <p class="detaild_view_text">${iconToShow.description}</p>
      </article>
    `;
}