



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

const getEstimatedCost = (booking, userID) => {  
}
// need to grab the destination chosen from the DOM, the number of travelers, the number of days
// perhaps the best 

export { filterTripsByUser, getTotalSpentThisYr }

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