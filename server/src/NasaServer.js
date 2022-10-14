const http     = require('http');
const mongoose = require("mongoose");
const app      = require('./NasaApp.js');

const {loadPlanetsData} = require('./model/model.planet.js');

//process.env.PORT is if there is an environment variable PORT set to the port number you might want to use
const PORT = process.env.PORT || 8000;

const MONGO_URL = "mongodb+srv://nasa-api:PrinciplesAre0k@nasacluster.584xkpy.mongodb.net/NASA?retryWrites=true&w=majority";
const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});



async function StartServer() {
  //open connection and get the MongoDB version 

  await mongoose.connect(MONGO_URL);

  var admin = new mongoose.mongo.Admin(mongoose.connection.db);
  admin.buildInfo(function (err, info) {
    console.log(`MongoDB version: ${info.version}`);
  });
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

StartServer();


