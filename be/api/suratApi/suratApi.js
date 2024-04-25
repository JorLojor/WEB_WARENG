const express = require('express');
const Router = express.Router();
const suratController = require('../../controllers/suratController/suratController');

Router.post('/create/suratAcara/TAversion/:idWarga',suratController.createSuratPdf_TAVERSION);
Router.delete('/delete/suratAcara/:userId/:suratAcaraId',suratController.deleteSuratAcaraById);



module.exports = Router;


// note :
// create surat acara : http://localhost:3555/api/v1/surat/create/suratAcara/TAversion/:idWarga
