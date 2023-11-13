// import 

const tripsElement = document.getElementById("trips");
const errorMessage = document.getElementById("errorMessage");
const totalSpentElement = document.getElementById("totalSpent"); 
const tripDestination = document.getElementById("tripDestination");
const estimatedCost = document.getElementById("estimatedCost");

const displayDestinationDropDown = (destinations) => {
  console.log("DESTINATIONS:", destinations)
  destinations.forEach((spot) => {
    tripDestination.innerHTML += `<option value="${spot.id}">${spot.destination}</option>`
  })
}

const setErrorMessage = (message) => {
  errorMessage.innerText = message
}

const displayUserTrips = (trips) => {
  console.log(trips)
  tripsElement.innerHTML = ""
  trips.forEach((trip, index) => {
    tripsElement.innerHTML += `
    <article>
      <h2>Trip #${index + 1}</h2>
      <dl>

        <dt>Date:</dt>
        <dd>${trip.date}</dd>

        <dt>Trip Duration:</dt>
        <dd>${trip.duration} days</dd>

        <dt>Status:</dt>
        <dd>${trip.status}</dd>

        <dt>Number of Travelers:</dt>
        <dd>${trip.travelers}</dd>

      </dl>
    </article>`
  })
}

const displayTotalSpentThisYr = (amount) => {
  totalSpentElement.innerText = `You've Spent $${amount} in ${new Date().getFullYear()}`
}

const updateEstimatedCost = (cost) => {
  estimatedCost.innerText = `Estimated Trip Cost: $${cost}`
}

export { displayUserTrips, setErrorMessage, displayTotalSpentThisYr, displayDestinationDropDown, updateEstimatedCost };