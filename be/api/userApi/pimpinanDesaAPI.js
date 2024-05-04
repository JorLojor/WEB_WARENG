const {getKades,postKadesWakades,updateKadesByRole,deleteKadesById,SubmitSuratKades,getAllPimpinanDesa} = require('../../controllers/adminController/kepalaDesaController');
const express = require('express');
const Router = express.Router();


Router.get('/get', getAllPimpinanDesa); // htt
Router.get('/get/:role', getKades);
Router.post('/create', postKadesWakades);
Router.put('/update/:role', updateKadesByRole);
Router.delete('/delete/:id', deleteKadesById);

module.exports = Router;
