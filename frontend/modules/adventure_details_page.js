import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let adventureId = search.split("=")
  console.log(search);
  // Place holder for functionality to work in the Stubs
  return adventureId[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url = `${config["backendEndpoint"]}/adventures/detail?adventure=${adventureId}`;
 
  try{
    let advDetails = await fetch(url)
    let data = await advDetails.json()
    return data;
  }
  catch(e){
    console.log(e)
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName = document.getElementById("adventure-name");
  adventureName.textContent = adventure.name;

  let adventureSubtitle = document.getElementById("adventure-subtitle");
  adventureSubtitle.textContent = adventure.subtitle;
  console.log(adventure.images);

  let images = document.getElementById("photo-gallery");
  adventure.images.forEach(element => {
       let img = document.createElement("img");
       img.setAttribute("src",element);
       img.setAttribute("alt",adventure.name);
       img.setAttribute("class", "activity-card-image");
       images.appendChild(img);
  });

  let adventureContent = document.getElementById("adventure-content");
  adventureContent.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let imag = document.getElementById("photo-gallery");
  imag.innerHTML = " ";

  let carousel = document.createElement("div");
  carousel.setAttribute("id","carouseIndicators");
  carousel.setAttribute("data-ride", "carousel");
  carousel.setAttribute("class", "carousel slide")

  let flag = 0;
  let ol = document.createElement("ol");
  ol.setAttribute("class", "carousel-indicators")
  let carouselInner = document.createElement("div");
  carouselInner.setAttribute("class", "carousel-inner")
  images.forEach(ele =>{

    if(flag == 0){
      let li =document.createElement("li");
      li.setAttribute("data-target","#carouseIndicators");
      li.setAttribute("data-slide-to", flag);
      li.setAttribute("class", "active");
      ol.appendChild(li);

      let carouselItem = document.createElement("div");
      carouselItem.setAttribute("class", "carousel-item active");
      let img = document.createElement("img")
      img.setAttribute("src",ele);
      img.setAttribute("class", "d-block w-100");
      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
      flag = flag+1;      
    }

    else{

    let li = document.createElement("li");
      li.setAttribute("data-target","#carouseIndicators");
      li.setAttribute("data-slide-to", flag);
      ol.appendChild(li);
      

      let carouselItem = document.createElement("div");
      carouselItem.setAttribute("class", "carousel-item");
      let img = document.createElement("img")
      img.setAttribute("src",ele);
      img.setAttribute("class", "d-block w-100");
      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);


    flag = flag+1;
    }
  });

  carousel.appendChild(ol);
  carousel.appendChild(carouselInner);
  imag.appendChild(carousel);
  let a1 = document.createElement("a")
  a1.setAttribute("class", "carousel-control-prev");
  a1.setAttribute("href", "#carouseIndicators")
  a1.setAttribute("role", "button");
  a1.setAttribute("data-slide", "prev");
  let span1 = document.createElement("span");
  span1.setAttribute("class", "carousel-control-prev-icon");
  span1.setAttribute("aria-hidden", "true");




}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);

  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display ="none";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
    document.getElementById("reservation-panel-available").style.display = "block";
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display ="block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log(persons);
  let value = adventure.costPerHead *persons;
  // console.log(value);
  document.getElementById("reservation-cost").textContent = value;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  document.getElementById("myForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = {
      adventure : adventure.id,
      name: e.target.name.value,
      date: e.target.date.value,
      person: e.target.person.value, 
    }
    console.log(formData);
    let response = await fetch(`${config.backendEndpoint}/reservations/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(formData)
    })
    let result = await response.json()
    if(result.success) alert('Success!');
    else alert('Failed!');
  })
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block"
  }
  else{
    document.getElementById("reserved-banner").style.display = "none"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
