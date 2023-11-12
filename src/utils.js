



const filterTripsByUser = (trips, userID) => {
  const tripsByUser = trips.filter((trip) => {
    return userID === trip.userID
  })
  
  return tripsByUser
}

const getTotalSpentThisYr = (trips, destinations) => {
  const currentYear = new Date().getFullYear()
  const thisYearsTrips = trips.filter((trip) => {
    return new Date(trip.date).getFullYear() === currentYear
  }) 
  console.log(destinations)
  const spentThisYear = thisYearsTrips.reduce((acc, curr) => {
    const matchingDestination = destinations.find((spot) => {
      return spot.id === curr.id 
    })
    const spentOnLodging = curr.duration * matchingDestination.estimatedLodgingCostPerDay
    const spentOnFlights = curr.travelers * matchingDestination.estimatedFlightCostPerPerson
    return acc += spentOnLodging + spentOnFlights
  }, 0)
  return spentThisYear * 1.1
}

const findDestinationById = (destinations, destinationId) => {
  const matchingDestination = destinations.find((spot) => {
    return spot.id === destinationId
  })
  return matchingDestination
}

// const destinationObject = findDestinationByName(destinations, destinationName)

const getEstimatedCost = (bookingObject, destinations) => {  
  const destinationObject = findDestinationById(destinations, bookingObject.id)
  console.log(bookingObject, destinationObject)
  const estimatedFlightCost = bookingObject.travelers * destinationObject.estimatedFlightCostPerPerson
  const estimatedLodgingCost = bookingObject.duration * destinationObject.estimatedLodgingCostPerDay
  const totalEstimatedCost = estimatedFlightCost + estimatedLodgingCost
  return totalEstimatedCost * 1.1
}

// "destinations": [
//   {
//   "id": 1,
//   "destination": "Lima, Peru",
//   "estimatedLodgingCostPerDay": 70,
//   "estimatedFlightCostPerPerson": 400,
//   "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
//   "alt": "overview of city buildings with a clear sky"

// need to grab the destination chosen from the DOM, the number of travelers, the number of days
// perhaps the best way would be to use a form to submit user's booking, when the submit button is clicked the POST function triggers, this should trigger the functions that do the calculations and update the DOM
// booking object:
// id: Date.now(), 
// userID: userID, 
// destinationID: booking.destinationID, 
// travelers: booking.travelers, 
// date: booking.date, 
// duration: booking.duration, 
// status: 'pending', 
// suggestedActivities: [],
// need to access the destination array, multiply cost per day by duration, multiply cost per flight by number of travelers, then get the sum of these and add 10% more to that
//    user enters destination, # of days, # of travelers
//    user clicks submit
//    call POST to add booking to trips array
//    need to iterate through the destinations array to find costs, flight and per day
//    need to mutiply those costs by # of travelers and days
//    get the total, then add 10%, then display on DOM 
export { filterTripsByUser, getTotalSpentThisYr, getEstimatedCost }

// user can choose date, duration(# days), # travelers, destination
// DOM display: after choosing, user should see estimated cost (with 10% travel agent fee)
// DOM display: after submitting (Posting), user should see “pending” 

// const getAllTripsByUser = (userID) => {
//   fetchAPIcall("trips").then((response) => {
//     console.log(response.trips)
//     const tripsByUser = response.trips.filter((trip) => {
//       return userID === trip.userID
//     })
//     console.log(tripsByUser)
//     return tripsByUser
//   })
// }