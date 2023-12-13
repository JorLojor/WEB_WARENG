

const wargaController = require('../../controllers/wargaController');
const express = require('express');
const Router = express.Router();


Router.get('/get',wargaController.getAllWarga);// http://localhost:3555/api/v1/warga/get-warga
Router.post('/post-warga',wargaController.postWarga); // http://localhost:3555/api/v1/warga/post-warga
Router.get('/get/:id',wargaController.getWargaById);
Router.put('/update/:id',wargaController.updateWargaById);// http://localhost:3555/api/v1/warga/update/:id
Router.delete('/delete/:id',wargaController.deleteWargaById);// http://localhost:3555/api/v1/warga/delete/:id
Router.post('/create/suratAcara/:id',wargaController.CreateSuratAcara); // http://localhost:3555/api/v1/warga/create/suratAcara/:id
Router.post('/pengajuan/SuratAcara/:userId/:suratAcaraId',wargaController.pengajuanSuratAcara); // http://localhost:3555/api/v1/warga/pengajuan/SuratAcara/:userId/:suratAcaraId
Router.delete('/delete/suratAcara/:userId/:suratAcaraId',wargaController.deleteSuratAcaraById); // http://localhost:3555/api/v1/warga/delete/suratAcara/:userId/:suratAcaraId

module.exports = Router;
