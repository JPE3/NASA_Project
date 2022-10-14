const path    = require('path');
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

const routerPlanet = require('./router/planet/router.planet.js');
const routerLaunch = require('./router/launch/router.launch.js');

const app = express();

app.use(cors({origin: 'http://localhost:8000/'}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1/planets', routerPlanet);
app.use('/v1/launches', routerLaunch);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;


  