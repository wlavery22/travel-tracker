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

const submitTripRequest = (bookingObject) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingObject)
  })
  .then(response => response.json())
  .catch(err => console.error(err));
}
// need to build into this function the ability to update DOM and call the functions that will estimate cost


module.exports = {
  fetchAPIcall,
  submitTripRequest
};