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

module.exports = {
  fetchAPIcall,
  submitTripRequest
};
// you should add error handling to the fetch calls