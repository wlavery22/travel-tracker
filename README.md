## Abstract
This is a user-friendly travel app inspired by travel booking websites like Expedia or Priceline as outlined in [this project spec](https://frontend.turing.edu/projects/travel-tracker.html). Using remote data sets of trips, destinations and travelers, we managed to integrate information about users' travels and their expenditures into a dashboard to display for any user. The purpose of Travel Tracker was to take user datasets and display them for individual users in an easy to understand visual representation. The dashboard allows a user to view and see information about their trips including date, duration, # of travelers, total expenditures and whether or not a trip's booking status is "pending".

## Learning Goals
- Use object and array prototype methods to perform data manipulation
- Create a clear and accessible user interface
- Make network requests to retrieve data
- Implement a robust testing suite using TDD
- Write DRY, reusable code that follows SRP (Single Responsibility Principle)

## Preview of App
<img width="699" alt="Screenshot 2023-11-14 at 7 15 46 PM" src="https://github.com/wlavery22/travel-tracker/assets/119368820/381bca88-5e10-4714-ac14-d442e99f3388">
<img width="666" alt="Screenshot 2023-11-14 at 7 16 39 PM" src="https://github.com/wlavery22/travel-tracker/assets/119368820/d56b4fef-9a32-4e78-9920-4e84316b84cb">


## Context

### Tools
Javascript, HTML, CSS, NPM, Node.JS, GitHub, GitHub Projects, JSON, Webpack, Mocha, Chai, Lighthouse

# Timeline
This is a mod 2 solo student project done in a one week sprint. 

## Installation
- Click the green `code` button.
- Copy the SSH link to your clipboard.
- Open the terminal on your local machine.
- Change into the directory that you wish to clone the app into with the cd command.
- Install the npm dependency by typing `npm install` on the command line in terminal.
- Start the webpack by typing `npm start` into the terminal.
- Copy the link it provides that will look like this: [http:localhost:8080]() 
- Paste that code into your web browser.
- On a separate tab, navigate to [this page](https://github.com/turingschool-examples/travel-tracker-api) which has the server that will be necessary to run on your local machine. 
- Follow the first steps of copying and cloning that SSH code into your terminal.
- Run `npm install` and `npm start`.
- You should see that the local server is now running and which provides the data to populate on the 8080 site.
- Enjoy booking trips with the Travel Tracker app!

### Wins
- Implementing fetch requests and POSTS and no longer using local data files. 
- Posting new data for bookings.
- Learning more about Promises.
- Learning about Webpack and how to utilize imports and exports.
- Keeping accessibility in mind during the app rendering phase on the DOM.
- Utilizing GitHub projects and creating a board with issue tickets linked to pull requests.
- Reaching out to mentors and having frequent checkins while learning new tools.
- Using .then to manage problems created by asynchronous Javascript when doing Fetch calls.

### Challenges
- TDD
- Accurately POSTing new information with adequate error handling to guide the UX.
- Developing a concept for a login which was a huge undertaking with refactoring our functionality.
- Naming conventions and effectively tracking variables and functions across multiple files.
- Utilizing iterator methods in our ES6 JS functions.
- Moving from using local data files to using fetch calls to retrieve data.
- Using Webpack to manage file structure and import / export statements between files.
- Overcoming difficulties created by asynchronous Javascript when using Fetch calls for GET and POST requests.

## Future features could include:
- Building user interactivity allowing them to not only add new reservations but also manipulate data.
- Develop a login view which persists for the user upon refresh.
- Giving the user a suggested destination on login or an incentive to book a trip on a certain date.


