const {getAllRt,createRt,updateRt,deleteRt,persetujuanSuratAcara} = require('../../controllers/RtController');
const express = require('express');
const Router = express.Router();


Router.get('/get',getAllRt);// http://localhost:3555/api/v1/rt/get
Router.post('/create',createRt);// http://localhost:3555/api/v1/rt/create
Router.put('/update/:id',updateRt);// http://localhost:3555/api/v1/rt/update/:id
Router.delete('/delete/:id',deleteRt);// http://localhost:3555/api/v1/rt/delete/:id
Router.put('/persetujuan-surat-acara/:rtId/:suratAcaraId',persetujuanSuratAcara);// http://localhost:3555/api/v1/rt/persetujuan-surat-acara/:rtId/:suratAcaraId


module.exports = Router;


// note :
// get all rt : http://localhost:3555/api/v1/rt/get
// create rt : http://localhost:3555/api/v1/rt/create
// update rt : http://localhost:3555/api/v1/rt/update/:id
// delete rt : http://localhost:3555/api/v1/rt/delete/:id
// persetujuan surat acara : http://localhost:3555/api/v1/rt/persetujuan-surat-acara/:rtId/:suratAcaraId
