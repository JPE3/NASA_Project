const express = require('express');

const { httpGetAllLaunches, 
        httpAddNewLaunch,
        httpAbortLaunch,
        httpRestoreLaunch, 
        httpDeleteLaunch, 
      } = require('./controller.launch')

const routerLaunch = express.Router();

// root of routerLaunches is /launches see NasaApp.js
routerLaunch.get('/', httpGetAllLaunches);
routerLaunch.post('/', httpAddNewLaunch);
routerLaunch.delete('/:id', httpAbortLaunch);
routerLaunch.put('/:id', httpRestoreLaunch);
routerLaunch.delete('/delete/:id', httpDeleteLaunch);

module.exports = routerLaunch; //WTF IS THIS NOT SURROUNDED BY {} AND WTF DOES IT BREAK WHEN IT IS!?

