const wargaController = require('../../controllers/userController/wargaController');
const express = require('express');
const Router = express.Router();


Router.get('/get',wargaController.getAllWarga);
Router.get('/get-all/user',wargaController.getAllwargaLessDetail);

Router.get('/get/:id',wargaController.getWargaById);
Router.post('/create/suratAcara/:id',wargaController.CreateSuratAcara); 
Router.post('/pengajuan/SuratAcara/:userId/:suratAcaraId',wargaController.pengajuanSuratAcara); 
Router.delete('/delete/suratAcara/:userId/:suratAcaraId',wargaController.deleteSuratAcaraById);
Router.post('/create/surat/:idWarga',wargaController.createSuratPdf);

Router.post('/login',wargaController.LoginWarga); // http://localhost:3555/api/v1/warga/login
Router.post('/register',wargaController.RegisterWarga); // http://localhost:3555/api/v1/warga/register
Router.put('/forgot-password',wargaController.ForgotPassword); // http://localhost:3555/api/v1/warga/forgot-password

Router.post('/create/suratAcara/TAversion/:idWarga',wargaController.createSuratPdf_TAVERSION);  // http://localhost:3555/api/v1/warga/create/suratAcara/TAversion/:idWarga



module.exports = Router;

// note :
// get all user : http://localhost:3555/api/v1/warga/get-all/user
// get all warga : http://localhost:3555/api/v1/warga/get

// login : http://localhost:3555/api/v1/warga/login
// register : http://localhost:3555/api/v1/warga/register
// forgot password : http://localhost:3555/api/v1/warga/forgot-password

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
// create surat example : http://localhost:3555/api/v1/warga/create/surat/:idWarga/:idSuratAcara
