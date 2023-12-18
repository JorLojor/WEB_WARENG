const {getAllPerangkatDesa,
    postPerangkatDesa,
    getPerangkatDesaById,
    updatePerangkatDesaById,
    deletePerangkatDesaById,
    SubmitSuratAcara} = require('../../controllers/perangkatDesaController');
const express = require('express');
const Router = express.Router();

Router.get('/get', getAllPerangkatDesa);
Router.post('/create', postPerangkatDesa);
Router.get('/get/:id', getPerangkatDesaById);
Router.put('/update/:id', updatePerangkatDesaById);
Router.delete('/delete/:id', deletePerangkatDesaById);
Router.put('/submit/:id', SubmitSuratAcara);

//note 
// get all : http://localhost:3555/api/perangkatDesa/get
// get by id : http://localhost:3555/api/perangkatDesa/get/:id
// create : http://localhost:3555/api/perangkatDesa/create
// update : http://localhost:3555/api/perangkatDesa/update/:id
// delete : http://localhost:3555/api/perangkatDesa/delete/:id
// submit : http://localhost:3555/api/perangkatDesa/submit/:id




module.exports = Router;
