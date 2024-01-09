const db = require('../../models');
const adminModels = require('../../models/adminModels/adminModels');
const WargaModel = db.warga;
const rtModel = db.rt;
const rwModel = db.rw;
const pdModel = db.PerangkatDesaModel;
const ppModel = db.pimpinanDesa;
const userModel = db.user;
const AdminModel = db.admin;

// CRUD OPERATIONS
// CREATE
exports.postAdmin = async (req, res) => {
    try{
        const {name, nik, nohp, username, password} = req.body;

        const newAdmin = new AdminModel({
            name,
            nik,
            nohp,
            username,
            password
        });

        const admin = await newAdmin.save();

        res.status(201).send({
            message: "success create admin",
            admin
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
}
// READ
exports.getAdminById = async (req, res) => {
    try{
        const {id} = req.params;

        const admin = await AdminModel.findById(id);

        res.status(200).send({
            message: "success get admin by id",
            admin
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
}
// UPDATE
exports.updateAdmin = async (req, res) => {
    try{
        const {id} = req.params;
        const updatedData = req.body;
        
        const updatedAdmin = await AdminModel.findByIdAndUpdate(id, updatedData, {new: true});

        if(!updatedAdmin){
            return res.status(404).send({message: "admin not found"});
        }

        res.status(200).send({
            message: "success update admin",
            admin: updatedAdmin
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
}
// DELETE
exports.deleteAdmin = async (req, res) => {
    try{
        const {id} = req.params;

        const admin = await AdminModel.findByIdAndDelete(id);

        res.status(200).send({
            message: "success delete admin",
            admin
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
}



////// WARGA //////
exports.postWarga = async (req,res) => {
    try{
        const {idUser} = req.params;

        const dataUser = await userModel.findByIdAndUpdate(idUser, {
            role: 1 // (warga)
        }, {new: true});

        const newWarga = await WargaModel.create({
            user: idUser
        });

        await dataUser.save();

        res.status(200).send({
            message: "Success create warga",
            data: newWarga
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
}


////// RT //////
exports.postRt = async (req,res) => {
    try{
        const {idUser} = req.params;
        const dataUser = await userModel.findByIdAndUpdate(idUser, {
            role: 2 // (rt)
        }, {new: true});

        const newRt = await rtModel.create({
            user: idUser
        });

        await dataUser.save();

        res.status(200).send({
            message: "Success create rt",
            data: newRt
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
}


////// RW //////
exports.postRw = async (req,res) => {
    try{
        const {idUser} = req.params;
        const dataUser = await userModel.findByIdAndUpdate(idUser, {
            role: 3 // (rw)
        }, {new: true});

        const newRw = await rwModel.create({
            user: idUser
        });

        await dataUser.save();

        res.status(200).send({
            message: "Success create rw",
            data: newRw
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
}

////// PERANKAT DESA //////s
exports.postPerangkatDesa = async (req,res) => {
    try{
        const {idUser} = req.params;
        const dataUser = await userModel.findByIdAndUpdate(idUser, {
            role: 4 // (perangkat desa)
        }, {new: true});

        const newPerangkatDesa = await pdModel.create({
            user: idUser
        });

        await dataUser.save();

        res.status(200).send({
            message: "Success create perangkat desa",
            data: newPerangkatDesa
        });


    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
}


////// PIMPINAN DESA //////

exports.postPimpinanDesa = async (req,res) => {
    try{
        const {idUser} = req.params;
        const dataUser = await userModel.findByIdAndUpdate(idUser, {
            role: 5 // (pimpinan desa)
        }, {new: true});

        const newPimpinanDesa = await ppModel.create({
            user: idUser
        });

        await dataUser.save();

        res.status(200).send({
            message: "Success create pimpinan desa",
            data: newPimpinanDesa
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
};
