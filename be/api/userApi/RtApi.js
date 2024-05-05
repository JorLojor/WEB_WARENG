const {getAllRt,createRt,updateRt,deleteRt,persetujuanSuratAcara,postManyRt} = require('../../controllers/userController/RtController');
const express = require('express');
const Router = express.Router();


Router.get('/get',getAllRt); // 
Router.post('/create',createRt);
Router.post('/post-many-rt',postManyRt);
Router.put('/update/:id',updateRt);
Router.delete('/delete/:id',deleteRt);
// Router.put('/persetujuan-surat-acara/:rtId/:suratAcaraId',persetujuanSuratAcara);


module.exports = Router;


// note :
// get all rt : http://localhost:3555/api/v1/rt/get
// create rt : http://localhost:3555/api/v1/rt/create
// post many rt : http://localhost:3555/api/v1/rt/post-many-rt
// update rt : http://localhost:3555/api/v1/rt/update/:id
// delete rt : http://localhost:3555/api/v1/rt/delete/:id
// persetujuan surat acara : http://localhost:3555/api/v1/rt/persetujuan-surat-acara/:rtId/:suratAcaraId
