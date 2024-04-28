const express = require('express');
const Router = express.Router();
const suratController = require('../../controllers/suratController/suratController');
const auth = require('../../middleware/userMiddleware/wargaValidation');


Router.get('/get/surat',auth.wargaValidation,suratController.getAllSuratAcaraLessDetail_TAVERSION);
Router.post('/create/suratAcara/TAversion/:idWarga',suratController.createSurat_TAVERSION);
Router.delete('/delete/suratAcara/:userId/:suratAcaraId',suratController.deleteSuratAcaraById);



module.exports = Router;


// note :
// create surat acara : http://localhost:3555/api/v1/surat/create/suratAcara/TAversion/:idWarga
