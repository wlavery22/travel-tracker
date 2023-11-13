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
import { destinations } from "./destinationsTestData.js";
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
    const thisYearsTrips = trips.filter(trip => new Date(trip.date).getFullYear() === currentYear);
    const spentThisYear = thisYearsTrips.reduce((acc, curr) => {
      const matchingDestination = destinationsData.find(spot => spot.id === curr.id);
      const spentOnLodging = curr.duration * matchingDestination.estimatedLodgingCostPerDay;
      const spentOnFlights = curr.travelers * matchingDestination.estimatedFlightCostPerPerson;
      return acc += spentOnLodging + spentOnFlights;
    }, 0);
    const expectedTotal = spentThisYear * 1.1;
    const result = getTotalSpentThisYr(trips, destinations);
    expect(result).to.equal(expectedTotal);
  });

  it('should return 0 when no money was spent in the current year', function() {
    const currentYear = new Date().getFullYear();
    const noSpentTripsData = {...trips};
    noSpentTripsData.trips = trips.map(trip => {
      if (new Date(trip.date).getFullYear() === currentYear) {
        return {...trip, date: '2000-01-01'};
      }
      return trip;
    });
    const result = getTotalSpentThisYr(noSpentTripsData.trips, destinations);
    expect(result).to.equal(0);
  });

  it('should return the correct destination for a given id', function() {
    const destinationId = 3;
    const expectedDestination = destinations.find(spot => spot.id === destinationId);
    const result = findDestinationById(destinations, destinationId);
    expect(result).to.deep.equal(expectedDestination);
  });

  it('should return undefined when the destination id does not exist', function() {
    const nonExistentDestinationId = 9999;
    const result = findDestinationById(destinations, nonExistentDestinationId);
    expect(result).to.be.undefined;
  });

  it('should return the correct estimated cost for a given booking object', function() {
    const bookingObject = {
      id: 3,
      travelers: 2,
      duration: 7,
    };
    const matchingDestination = findDestinationById(destinations, bookingObject.id);
    const estimatedFlightCost = bookingObject.travelers * matchingDestination.estimatedFlightCostPerPerson;
    const estimatedLodgingCost = bookingObject.duration * matchingDestination.estimatedLodgingCostPerDay;
    const expectedTotal = (estimatedFlightCost + estimatedLodgingCost) * 1.1;
    const result = getEstimatedCost(bookingObject, destinations);
    expect(result).to.equal(expectedTotal);
  });

  it('should return undefined when the booking object id does not exist in destinations', function() {
    const nonExistentBookingObject = {
      id: 9999, 
      travelers: 2,
      duration: 7
    };
    const result = getEstimatedCost(nonExistentBookingObject, destinations);
    expect(result).to.be.undefined;
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