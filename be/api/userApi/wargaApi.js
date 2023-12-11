

const wargaController = require('../../controllers/wargaController');
const express = require('express');
const Router = express.Router();


Router.get('/get-warga',wargaController.getAllWarga);// http://localhost:3555/api/v1/warga/get-warga
Router.post('/post-warga',wargaController.postWarga); // http://localhost:3555/api/v1/warga/post-warga
Router.get('/get/:id',wargaController.getWargaById);
Router.put('/update/:id',wargaController.updateWargaById);
Router.delete('/delete/:id',wargaController.deleteWargaById);
Router.post('/create/suratAcara/:id',wargaController.CreateSuratAcara); // http://localhost:3555/api/v1/warga/create/suratAcara/:id


module.exports = Router;
