const {getAllRt,createRt} = require('../../controllers/RtController');
const express = require('express');
const Router = express.Router();


Router.get('/get',getAllRt);// http://localhost:3555/api/v1/rt/get
Router.post('/create',createRt);// http://localhost:3555/api/v1/rt/create


module.exports = Router;
