const http = require('http');

const app  = require('./NasaApp.js');

const { loadPlanetsData } = require('./model/model.planet.js');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function StartServer() {
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

StartServer();


