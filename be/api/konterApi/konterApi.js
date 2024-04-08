const konterConteroller = require('../../controllers/adminController/konterController')
const express = require('express');
const Router = express.Router();

Router.get('/get',konterConteroller.getDataKonter);
Router.get('/get/:id',konterConteroller.getDataKonterById);
Router.post('/create',konterConteroller.createKonter);
Router.put('/update/:id',konterConteroller.updateKonter);
Router.delete('/delete/:id',konterConteroller.deleteKonter);



module.exports = Router;









//note
//get all konter : http://localhost:3555/api/v1/konter/get
//get konter by id : http://localhost:3555/api/v1/konter/get/:id
//create konter : http://localhost:3555/api/v1/konter/create
//update konter : http://localhost:3555/api/v1/konter/update/:id
//delete konter : http://localhost:3555/api/v1/konter/delete/:id
