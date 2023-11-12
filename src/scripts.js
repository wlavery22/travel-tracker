// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
console.log('This is the JavaScript entry file - your code begins here.');

import { fetchAPIcall } from "./apiCalls";

import { displayUserTrips, setErrorMessage, displayTotalSpentThisYr, displayDestinationDropDown } from "./domUpdates"; 
import { filterTripsByUser, getTotalSpentThisYr } from "./utils";

const loginButton = document.getElementById("loginSubmitButton");
const tripDestination = document.getElementById("tripDestination");

let userTrips 

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
    Promise.all([
      fetchAPIcall("trips"),
      fetchAPIcall("destinations")
    ])
    .then((response) => {
      // getAllTripsByUser(50),
      // userTrips = response
      // console.log(userTrips)
      console.log("RESPONSE!:", response)
      const usersTrips = filterTripsByUser(response[0].trips, parseInt(userId))
      displayUserTrips(usersTrips)
      const totalSpentThisYr = getTotalSpentThisYr(usersTrips, response[1].destinations)
      displayTotalSpentThisYr(totalSpentThisYr)
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

loginButton.addEventListener("click", login);

window.addEventListener("load", function () {
  console.log("TEST")
  bypassLoginScreen()
});