const {getAllRw,getRwById,postRw,updateRwById,deleteRwById,postManyRw,persetujuanSurat} = require("../../controllers/userController/rwController");
const express = require('express');
const Router = express.Router();

Router.get('/get',getAllRw);
Router.get('/get/:id',getRwById);
Router.post('/post',postRw);
Router.post('/post-many-rw',postManyRw);
Router.put('/update/:id',updateRwById);
Router.delete('/delete/:id',deleteRwById);




module.exports = Router;


// note :
//get all rw : http://localhost:3555/api/v1/rw/get
//get rw by id : http://localhost:3555/api/v1/rw/get/:id
//post rw : http://localhost:3555/api/v1/rw/post
//post many rw : http://localhost:3555/api/v1/rw/post-many-rw
//update rw : http://localhost:3555/api/v1/rw/update/:id
//delete rw : http://localhost:3555/api/v1/rw/delete/:id
//persetujuan rw : http://localhost:3555/api/v1/rw//persetujuan-surat-acara/:rwId/:suratAcaraId
