const db = require("../../models/index");
const userModel = db.user;
const crypto = require('crypto');//import crypto

exports.getAllUser = async (req,res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        console.log(`Received GET request to /api/v1/user/get with page: ${page}, limit: ${limit}`);

        const dataUser = await userModel.find()
            .limit(limit)
            .skip((page - 1) * limit);
            

        const dataTotal = await userModel.countDocuments();

        res.status(200).send({
            message: "Success get all user",
            data: dataUser,
            page: page,
            limit: limit,
            totalDocument: dataTotal
        });

    }catch(error){
        console.log('Error while handling GET request to /api/v1/user/get:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while get all user."
        });
    }
}

exports.getUserById = async (req,res) => {
    try{
        const { id } = req.params;
        const dataUser = await userModel.findById(id);
        res.status(200).send({
            message: "Success get user by id",
            data: dataUser
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get user by id."
        });
    }
}

exports.postUser = async (req,res) => {
    try{
        const { name,nik,password, alamat, nohp, statusPerkawinan ,domisili } = req.body;

        const iv = crypto.randomBytes(16);
        const aesKey = "th1s0W1ll0B30War3ng03ncrypted0K3y";

        const encryptedNik = encrypt(nik, aesKey, iv);
        const encryptedAlamat = encrypt(alamat, aesKey, iv);
        const encryptedNohp = encrypt(nohp, aesKey, iv);

        const newUser = await userModel.create({
            name : name.toUpperCase(),
            nik : encryptedNik,
            password,
            alamat: encryptedAlamat.toUpperCase(),
            nohp : encryptedNohp,
            statusPerkawinan : statusPerkawinan.toUpperCase(),
            domisili : domisili.map((domisili) => domisili.toUpperCase())
        });
        res.status(200).send({
            message: "Success create user",
            data: newUser
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
}

//mas bro ini aku tambahin fungsi disini gapapa kali ya
function encrypt(text, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return {
      encryptedData: encrypted,
      initializationVector: iv.toString('hex'), // Base64 atau hex encoding umum digunakan
    };
}

exports.postManyUser = async (req,res) => {
    try{
        const { data } = req.body;
        const newUser = await userModel.insertMany(data);
        res.status(200).send({
            message: "Success create user",
            data: newUser
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
}
// untuk melengkapi data user
exports.updateuserById = async (req,res) => {
    try{
        const id = req.params.id;
        const updateData = req.body;
        // data
        if (updateData.name) updateData.name = updateData.name.toUpperCase();
        if (updateData.alamat) updateData.alamat = updateData.alamat.toUpperCase();
        if (updateData.statusPerkawinan) updateData.statusPerkawinan = updateData.statusPerkawinan.toUpperCase();
        if (updateData.tempatlahir) updateData.tempatlahir = updateData.tempatlahir.toUpperCase();
        if (updateData.tanggallahir) updateData.tanggallahir = updateData.tanggallahir.toUpperCase();
        if (updateData.agama) updateData.agama = updateData.agama.toUpperCase();
        if (updateData.jenisKelamin) updateData.jenisKelamin = updateData.jenisKelamin.toUpperCase();
        if (updateData.pekerjaan) updateData.pekerjaan = updateData.pekerjaan.toUpperCase();
        if (updateData.domisili) updateData.domisili = updateData.domisili.map((domisili) => domisili.toUpperCase());

        const dataUdatedValid = {
            name: updateData.name,
            nik: updateData.nik,
            alamat: updateData.alamat,
            statusPerkawinan: updateData.statusPerkawinan,
            tempatlahir: updateData.tempatlahir,
            tanggallahir: updateData.tanggallahir,
            agama: updateData.agama,
            pekerjaan: updateData.pekerjaan,
            domisili: updateData.domisili
        };
        const user = await userModel.findByIdAndUpdate(id,dataUdatedValid,{new: true});
        if (!user) {
            return res.status(404).send({
                message: "user not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success update user by id",
            data: user
        });
    }catch(error){ 
        res.status(500).send({
            message: error.message || "Some error occurred while update user by id."
        });
    }   
};

exports.deleteUserById = async (req,res) => {
    const id = req.params.id;
    try{
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({
                message: "user not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success delete user by id",
            data: user

        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete user by id."
        });
    }
}


module.exports = exports;
