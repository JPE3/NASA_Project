//const launches = new Map();
const launches = require('./mongo.launch.js');
const planets  = require('./mongo.planet.js');


let DEFAULT_FLIGHT_NUMBER = 1;

const launch = {
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}


//saveLaunch(launch);


async function isLaunchWithId(launchId) {
  return await launches.findOne({
    flightNumber: launchId,
  }); 
}


async function getLatestFlightNumber() {
  const latest_launch = await launches
    .findOne()
    .sort('-flightNumber');
  if (!latest_launch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latest_launch.flightNumber;
} 


async function getAllLaunches() {
  //empty filter ({}) = return all documents but exclude fileds _id and __v
  return await launches.find({}, {
    '_id': 0, '__v': 0,
  }); 
}


async function addNewLaunch(launch) {
  const new_flight_number = await getLatestFlightNumber() + 1;
  const NewLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: new_flight_number,
  });
  await saveLaunch(NewLaunch);
}


async function saveLaunch(launch) {
  try {
    const planet = await planets.findOne({
      kepler_name: launch.target,
    });
    if (!planet) {
      throw new Error('Target planet does not exist in planets list');
    }
    await launches.updateOne({
      flightNumber : launch.flightNumber,
    }, launch, {
      upsert: true,
    });
  } catch(err) {
    console.error(`Could not save launch ${err}`);
  }
}


async function abortLaunchWithId(launchId) {
  const aborted =  await launches.updateOne({
    flightNumber: launchId,
  }, {
    upcoming : false,
    success  : false,
  });
  return (aborted.modifiedCount === 1);
}


async function restoreLaunchWithId(launchId) {
  const aborted =  await launches.updateOne({
    flightNumber: launchId,
  }, {
    upcoming : true,
    success  : true,
  });
  return (aborted.modifiedCount === 1);
}


module.exports = {
  isLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchWithId,
  restoreLaunchWithId,
}