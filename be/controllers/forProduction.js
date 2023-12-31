const db = require('../models');
const WargaModel = db.warga;
const SuratAcaraModel = db.suratAcara;
const rtModel = db.rt;
const rwModel = db.rw;
const pdModel = db.PerangkatDesaModel;
const ppModel = db.pimpinanDesa;
const userModel = db.user;


exports.postManyUser = async (req, res) => {
    try{
        const data = req.body;

        const result = await userModel.insertMany(data);

        res.status(200).send({
            success: true,
            message: "Berhasil menambahkan warga",
            data: result
        })
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message: err.message});
    }
};

















































exports.deleteManyWarga = async (req, res) => {
    try{
        const dataWarga = req.body;

        const result = await WargaModel.deleteMany(dataWarga);

        res.status(200).send({
            success: true,
            message: "Berhasil menghapus warga",
            data: result
        })
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,message: err.message});
    }
}


const WargaModel = require('../models/wargaModel');

exports.bulkDeleteWarga = async (req, res) => {
    try {
        const filterCriteria = req.body; 

        const result = await WargaModel.deleteMany(filterCriteria);

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} data deleted successfully`,
            data: result
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Some error occurred while bulk deleting data."
        });
    }
};


module.exports = exports;
