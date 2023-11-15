import './css/styles.css';
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

const login = (event) => {
  event.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const loginError = document.getElementById("loginError");
  if (username.value === "traveler50" && password.value === "travel") {
    const userId = username.value.slice(-2)
    loginError.innerHTML = ""
    username.value = ""
    password.value = ""
    const login = document.getElementById("login");
    login.classList.add("hidden")
    const dashboard = document.getElementById("dashboard");
    dashboard.classList.remove("hidden")
    setupDashboard(userId)
  } else {
    loginError.innerHTML = `<p>Incorrect Username & Password, Please Try Again</p>`
    username.value = ""
    password.value = ""
  } 
}

const bypassLoginScreen = () => {
  const login = document.getElementById("login");
  login.classList.add("hidden")
  const dashboard = document.getElementById("dashboard");
  dashboard.classList.remove("hidden")
  setupDashboard("50")
}

const setupDashboard = (userId) => {
    globalUserId = parseInt(userId)
    Promise.all([
      fetchAPIcall("trips"),
      fetchAPIcall("destinations")
    ])
    .then((response) => {
      userTrips = response
      destinations = response[1].destinations
      const usersTrips = filterTripsByUser(response[0].trips, parseInt(userId))
      userTrips = usersTrips
      displayUserTrips(usersTrips)
      const totalSpentThisYr = getTotalSpentThisYr(usersTrips, response[1].destinations)
      displayTotalSpentThisYr(totalSpentThisYr)
      displayDestinationDropDown(response[1].destinations)
    })
    .catch((error) => setErrorMessage(error.message));
    }

const estimateCost = (event) => {
  event.preventDefault();
  const tripDestination = document.getElementById("tripDestination");
  const tripDate = document.getElementById("tripDate");
  const tripDuration = document.getElementById("tripDuration");
  const partySize = document.getElementById("partySize");
  const bookingObject = {
    id: parseInt(tripDestination.value),
    duration: tripDuration.value,
    travelers: partySize.value
  }
  const estimatedCost = getEstimatedCost(bookingObject, destinations)
  updateEstimatedCost(estimatedCost)
}

const submitBooking = (event) => {
  event.preventDefault();
  const tripDestination = document.getElementById("tripDestination");
  const tripDate = document.getElementById("tripDate");
  const tripDuration = document.getElementById("tripDuration");
  const partySize = document.getElementById("partySize");
  const reformattedDate = tripDate.value.split("-").join("/");
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
      setupDashboard(`${globalUserId}`)
    })
  const estimatedCost = document.getElementById("estimatedCost");
  partySize.value = ""
  tripDuration.value = ""
  tripDestination.value = ""
  tripDate.value = ""
  estimatedCost.innerText = ""
}

loginButton.addEventListener("click", login);
estimateCostButton.addEventListener("click", estimateCost);
bookingFormSubmitButton.addEventListener("click", submitBooking);

// window.addEventListener("load", function () {
//   // console.log("TEST")
//   bypassLoginScreen()
// });