import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("From init()")
  console.log(config);
  console.log(cities)

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  // const fetchData = await fetch("http://15.207.189.0:8082/cities")
  // const data = fetchData.json();
  let url = `${config["backendEndpoint"]}/cities`;
  const fetchData = await fetch(url).then(response => response.json()).catch(err => {
    console.log(err);
    return null;
  });
  return fetchData;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
   let mainDiv = document.getElementById("data")
   
   let col = document.createElement("div");
   col.setAttribute('class', 'col-lg-4 mb-4');
   
   let title = document.createElement("div");
   title.setAttribute('class','tile');

   let cityDiv = document.createElement("h5");
   cityDiv.setAttribute('class','tile-text');
   cityDiv.textContent = city;

   let cityText = document.createElement("p");
   cityText.setAttribute('class','tile-text');
   cityText.textContent = description;

   let a = document.createElement("a");
   a.setAttribute('id', city);
   a.setAttribute('href', `pages/adventures/?city=${city}`);
   a.setAttribute('id', id);

   let img = document.createElement("img");
   img.setAttribute('src', image);

   img.appendChild(a);
   title.appendChild(cityDiv);
   title.appendChild(cityText);
   title.appendChild(img);
   col.appendChild(title);
   mainDiv.appendChild(col);

}

export { init, fetchCities, addCityToDOM };
