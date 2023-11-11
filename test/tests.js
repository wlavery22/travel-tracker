import chai from 'chai';
const expect = chai.expect;

// describe('See if the tests are running', function() {
//   it('should return true', function() {
//     expect(true).to.equal(true);
//   });
// });

const assert = require('chai').assert;
const getAllTripsByUser = require('./getAllTripsByUser');

describe('getAllTripsByUser', function() {
  it('returns all trips for a given userID', function() {
    const userId = 50;
    const trips = [/* trips data */];
    const expectedTrips = trips.filter(trip => trip.userID === userId);
    const result = getAllTripsByUser(trips, userId);

    assert.deepEqual(result, expectedTrips);
  });
});

