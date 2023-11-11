const fetchAPIcall = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// date, duration(# days), # travelers, destination
// DOM display: after choosing, user should see estimated cost (with 10% travel agent fee)
// DOM display: after submitting (Posting), user should see “pending”

const submitTripRequest = (booking, userID) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Date.now(), 
      userID: userID, 
      destinationID: booking.destinationID, 
      travelers: booking.travelers, 
      date: booking.date, 
      duration: booking.duration, 
      status: 'pending', 
      suggestedActivities: [],
    })
  })
  .then(response => response.json())
  .catch(err => console.error(err));
}

// const updateBookings = (booking) => {
//   console.log(booking)
//   const promise = fetch("http://localhost:3001/api/v1/bookings", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "userID": booking['userID'],
//       "date": booking['date'],
//       "roomNumber": booking['roomNumber']
//     }),
//   })
//     .then((response) => response.json())
//     .catch((err) => console.error(`You got an ${err}`));
//   return promise;
// };

// export function postFlightRequest(
//   url,
//   previousTripID,
//   userID,
//   destinationID,
//   travelers,
//   date,
//   duration,
// ) {
//   return fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({
//       id: previousTripID + 1,
//       userID,
//       destinationID,
//       travelers,
//       date,
//       duration,
//       status: 'pending',
//       suggestedActivities: [],
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(resp => {
//       if (resp.ok) {
//         return resp.json();
//       }
//     })
//     .then(data => data)
//     .catch(err => {
//       console.error(err);
//     });
// }

// export const postVacationRequest = (vacation, userID) => {
//   let data = {
//       id: Date.now(), 
//       userID: userID, 
//       destinationID: vacation.destinationID, 
//       travelers: vacation.travelers, 
//       date: vacation.date, 
//       duration: vacation.duration, 
//       status: 'pending', 
//       suggestedActivities: [],
//   }
//   return fetch(allTripsUrl, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then(response => {
//       if(!response.ok){
//         throw new Error('Network response was not ok');
//       }
//       else{
//         return response.json();
//       }
//     })
//     .catch((error) => {
//       alert(error);
//     });
// }

module.exports = {
  fetchAPIcall
};