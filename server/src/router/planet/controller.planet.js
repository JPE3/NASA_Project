const { getAllPlanets } = require('../../model/model.planet.js');

function httpGetAllPlanets(req, res) {
  return res.status(200).json(getAllPlanets());
}

module.exports = {httpGetAllPlanets};