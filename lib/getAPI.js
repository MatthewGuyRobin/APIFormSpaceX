const fetch = require("node-fetch"); 
require("dotenv").config(); 

const getUpcomingLaunch = async (flight_number) => {
  const url = `https://api.spacexdata.com/v3/launches/${flight_number}`;
  let data = await fetch(url); 
  return await data.json();
};

module.exports = {
  getUpcomingLaunch,
};
