const express = require('express');
const Router = express.Router();
const suratController = require('../../controllers/suratController/suratController');
const auth = require('../../middleware/userMiddleware/wargaValidation');


Router.get('/get/surat',auth.wargaValidation,suratController.getAllSuratAcaraLessDetail_TAVERSION);
Router.post('/create/suratAcara/TAversion/:idWarga',suratController.wargaCreateSurat_TAVERSION);


Router.delete('/delete/suratAcara/:userId/:suratAcaraId',suratController.deleteSuratAcaraById);
Router.get('/get/generatePdf/:idSuratAcara',suratController.generateSuratPdf_TAVERSION);//http://localhost:3555/api/v1/surat/get/generatePdf/:idSuratAcara

//Rt
Router.put('/persetujuan-surat-acara-rt/:rtId/:suratAcaraId',suratController.persetujuanSuratAcaraRt_TAVERSION);

//Rw
Router.put('/persetujuan-surat-acara-rw/:RwId/:SuratId',suratController.persetujuanSuratAcaraRw_TAVERSION);

//perangkat desa
Router.put('/submit/:perangkatDesaId/:suratAcaraId',suratController.persetujuanSuratAcaraPerangkatDesa_TAVERSION);

//kepala desa
Router.put('/submit/:kadesId/:suratAcaraId',suratController.persetujuanSuratAcaraKades_TAVERSION);

//baypasss
Router.put('/baypass/:suratAcaraId',suratController.baypassSuratAcara_TAVERSION);


//baypass RT 
Router.put('/baypassRT/:suratAcaraId',suratController.baypassSuratAcaraRT_TAVERSION);

//baypass RW
Router.put('/baypassRW/:suratAcaraId',suratController.baypassSuratAcaraRW_TAVERSION)

//baypass Perangkat Desa
Router.put('/baypassKasi/:suratAcaraId',suratController.baypassSuratAcaraKasi_TAVERSION);
module.exports = Router;


// note :
// create surat acara : http://localhost:3555/api/v1/surat/create/suratAcara/TAversion/:idWarga
// delete surat acara : http://localhost:3555/api/v1/surat/delete/suratAcara/:userId/:suratAcaraId
// generate pdf surat acara : http://localhost:3555/api/v1/surat/get/generatePdf/:idSuratAcara

// persetujuan surat acara rt : http://localhost:3555/api/v1/surat/persetujuan-surat-acara-rt/:rtId/:suratAcaraId
// persetujuan surat acara rw : http://localhost:3555/api/v1/surat/persetujuan-surat-acara-rw/:rwId/:suratAcaraId
// persetujuan surat acara perangkat desa : http://localhost:3555/api/v1/surat/submit/:perangkatDesaId/:suratAcaraId
// persetujuan surat acara kades : http://localhost:3555/api/v1/surat/submit/:kadesId/:suratAcaraId


// get all surat : http://localhost:3555/api/v1/surat/get/surat



// baypass surat acara : http://localhost:3555/api/v1/surat/baypass/:suratAcaraId
// baypass surat acara RT : http://localhost:3555/api/v1/surat/baypassRT/:suratAcaraId
// baypass surat acara RW : http://localhost:3555/api/v1/surat/baypassRW/:suratAcaraId
// baypass surat acara Perangkat Desa : http://localhost:3555/api/v1/surat/baypassKasi/:suratAcaraId
