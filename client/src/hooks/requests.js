const API_URL = 'http://localhost:8000/v1';

async function httpGetPlanets() {
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  console.log(fetchedLaunches);
  return fetchedLaunches;
  //return fetchedLaunches.sort((a, b) => {a.flightNumber - b.flightNumber}); 
}


async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    })
  } catch(err) {
    return {
      ok: false
    }
  }
}


// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch(err) {
    console.log(err);
    return {
      ok: false
    };
  }
}


// Restore an aborted launch with given ID.
async function httpRestoreLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "put",
    });
  } catch(err) {
    console.log(err);
    return {
      ok: false
    };
  }
}


// Restore an aborted launch with given ID.
async function httpDeleteLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/delete/${id}`, {
      method: "delete",
    });
  } catch(err) {
    console.log(err);
    return {
      ok: false
    };
  }
}


export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
  httpRestoreLaunch,
  httpDeleteLaunch,
};