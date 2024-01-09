const {getAllUser,getUserById,postUser,postManyUser,updateuserById,deleteUserById} = 
require('../../controllers/userController/userController');
const express = require('express');
const Router = express.Router();

Router.get('/get',getAllUser);
Router.get('/get/:id',getUserById);
Router.post('/post-user',postUser);
Router.post('/post-many-user',postManyUser);
Router.put('/update/:id',updateuserById); // untuk melengkapi data user
Router.delete('/delete/:id',deleteUserById);

module.exports = Router;


// note :
// get all user : http://localhost:3555/api/v1/user/get
// get user by id : http://localhost:3555/api/v1/user/get/:id
// post user : http://localhost:3555/api/v1/user/post-user
// post many user : http://localhost:3555/api/v1/user/post-many-user
// update user by id : http://localhost:3555/api/v1/user/update/:id
// delete user by id : http://localhost:3555/api/v1/user/delete/:id
