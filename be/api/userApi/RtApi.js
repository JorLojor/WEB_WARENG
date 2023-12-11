const {getAllRt,createRt,updateRt,deleteRt} = require('../../controllers/RtController');
const express = require('express');
const Router = express.Router();


Router.get('/get',getAllRt);// http://localhost:3555/api/v1/rt/get
Router.post('/create',createRt);// http://localhost:3555/api/v1/rt/create
Router.put('/update/:id',updateRt);// http://localhost:3555/api/v1/rt/update/:id
Router.delete('/delete/:id',deleteRt);// http://localhost:3555/api/v1/rt/delete/:id


module.exports = Router;
