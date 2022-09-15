const { getAllPlanets } = require('../../model/model.planet.js');

async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
}

module.exports = {httpGetAllPlanets};