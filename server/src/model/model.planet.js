const fs      = require('fs');
const path    = require('path');
const {parse} = require('csv-parse');
const planets = require('./mongo.planet.js');

function IsHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' &&
           planet['koi_insol']       >   0.36        &&
           planet['koi_insol']       <   1.11        &&
           planet['koi_prad']        <   1.6;
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => { 
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true
      }))
      .on('data', async (data) => {
        if (IsHabitable(data)) {
          await savePlanet(data);
       }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const count_planets = (await getAllPlanets()).length; 
        console.log(`${count_planets} potentially habitable planets have been found!`);
        resolve();
      });
  });
}


async function savePlanet(planet) {
  try {
    await planets.updateOne({
      kepler_name: planet.kepler_name,
    }, {
      kepler_name: planet.kepler_name,
    }, {
      upsert: true,
    });
  } catch(err) {
    console.error(`Could not save planet ${err}`);
  }
}


async function getAllPlanets() {
  //empty filter ({}) = return all documents but exclude fileds _id and __v
  return await planets.find({}, {
    '_id': 0, '__v': 0,
  }); 
}


module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
  