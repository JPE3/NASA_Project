const { planets } = require('../../model/model.planet.js');

function getAllPlanets(req, res) {
  return res.status(200).json(planets);
}

module.exports = {getAllPlanets};