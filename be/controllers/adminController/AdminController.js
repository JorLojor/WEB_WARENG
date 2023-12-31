const db = require('../../models');
const WargaModel = db.warga;
const rtModel = db.rt;
const rwModel = db.rw;
const pdModel = db.PerangkatDesaModel;
const ppModel = db.pimpinanDesa;
const userModel = db.user;

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
        const {name, nik, nohp, username, password} = req.body;

        const admin = await AdminModel.findByIdAndUpdate(id, {
            name,
            nik,
            nohp,
            username,
            password
        }, {new: true});

        res.status(200).send({
            message: "success update admin",
            admin
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

        const admin = await AdminModel.findByIdAndRemove(id);

        res.status(200).send({
            message: "success delete admin",
            admin
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
}
