// PACKAGES
const express = require('express');

// ROUTER

// ENDPOINT
const Router = express.Router();
Router.get('/', (req, res) => {
    res.send('API is running.....');
});

const wargaApi = require('./userApi/wargaApi');
Router.use('/warga', wargaApi);

const RtApi = require('./userApi/RtApi');
Router.use('/rt', RtApi);

const RwApi = require('./userApi/RwApi');
Router.use('/rw', RwApi);

module.exports = Router;



//http://localhost:3555/ 
