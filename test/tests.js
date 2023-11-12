import chai from 'chai';
const expect = chai.expect;

// const assert = require('chai').assert;
// const getAllTripsByUser = require('./getAllTripsByUser');

import {

} from "../src/utils.js";

describe('getAllTripsByUser', function() {
  it('returns all trips for a given userID', function() {
    const userId = 50;
    const trips = [/* trips data */];
    const expectedTrips = trips.filter(trip => trip.userID === userId);
    const result = getAllTripsByUser(trips, userId);

    assert.deepEqual(result, expectedTrips);
  });
});

// example test that came with the file:
// describe('See if the tests are running', function() {
//   it('should return true', function() {
//     expect(true).to.equal(true);
//   });
// });