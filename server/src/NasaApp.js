const express = require('express');
const cors    = require('cors');

const routerPlanet = require('./router/planet/router.planet.js');

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(routerPlanet);

module.exports = app;


  