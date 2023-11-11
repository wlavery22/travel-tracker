// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
console.log('This is the JavaScript entry file - your code begins here.');

import { fetchAPIcall } from "./apiCalls";

import { displayUserTrips, setErrorMessage, displayTotalSpentThisYr } from "./domUpdates"; 
import { filterTripsByUser, getTotalSpentThisYr } from "./utils";

const loginButton = document.getElementById("loginSubmitButton");

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
  // Total spent on trips this year, calculated from trips data, including a travel agent’s 10% fee
  // call function for fetch
  // update DOM to display userTrips and userTotalCost

// console.log(userTrips)

// function getTripsByUserId(trips, userId) {
//   return trips.filter(trip => trip.userID === userId);
// }


loginButton.addEventListener("click", login);

window.addEventListener("load", function () {
  console.log("TEST")
  bypassLoginScreen()
});