

const wargaController = require('../../controllers/userController/wargaController');
const express = require('express');
const Router = express.Router();


Router.get('/get',wargaController.getAllWarga);
Router.post('/post-warga',wargaController.postWarga); 
Router.post('/post-many-warga',wargaController.postManyWarga);
Router.get('/get/:id',wargaController.getWargaById);
Router.put('/update/:id',wargaController.updateWargaById);
Router.delete('/delete/:id',wargaController.deleteWargaById);
Router.post('/create/suratAcara/:id',wargaController.CreateSuratAcara); 
Router.post('/pengajuan/SuratAcara/:userId/:suratAcaraId',wargaController.pengajuanSuratAcara); 
Router.delete('/delete/suratAcara/:userId/:suratAcaraId',wargaController.deleteSuratAcaraById);
Router.post('/create/surat/example',wargaController.createSuratPdfEx2);

module.exports = Router;

// note :
// get all warga : http://localhost:3555/api/v1/warga/get
// get warga by id : http://localhost:3555/api/v1/warga/get/:id
// post warga : http://localhost:3555/api/v1/warga/post-warga
// post many warga : http://localhost:3555/api/v1/warga/post-many-warga
// get warga by id : http://localhost:3555/api/v1/warga/get/:id
// update warga by id : http://localhost:3555/api/v1/warga/update/:id
// delete warga by id : http://localhost:3555/api/v1/warga/delete/:id
// create surat acara : http://localhost:3555/api/v1/warga/create/suratAcara/:id
// pengajuan surat acara : http://localhost:3555/api/v1/warga/pengajuan/SuratAcara/:userId/:suratAcaraId
// delete surat acara : http://localhost:3555/api/v1/warga/delete/suratAcara/:userId/:suratAcaraId
// create surat example : http://localhost:3555/api/v1/warga/create/surat/example
