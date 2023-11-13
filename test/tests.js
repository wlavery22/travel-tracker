import chai from 'chai';
const expect = chai.expect;

// const assert = require('chai').assert;
// import { 
// } from "../src/utils.js";

// import { expect } from 'chai';
// import filterTripsByUser from './filterTripsByUser';
// import trips from './tripsTestData';

import {
  filterTripsByUser, 
  getTotalSpentThisYr, 
  getEstimatedCost, 
  findDestinationById
} from "../src/utils.js";

import { trips } from "./tripsTestData.js";
// const { trips } = require('./tripsTestData');

describe('filterTripsByUser', function() {
  it('should return all trips for a given userID', function() {
    const userId = 50;
    const expectedTrips = trips.filter(trip => trip.userID === userId);
    const result = filterTripsByUser(trips, userId);
    expect(result).to.deep.equal(expectedTrips);
  });

  it('should return an empty array when the userID does not exist', function() {
    const nonExistentUserId = 9999;
    const result = filterTripsByUser(trips, nonExistentUserId);
    expect(result).to.be.an('array').that.is.empty;
  });

  it('should return the correct total spent for the current year', function() {
    const currentYear = new Date().getFullYear();
    const thisYearsTrips = tripsData.trips.filter(trip => new Date(trip.date).getFullYear() === currentYear);
    
    const spentThisYear = thisYearsTrips.reduce((acc, curr) => {
      const matchingDestination = destinationsData.find(spot => spot.id === curr.id);
      const spentOnLodging = curr.duration * matchingDestination.estimatedLodgingCostPerDay;
      const spentOnFlights = curr.travelers * matchingDestination.estimatedFlightCostPerPerson;
      return acc += spentOnLodging + spentOnFlights;
    }, 0);
    
    const expectedTotal = spentThisYear * 1.1;
    const result = getTotalSpentThisYr(tripsData.trips, destinationsData);

    expect(result).to.equal(expectedTotal);
  });
  
});

// const filterTripsByUser = (trips, userID) => {
//   const tripsByUser = trips.filter((trip) => {
//     return userID === trip.userID
//   })
//   return tripsByUser
// }

// example test that came with the file:
// describe('See if the tests are running', function() {
//   it('should return true', function() {
//     expect(true).to.equal(true);
//   });
// });