const { 
  isLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchWithId, 
} = require('../../model/model.launch.js');


async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}


function httpAddNewLaunch(req, res) {
  const launch = req.body;
  //error check 1
  if (!launch.mission || 
      !launch.rocket  ||
      !launch.launchDate ||
      !launch.target) {
    return res.status(400).json({
      error: "Missing launch info",
    });
  }
  //error check 2
  launch.launchDate = new Date(launch.launchDate);  
  if (launch.launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({
      error: "Invalid launch date",
      });
  }
  //no errors add the launch!
  addNewLaunch(launch);
  return res.status(201).json(launch);
}


async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const is_exist = await isLaunchWithId(launchId); 
  if (!is_exist) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  }
  const aborted = await abortLaunchWithId(launchId);
  if (aborted) {
    return res.status(200).json({
      success: 'Launch aborted',
      ok : true,
    });
  } else {
    return res.status(400).json({
      error: 'Launch not aborted',
      ok: false,
    })
  }
}



module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
};
