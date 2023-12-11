

const wargaController = require('../../controllers/wargaController');
const express = require('express');
const Router = express.Router();


Router.get('/',wargaController.getAllWarga);// http://localhost:3555/api/v1/warga/get
Router.post('/post',wargaController.postWarga);
Router.get('/get/:id',wargaController.getWargaById);
Router.put('/update/:id',wargaController.updateWargaById);
Router.delete('/delete/:id',wargaController.deleteWargaById);
Router.post('/create/suratAcara',wargaController.CreateSuratAcara);


module.exports = Router;
