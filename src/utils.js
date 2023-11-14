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
  console.log(thisYearsTrips)
  const spentThisYear = thisYearsTrips.reduce((acc, curr) => {
    const matchingDestination = destinations.find((spot) => {
      console.log("SC:", curr)
      return spot.id === curr.destinationID 
    })
    console.log("MD:", matchingDestination)

    const spentOnLodging = curr.duration * matchingDestination.estimatedLodgingCostPerDay
    const spentOnFlights = curr.travelers * matchingDestination.estimatedFlightCostPerPerson
    return acc += spentOnLodging + spentOnFlights
  }, 0)
  console.log(spentThisYear)
  return (spentThisYear * 1.1).toFixed(2)
}

const findDestinationById = (destinations, destinationId) => {
  const matchingDestination = destinations.find((spot) => {
    return spot.id === destinationId
  })
  return matchingDestination
}

const getEstimatedCost = (bookingObject, destinations) => {  
  const matchingDestination = findDestinationById(destinations, bookingObject.id)
  console.log(bookingObject, matchingDestination)
  if (matchingDestination) {
    const estimatedFlightCost = bookingObject.travelers * matchingDestination.estimatedFlightCostPerPerson
    const estimatedLodgingCost = bookingObject.duration * matchingDestination.estimatedLodgingCostPerDay
    const totalEstimatedCost = estimatedFlightCost + estimatedLodgingCost
    return totalEstimatedCost * 1.1
  }
}

export { filterTripsByUser, getTotalSpentThisYr, getEstimatedCost, findDestinationById }

