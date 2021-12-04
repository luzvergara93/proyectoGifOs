
let theme_options = document.getElementById("theme_options");
let search_suggestions = document.getElementById("search_suggestions");
let suggestion_boxes = document.getElementById("suggestion_boxes");
let logo = document.getElementById('logo');
let search = document.getElementById('text');
let gifResults = document.getElementById("gifResults");

localStorage.setItem("latestPage", "index");

//CREATE BLUE BUTTONS 
//let historial = [];

function blueTags() {
    
    let mainContainer = document.getElementById('filtershere');
    let blueButton = document.createElement('button');
    let search = document.getElementById('text').value;
    blueButton.id = "filter";

    let span = document.createElement('span');
    span.id = 'span'

    span.textContent = '#' + search;

    blueButton.appendChild(span);

    mainContainer.appendChild(blueButton);

    span.addEventListener("click", () => { 
     let newInput = span.textContent;
     search = newInput.substring(1);
     getSearchResults(); 
    });
    };




//CAJA DE SUGERENCIAS

let suggestion1 = document.getElementById("sug1");
let suggestion2 = document.getElementById("sug2");
let suggestion3 = document.getElementById("sug3");
let suggestionBox1 = document.getElementById("s1");
let suggestionBox2 = document.getElementById("s2");
let suggestionBox3 = document.getElementById("s3");

suggestion1.addEventListener('click', () => {
  search.value = suggestion1.textContent;
  getSearchResults();
});

suggestion2.addEventListener('click', () => {
  search.value = suggestion2.textContent;
  getSearchResults();
});

suggestion3.addEventListener('click', () => {
  search.value = suggestion3.textContent;
  getSearchResults();
});

// FUNCION BUSCAR GIFS //

async function getSearchResults() {

  document.getElementById('gifResults').innerHTML = "";

   let search = document.getElementById('text').value;
    //add(search);
    
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=vbFcNmiNq62XwGktK1ogdnsSTqoGKXrx&q=' + search + '&limit=25&offset=0&rating=G&lang=en'
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    for (let index=0; index < 25; index++ ) {
 
        const contenedor = document.getElementById('gifResults');

        let contenedorIndividual = document.createElement('div');
        contenedorIndividual.id = "contenedorIndividual";

        let newGif = document.createElement('img');
        newGif.setAttribute('class', 'images');
        newGif.id = "fixedImg";
        
        gifResults.appendChild(contenedorIndividual);
        contenedorIndividual.appendChild(newGif);

        newGif.src = datos.data[index].images.fixed_height_still.url;

        
        // cambiar imagen fija a gif 

        newGif.addEventListener("mouseenter", function(){
        newGif.src = datos.data[index].images.original.url;
        });

        newGif.addEventListener("mouseleave", function(){
          newGif.src = datos.data[index].images.fixed_height_still.url;
        });
       }

       document.getElementById('white_box').remove();
       document.getElementById('suggestion_boxes').remove();
       document.getElementById('trending_box').innerHTML = 'Resultados de ' +'"'+search+'"';
       document.getElementById('search_suggestions').remove();

       
      }
      

 
 /*     function add(search){
    filterContainer.unshift(search)
   } 
*/
  
// Funcion gifs sugeridos 

document.getElementById("text").addEventListener("keypress", function(){
    
   search_suggestions.style.display = "flex";
   let search_button = document.getElementById('search_button');
    search_button.style.backgroundColor =  '#F7C9F3';
    search_button.style.border = '1px solid #110038';
    search_button.style.boxShadow = 'inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF';
    search_button.style.color = '#110038';

    
    document.getElementById('lupa').remove();
    document.getElementById('lupa_active').style.display = 'block';
  

});

// FUNCION MENU DESPLEGABLE 

document.getElementById("arrow").addEventListener("click", function() {
  if (theme_options.style.display == "flex") {
    theme_options.style.display = "none";
  } else {
    theme_options.style.display = "flex";
  
}});
 


// TRENDING 




async function trending() {

  let url = 'https://api.giphy.com/v1/gifs/trending?api_key=vbFcNmiNq62XwGktK1ogdnsSTqoGKXrx&q=&limit=25&offset=0&rating=G&lang=en'
  const respuesta = await fetch(url);
  const trendingDatos = await respuesta.json();
  
  for (let index=0; index < 25; index++ ) {
  const contenedor = document.getElementById('gifResults');
  let contenedorIndividual = document.createElement('div');
  contenedorIndividual.id = "contenedorIndividual";

  let newGif = document.createElement('img');
  newGif.setAttribute('Class', 'images');
  newGif.id = 'trendingImg';


  contenedor.appendChild(contenedorIndividual);
  contenedorIndividual.appendChild(newGif);
  newGif.src = trendingDatos.data[index].images.original.url;

  let titleHover = document.createElement('div');
  titleHover.id = 'titleHover';

  contenedorIndividual.appendChild(titleHover);
  
 }
 
}

trending();


// CAMBIAR DE TEMA 


function swapStyleSheet(sheet) {
  document.getElementById('pagestyle').setAttribute('href', sheet);
  
  if (sheet == "styles/darkstyle.css"){
    logo.src = "images/night_logo.png";
  }else{
    logo.src = "images/day_logo.png"
  }
}


//FUNCION RANDOM GIFS


let suggestGifs = ['Cats', 'StarWars', 'Dogs', 'Simpsons', 'Sorry', 'Baby', 'Ducks', 'BreakingBad', '13Reasons', 'BugsBunny','Samoyed', 'Love', 'Music', 'Games', 'Movies', 'Netflix'];

async function randomGif(suggestion) {
    let url = 'https://api.giphy.com/v1/gifs/random?api_key=vbFcNmiNq62XwGktK1ogdnsSTqoGKXrx&tag=' + suggestion + '&rating=PG'; 
      const response = await fetch(url);
      const suggestionsData = await response.json();
      return suggestionsData;
      }
function suggest(suggestion) {
      suggestionsData = randomGif(suggestion);
      suggestionsData.then(response => {
        let innerContainer = document.createElement('div');
        innerContainer.setAttribute('class', 'innerContainer');

        let title = document.createElement("div");
        title.setAttribute('class','random_title');

        let content = document.createElement('p');
        content.textContent = '#' + suggestion;

        let close = document.createElement('img');
        close.setAttribute('src', 'images/button3.svg');
        close.id = "closeButton";
        //cerrar

        close.addEventListener('click', () => {
          innerContainer.remove();
          let index = Math.floor(Math.random() * (suggestGifs.length - 0)) + 0;
          suggest(suggestGifs[index]);
        });
    title.appendChild(content);
    title.appendChild(close);
    innerContainer.appendChild(title);
        let ctnImg = document.createElement('div');
        ctnImg.setAttribute('class','ctnImg');
        let img = document.createElement('div');
        img.setAttribute('class', 'img');
        img.style.background = "url(" + response.data.images.fixed_height.url + ") center center";
        img.style.backgroundSize = "cover";
        let btn = document.createElement("button");
        btn.setAttribute('class', 'verMas');
        btn.innerHTML = '<span> Ver más…</span>'
    btn.addEventListener('click', () => {
          search.value = suggestion;
          gifResults.innerHTML = "";
          getSearchResults();
    });
        img.appendChild(btn);
        ctnImg.appendChild(img);
        innerContainer.appendChild(ctnImg);
        suggestion_boxes.appendChild(innerContainer);
      });
    } 
  for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * (suggestGifs.length - 0)) + 0;
        suggest(suggestGifs[index]);
  }




//FUNCION HOVER

//EVENTS WHEN YOU CLICK THE SEARCH BUTTON 

document.getElementById("search_button").addEventListener("click", function(){

    getSearchResults();
    blueTags();
});





    
    