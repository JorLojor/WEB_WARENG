// PACKAGES
const express = require('express');

// ROUTER

// ENDPOINT
const router = express.Router();
router.get('/', (req, res) => {
    res.send('API is running.....');
});

const wargaApi = require('./userApi/wargaApi');

const App = express();

App.use('/warga', wargaApi);

module.exports = router;


//http://localhost:3555/api/v1/warga/post/warga
