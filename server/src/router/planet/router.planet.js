const express = require('express');

// const {getAllPlanets, } = require('./controller.planet.js');  //destructuring the ??? object ???=which object? 
const ctrlPlanet = require('./controller.planet.js');

const routerPlanet = express.Router();

routerPlanet.get('/planets', ctrlPlanet.getAllPlanets);

module.exports = routerPlanet; //WTF IS THIS NOT SURROUNDED BY {} AND WTF DOES IT BREAK WHEN IT IS!?