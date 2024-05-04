const {getAllPerangkatDesa,
    postPerangkatDesa,
    getPerangkatDesaById,
    updatePerangkatDesaById,
    deletePerangkatDesaById,} = require('../../controllers/adminController/perangkatDesaController');
const express = require('express');
const Router = express.Router();

Router.get('/get', getAllPerangkatDesa);
Router.post('/create', postPerangkatDesa);
Router.get('/get/:id', getPerangkatDesaById);
Router.put('/update/:id', updatePerangkatDesaById);
Router.delete('/delete/:id', deletePerangkatDesaById);


//note 
// get all : http://localhost:3555/api/v1/perangkatDesa/get
// get by id : http://localhost:3555/api/v1/perangkatDesa/get/:id
// create : http://localhost:3555/api/v1/perangkatDesa/create
// update : http://localhost:3555/api/v1/perangkatDesa/update/:id
// delete : http://localhost:3555/api/v1/perangkatDesa/delete/:id
// submit : http://localhost:3555/api/v1/perangkatDesa/submit/:perangkatDesaId/:suratAcaraId




module.exports = Router;
