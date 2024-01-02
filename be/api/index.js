// PACKAGES
const express = require('express');

// ROUTER

// ENDPOINT
const Router = express.Router();
Router.get('/', (req, res) => {
    res.send('API is running.....');
});

const userApi = require('./userApi/userApi');
Router.use('/user', userApi);

const wargaApi = require('./userApi/wargaApi');
Router.use('/warga', wargaApi);

const RtApi = require('./userApi/RtApi');
Router.use('/rt', RtApi);

const RwApi = require('./userApi/RwApi');
Router.use('/rw', RwApi);

const perangkatDesaApi = require('./userApi/perangkatDesaApi');
Router.use('/perangkatDesa', perangkatDesaApi);

const pimpinanDesaApi = require('./userApi/pimpinanDesaAPI');
Router.use('/pimpinanDesa', pimpinanDesaApi);

module.exports = Router;



//http://localhost:3555/ 
