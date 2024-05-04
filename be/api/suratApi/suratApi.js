const express = require('express');
const Router = express.Router();
const suratController = require('../../controllers/suratController/suratController');
const auth = require('../../middleware/userMiddleware/wargaValidation');


Router.get('/get/surat',auth.wargaValidation,suratController.getAllSuratAcaraLessDetail_TAVERSION);
Router.post('/create/suratAcara/TAversion/:idWarga',suratController.wargaCreateSurat_TAVERSION);


Router.delete('/delete/suratAcara/:userId/:suratAcaraId',suratController.deleteSuratAcaraById);
Router.get('/get/generatePdf/:idSuratAcara',suratController.generateSuratPdf_TAVERSION);

//Rt
Router.put('/persetujuan-surat-acara/:rtId/:suratAcaraId',suratController.persetujuanSuratAcaraRt_TAVERSION);

//Rw
Router.put('/persetujuan-surat-acara/:rwId/:suratAcaraId',suratController.persetujuanSuratAcaraRw_TAVERSION);

//perangkat desa
Router.put('/submit/:perangkatDesaId/:suratAcaraId',suratController.persetujuanSuratAcaraPerangkatDesa_TAVERSION);

//kepala desa
Router.put('/submit/:kadesId/:suratAcaraId',suratController.persetujuanSuratAcaraKades_TAVERSION);

module.exports = Router;


// note :
// create surat acara : http://localhost:3555/api/v1/surat/create/suratAcara/TAversion/:idWarga
