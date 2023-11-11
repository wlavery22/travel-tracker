// import 

const tripsElement = document.getElementById("trips");
const errorMessage = document.getElementById("errorMessage");
const totalSpentElement = document.getElementById("totalSpent");

const setErrorMessage = (message) => {
  errorMessage.innerText = message
}

const displayUserTrips = (trips) => {
  console.log(trips)
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

export { displayUserTrips, setErrorMessage, displayTotalSpentThisYr };