



const filterTripsByUser = (trips, userID) => {
  const tripsByUser = trips.filter((trip) => {
    return userID === trip.userID
  })
  
  return tripsByUser
}

export { filterTripsByUser }


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