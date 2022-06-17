// selectorer
const planetBtn = document.querySelector(".planet");
const speciesBtn = document.querySelector(".species");
const navBtn = document.querySelectorAll("nav button");
const vehiclesBtn = document.querySelector(".vehicles");
const starshipsBtn = document.querySelector(".starships");
const nextPage = document.querySelector(".next");
const prevPage = document.querySelector(".prev");
let page = 1;
let people = [];
let species = [];
// Page code
function loadPrevious() {
  if (page > 1) {
    page--;
  }
  if (page < 9) {
    nextPage.classList.remove("hidden");
  }
  if (page == 1) {
    prevPage.classList.add("hidden");
  }
  fetchInfo();
}
function loadNext() {
  if (page < 9) {
    page++;
  }
  if (page == 9) {
    nextPage.classList.add("hidden");
  }
  if (page > 1) {
    prevPage.classList.remove("hidden");
  }
  fetchInfo();
}

nextPage.addEventListener("click", loadNext);
prevPage.addEventListener("click", loadPrevious);


function eventListener() {
  document
    .querySelectorAll("li")
    .forEach((item) => item.addEventListener("click", renderCharacters));
}

function fetchInfo() {
  ulLoader(true);
  const items = document.querySelectorAll("li");
  if (items.length > 0) {
    items.forEach((item) => item.remove());
  }
  const list = document.querySelector("ul");
  const pageNumber = document.querySelector(".page-number");
  pageNumber.innerText = page;
  fetch(`https://swapi.dev/api/people/?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      people = data.results;
      for (let results of data.results) {
        let li = document.createElement("li");
        li.innerText = `${results.name}`;
        li.addEventListener("click", () => {
          li.classList.add("active");
          for (const li of document.querySelectorAll("li.active")) {
            li.classList.remove("active");
          }
          li.classList.add("active");
        });
        list.appendChild(li);
      }
      eventListener();
    })
    .catch((error) => {
      console.log("AN ERROR OCCURED!");
      console.log(error);
    })
    .finally(() => ulLoader(false));
}

function renderCharacters(event) {
  const char = people.find((p) => p.name === event.target.innerText);
  const details = document.querySelector(".details");
  details.innerHTML = `
            <div>  <h3>${char.name}</h3>
             <p>Height: ${char.height}cm</p>
             <p>Mass: ${char.mass}kg</p>
             <p>Hair color: ${char.hair_color}</p> 
             <p>Skin color: ${char.skin_color}</p> 
             <p>Eye color: ${char.eye_color}</p> 
             <p>Birth year: ${char.birth_year}</p> 
             <p>Gender: ${char.gender}</p> </div>
    `;
    // renderSpecies(char);
   renderPlanets(char);
    
}

/* async function renderSpecies(char){
  planetLoader(true);
  const planets = document.querySelector(".extraInfo");
  const div = planets.querySelector("div");
  if (div) {
    div.remove();
  }
  const specie = await fetch(char.species);
  const data = await specie.json();
  planets.insertAdjacentHTML(
    "beforeend",
    `<div>
<h3>${data.name}</h3>
   <p>Rotation_period: ${data.classification}</p> 
   <p>Orbital_period: ${data.designation}</p> 
   <p>Diameter: ${data.average_height}</p>  
   <p>Climate: ${data.average_lifespa}</p>  
  <p>Gravity: ${data.language} </p> 
   </div>
   `
  );
  planetLoader(false);
} */

async function renderPlanets(char) {
  planetLoader(true);
  const planets = document.querySelector(".extraInfo");
  const div = planets.querySelector("div");
  if (div) {
    div.remove();
  }
    const homeworld = await fetch(char.homeworld);
    const data = await homeworld.json();
      if (data.rotation_period == "unknown" || data.rotation_period == 0) {
        planets.insertAdjacentHTML(
          "beforeend",
          `<div>
      <h3>${data.name}</h3>
         <p>Rotation_period: ${data.rotation_period}</p> 
         <p>Orbital_period: ${data.orbital_period}</p> 
         <p>Diameter: ${data.diameter}</p>  
         <p>Climate: ${data.climate}</p>  
        <p>Gravity: ${data.gravity} </p> 
         <p>Terrian: ${data.terrain}</p>
         </div>
         `
        );
      } else {
        planets.insertAdjacentHTML(
          "beforeend",
          `<div>
     <h3>${data.name}</h3>
        <p>Rotation_period: ${data.rotation_period}h</p> 
        <p>Orbital_period: ${data.orbital_period} days</p> 
        <p>Diameter: ${data.diameter}km</p>  
        <p>Climate: ${data.climate}</p>  
       <p>Gravity: ${data.gravity} </p> 
        <p>Terrian: ${data.terrain}</p>
        </div>
        `
        );
      }
      planetLoader(false);
}
function ulLoader(loading) {
  const spinner = document.querySelector(".ul-loader");
  loading
    ? spinner.classList.remove("hidden")
    : spinner.classList.add("hidden");
}
function planetLoader(loading) {
  const spinner = document.querySelector(".info-loader");
  loading
    ? spinner.classList.remove("hidden")
    : spinner.classList.add("hidden");
}

function main() {
  fetchInfo();
  
}
main();
