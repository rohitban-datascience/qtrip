
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search);
  let city = search.split('=')
  return(city[1]); 
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  console.log(config["backendEndpoint"]);
  city = city.toLowerCase();
  let url = `${config["backendEndpoint"]}/adventures?city=${city}`;
  console.log(url);
  let adv = await fetch(url).then(response => response.json()).catch(err => {
    console.log(err)
    return null;
  });
  console.log(adv);
  return adv;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  function generateDOM(id,name,costPerHead,currency,image,duration,category){
    let mainDiv = document.getElementById("data");

  let col = document.createElement("div");
   col.setAttribute('class', 'col-lg-3 mb-4');

  let tile = document.createElement("div");
  tile.setAttribute('class',"activity-card");

  let categ = document.createElement("div");
   categ.setAttribute('style','z-index:1; position:absolute; top:20px; right:-9px; color:white; font-weight:bold; background-color: orangered; padding: 2px; padding-right: 10px; padding-bottom: 5px; width: 100px; text-align: end; border-top-left-radius: 10px; border-bottom-left-radius: 10px;letter-spacing: 1px; box-shadow: 5px 1px 5px grey;');
   categ.textContent = category;


   let url = `http:${config["backendEndpoint"].split(":")[1]}:8081/frontend/pages/adventures/detail/?adventure=${id}`;
   
  //  console.log(url);
   let a = document.createElement("a");
   a.setAttribute('href',url);
   a.setAttribute('id',id);
   a.setAttribute("style","height:100%; width:100%; overflow: hidden;")

  let img = document.createElement("img");
  img.setAttribute('class','img-adv');
  img.setAttribute('src',image);
  img.setAttribute('style','overflow: hidden;');

  a.appendChild(img);



  let div1 = document.createElement("div")
  div1.setAttribute("class", "descp")

  let nme = document.createElement("div");
  nme.textContent = name;

  let cost = document.createElement("div");
  cost.textContent = currency + " " + costPerHead;
  
  div1.setAttribute("style","display: flex; justify-content: space-between; width: 100%; padding-left: 10px; padding-right: 10px; font-weight: bold;")
  div1.appendChild(nme);
  div1.appendChild(cost);



  let div2 = document.createElement("div")
  div2.setAttribute("class", "descp");

  let duraText = document.createElement("div");
  duraText.textContent = "Duration";

  let duraTime = document.createElement("div");
  duraTime.textContent = duration +" " + "days";

  div2.setAttribute("style","display: flex; justify-content: space-between; width: 100%;padding-left: 10px; padding-right: 10px; font-weight: bold; ")
  div2.appendChild(duraText);
  div2.appendChild(duraTime);

  mainDiv.appendChild(col);
  col.appendChild(tile);
  tile.appendChild(categ);
  tile.appendChild(a);
  tile.appendChild(div1);
  tile.appendChild(div2);
  }
  
  adventures.forEach(ele => {
    generateDOM(ele.id, ele.name, ele.costPerHead, ele.currency, ele.image, ele.duration, ele.category)    
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let duraList = list.filter(ele => {
    let dura = ele.duration;
    console.log(dura)
    console.log(low);
    if(low == 12 && dura >= 12){
      console.log(ele);
      return ele;
    }
    if(dura >= low && dura <= high){
      console.log(ele);
      return ele;
    }
  })
  console.log(duraList)
  return duraList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let check = {}
  let modifiedList = []

  categoryList.forEach(ele => {
    check = list.filter(ele1 => {
      if(ele == ele1.category){
        return ele1;
      }
    })
    // console.log(check);
    check.forEach(ele => modifiedList.push(ele))
  })
  // console.log(modifiedList);
  return(modifiedList);

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    // console.log(filters.category);
    // console.log(filters.category.length);
    let modifiedList = [];
    if(filters.category.length >= 1){
      console.log(true)
      modifiedList = filterByCategory(list,filters.category);
      list = modifiedList;
    }
    // console.log(list); 
    // console.log(filters.duration.length) 
    // filters.duration = document.getElementById("duration-select").value;
    // console.log(filters.duration); 
  
    if(filters.duration.length > 0){
      let duration = filters.duration;
      duration = duration.split("-");
      let newlist = filterByDuration(list,duration[0], duration[1])
      list=newlist;      
    } 
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  console.log(localStorage);  
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(localStorage.getItem("filters"));
  console.log(`from the local storage ${filters}`);
  // Place holder for functionality to work in the Stubs
  return (filters);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  console.log("pills function")
  function generateInDOM(category){
    let mainDiv = document.getElementById("category-list");
    let pills = document.createElement("div");
    pills.setAttribute('style',"margin: 4px; padding: 5px; border: solid; border-radius: 20px; border-color: lightseagreen;");
    pills.textContent = category;
    mainDiv.appendChild(pills);
  }
  if(filters.category.length >0){
    let list = filters.category;
    console.log(list);
    list.forEach(ele => generateInDOM(ele))
  }
  document.getElementById("duration-select").selectedValue = filters.duration;
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
