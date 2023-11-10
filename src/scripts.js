// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
console.log('This is the JavaScript entry file - your code begins here.');

import { fetchAPIcall } from "./apiCalls";

const loginButton = document.getElementById("loginSubmitButton");

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
  console.log(userId)
}

loginButton.addEventListener("click", login);

window.addEventListener("load", function () {
  bypassLoginScreen()
});