const {postAdmin,getAdminById,updateAdmin,deleteAdmin,postWarga,postRt,postRw,postPerangkatDesa,postPimpinanDesa}=
require('../../controllers/adminController/AdminController');
const express = require('express');
const Router = express.Router();

Router.post('/post-admin',postAdmin);
Router.get('/get-admin/:id',getAdminById);
Router.put('/update-admin/:id',updateAdmin);
Router.delete('/delete-admin/:id',deleteAdmin);

Router.post('/makeWarga/:idUser',postWarga);
Router.post('/makeRt/:idUser',postRt);
Router.post('/makeRw/:idUser',postRw);
Router.post('/makePerangkatdesa/:idUser',postPerangkatDesa);
Router.post('/makePimpinandesa/:idUser',postPimpinanDesa);


module.exports = Router;


// note :
// post admin : http://localhost:3555/api/v1/admin/post-admin
// get admin by id : http://localhost:3555/api/v1/admin/get-admin/:id
// update admin by id : http://localhost:3555/api/v1/admin/update-admin/:id
// delete admin by id : http://localhost:3555/api/v1/admin/delete-admin/:id

// make warga : http://localhost:3555/api/v1/admin/makeWarga/:idUser
// make rt : http://localhost:3555/api/v1/admin/makeRt/:idUser
// make rw : http://localhost:3555/api/v1/admin/makeRw/:idUser
// make perangkat desa : http://localhost:3555/api/v1/admin/makePerangkatdesa/:idUser
// make pimpinan desa : http://localhost:3555/api/v1/admin/makePimpinandesa/:idUser
