const express = require('express');

const {httpGetAllPlanets} = require('./controller.planet.js');

const routerPlanet = express.Router();

// root of routerPlanets is /planets see NasaApp.js
routerPlanet.get('/', httpGetAllPlanets);

module.exports = routerPlanet; //WTF IS THIS NOT SURROUNDED BY {} AND WTF DOES IT BREAK WHEN IT IS!?