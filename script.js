
const API_KEY = "2d854b40f9c840bc888f96b704655528";
const url = "https://newsapi.org/v2/everything?q=";


const bd = document.querySelector("body");
window.addEventListener("load", () => fetchNews("Jharkhand"));

function reload() {
    window.location.reload();
}


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
     
    if (articles.length === 0) {
        cardsContainer.innerHTML = `<h2> Sorry...</h2><h1> No news found for the given query.<h1/>`;
        bd.style.backgroundColor = "pink"
        return;
      }
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
// adding functionallity to  the enter button
document.addEventListener('keydown', function(event) {
   if (event.keyCode === 13) {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
  }
  });

  //for backgroud change 

// const btn = document.querySelector("#btn");
// btn.addEventListener("click", () => {
//      const colors = ["#ffe5ec", "#ffc2d1", "#ffb3c6", "#ff8fab", "#edede9", "#fb6f92"];
//     // const colors = ["#313336","#3c3f41"];
//     const randomIndex = Math.round(Math.random() * colors.length);
//     document.querySelector("body").style.backgroundColor = colors[randomIndex];   
//     document.querySelector("nav").style.backgroundColor = colors[randomIndex+1];   
  
//   });

// color theme change

  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const nav = document.getElementById("nav-light-theme")
  
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
  });
  
  nav.addEventListener('click', () => {
    body.classList.toggle('dark-nav-theme');
    body.classList.toggle('light-nav-theme');   
  });