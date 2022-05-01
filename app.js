// const serverUrl = "https://api.jikan.moe/v4/anime/";

// function getFinalUrl(id){
//     return serverUrl +"{" +id + "}";
// };

// function showAnime() {
//     fetch(getFinalUrl())
//      .then(response => response.json())
//      .then(json => {
//          const div = document.getElementsByClassName(".content-div");
//          div.innerHTML=`<img src=${json.images}>
//                         <h2>${json.title}</h2>
//                         <p> Episodes: ${json.episodes} <br>
//                             Rating: ${json.rating}<br>
//                             Rank: ${json.rank}</p>`
//      })
// };

//  for (var i = 0; i<2; i++) {
//      getFinalUrl(i);
//      showAnime();
//  };
// console.log("It should work!");
// console.log(getFinalUrl(2));

const btnSearch = document.querySelector('.btn');

const getAnime = async () => {
    const temp = await fetch(`https://api.jikan.moe/v4/top/anime?type=special&filter=bypopularity&page=1`)
        .then(res => res.json())
        .then(json => {
            json.data.forEach( (anime)=>{
                createAnimeCard(anime);
                
            });

            
        })
};
function createAnimeCard(anime) {
    const div = document.querySelector("#content-div");
    const animeCard = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h5");
    const aboutPara = document.createElement("p");
    const content = document.createElement("div");
    const synopsis = document.createTextNode(anime.synopsis.slice(0, 80)+"...");
    image.src = anime.images.jpg.image_url;
    title.innerHTML = anime.title;
    aboutPara.appendChild(synopsis);
    content.append(title, aboutPara);
    animeCard.classList.add('anime-card', 'col-3');
    animeCard.append(image, content);
    div.append(animeCard);

    // Styling
    animeCard.style.margin = "1rem";
    animeCard.style.maxWidth = "25vw";
    animeCard.style.border = "1px solid black";
}
getAnime();

function search() {
    const searchText = document.querySelector("input").value;
    console.log(searchText);
    fetch(`https://api.jikan.moe/v4/top/anime?q=` + searchText)
        .then(res => res.json())
        .then(json => {
            json.data.forEach( (anime)=>{
                createAnimeCard(anime);
            })
        })
};

btnSearch.addEventListener("click", search);
