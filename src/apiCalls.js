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

// user can choose date, duration(# days), # travelers, destination
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



module.exports = {
  fetchAPIcall
};