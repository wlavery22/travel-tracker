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
  const spentThisYear = thisYearsTrips.reduce((acc, curr) => {
    const matchingDestination = destinations.find((spot) => {
      return spot.id === curr.destinationID 
    })

    const spentOnLodging = curr.duration * matchingDestination.estimatedLodgingCostPerDay
    const spentOnFlights = curr.travelers * matchingDestination.estimatedFlightCostPerPerson
    return acc += spentOnLodging + spentOnFlights
  }, 0)
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
  if (matchingDestination) {
    const estimatedFlightCost = bookingObject.travelers * matchingDestination.estimatedFlightCostPerPerson
    const estimatedLodgingCost = bookingObject.duration * matchingDestination.estimatedLodgingCostPerDay
    const totalEstimatedCost = estimatedFlightCost + estimatedLodgingCost
    return (totalEstimatedCost * 1.1).toFixed(2)
  }
}

export { filterTripsByUser, getTotalSpentThisYr, getEstimatedCost, findDestinationById }

