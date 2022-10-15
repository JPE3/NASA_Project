const express = require('express');

const { httpGetAllLaunches, 
        httpAddNewLaunch,
        httpAbortLaunch,
        httpRestoreLaunch, 
      } = require('./controller.launch')

const routerLaunch = express.Router();

// root of routerLaunches is /launches see NasaApp.js
routerLaunch.get('/', httpGetAllLaunches);
routerLaunch.post('/', httpAddNewLaunch);
routerLaunch.delete('/:id', httpAbortLaunch);
routerLaunch.put('/:id', httpRestoreLaunch);

module.exports = routerLaunch; //WTF IS THIS NOT SURROUNDED BY {} AND WTF DOES IT BREAK WHEN IT IS!?

