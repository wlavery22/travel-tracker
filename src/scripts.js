// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
console.log('This is the JavaScript entry file - your code begins here.');

import { fetchAPIcall, submitTripRequest } from "./apiCalls";

import { displayUserTrips, setErrorMessage, displayTotalSpentThisYr, displayDestinationDropDown, updateEstimatedCost } from "./domUpdates"; 
import { filterTripsByUser, getTotalSpentThisYr, getEstimatedCost, findDestinationById } from "./utils";

const loginButton = document.getElementById("loginSubmitButton");
const tripDestination = document.getElementById("tripDestination");
const estimateCostButton = document.getElementById("estimateCostButton");
const bookingFormSubmitButton = document.getElementById("bookingFormSubmitButton");

let userTrips 
let destinations
let globalUserId

// const login = (event) => {
//   event.preventDefault();
//   const username = document.getElementById("username");
//   const password = document.getElementById("password");
//   const loginError = document.getElementById("loginError");
//   if (username.value === "traveler50" && password.value === "travel") {
//     const userId = username.value.slice(-2)
//     loginError.innerHTML = ""
//     username.value = ""
//     password.value = ""
//     const login = document.getElementById("login");
//     login.classList.add("hidden")
//     const dashboard = document.getElementById("dashboard");
//     dashboard.classList.remove("hidden")
//     setupDashboard(userId)
//   } else {
//     loginError.innerHTML = `<p>Incorrect Username & Password, Please Try Again</p>`
//     username.value = ""
//     password.value = ""
//   } 
// }

const bypassLoginScreen = () => {
  const login = document.getElementById("login");
  login.classList.add("hidden")
  const dashboard = document.getElementById("dashboard");
  dashboard.classList.remove("hidden")
  setupDashboard("50")
}

const setupDashboard = (userId) => {
  // console.log(userId);
    globalUserId = parseInt(userId)
    Promise.all([
      fetchAPIcall("trips"),
      fetchAPIcall("destinations")
    ])
    .then((response) => {
      // getAllTripsByUser(50),
      userTrips = response
      console.log(userTrips)
      console.log("RESPONSE!:", response)
      destinations = response[1].destinations
      const usersTrips = filterTripsByUser(response[0].trips, parseInt(userId))
      userTrips = usersTrips
      displayUserTrips(usersTrips)
      const totalSpentThisYr = getTotalSpentThisYr(usersTrips, response[1].destinations)
      displayTotalSpentThisYr(totalSpentThisYr)
      console.log("RESPONSE!:", response)
      displayDestinationDropDown(response[1].destinations)
      // updateDOM()
      // getUserTotalCost() 
    })
    .catch((error) => setErrorMessage(error.message));
    }
    // const clearUserId = () => {
    //   localStorage.removeItem("userId");
    //   Promise.all([
    //     fetchAPIcall("activity"),
    //     fetchAPIcall("users"),
    //     fetchAPIcall("sleep"),
    //     fetchAPIcall("hydration"),
    //   ]).then((allData) => {
    //     updateDom(allData);
    //   });
    // };

// function getTripsByUserId(trips, userId) {
//   return trips.filter(trip => trip.userID === userId);
// }

// user gets destination on form, needed a dropdown menu, for destination element on HTML, we would need to map over the destination array, target destination array, .map to target destination key, pulling the values of the destination key, the name of the destination in string form, HTML select, options, to create a dropdown menu, give options a value, use an ID for that, the destination ID, user clicks name of destination in dropdown, we use ID to aid function in estimating the cost, 

const estimateCost = (event) => {
  event.preventDefault();
  const tripDestination = document.getElementById("tripDestination");
  const tripDate = document.getElementById("tripDate");
  const tripDuration = document.getElementById("tripDuration");
  const partySize = document.getElementById("partySize");
  // console.log(tripDestination.value, tripDate.value, tripDuration.value, partySize.value)
  const bookingObject = {
    id: parseInt(tripDestination.value),
    duration: tripDuration.value,
    travelers: partySize.value
  }
  const estimatedCost = getEstimatedCost(bookingObject, destinations)
  console.log(estimatedCost)
  updateEstimatedCost(estimatedCost)
}

const submitBooking = (event) => {
  event.preventDefault();
  const tripDestination = document.getElementById("tripDestination");
  const tripDate = document.getElementById("tripDate");
  const tripDuration = document.getElementById("tripDuration");
  const partySize = document.getElementById("partySize");
  const reformattedDate = tripDate.value.split("-").join("/");
  // console.log(userId)
  const bookingObject = {
    id: Date.now(),
    userID: globalUserId,
    destinationID: parseInt(tripDestination.value),
    travelers: parseInt(partySize.value),
    date: reformattedDate,
    duration: parseInt(tripDuration.value),
    status: "pending", 
    suggestedActivities: []
  }
  submitTripRequest(bookingObject)
    .then((response) => {
      console.log(response, userTrips)
      userTrips.push(response.newTrip)
      // fetch(get) updates the DOM, not the form input, function below needs to use the fetch, not the form input
      displayUserTrips(userTrips)
    })
}

loginButton.addEventListener("click", login);
estimateCostButton.addEventListener("click", estimateCost);
bookingFormSubmitButton.addEventListener("click", submitBooking);

window.addEventListener("load", function () {
  console.log("TEST")
  bypassLoginScreen()
});