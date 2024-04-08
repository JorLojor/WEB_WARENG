const db = require('../../models/index');
const konter = db.konter;

exports.getDataKonter = async (req, res) => {
    try{
        const dataKonter = await konter.find();
        const totalPelayanan = await dataKonter.pelayanan;

        console.log(totalPelayanan)

        return res.status(200).send({
            message: "Success get all konter",
            data: dataKonter,
            totalPelayanan: totalPelayanan
        }); 
        
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while get all konter."
        });
    }
};

exports.getDataKonterById = async (req, res) => {
    try{
        const dayaKonter = await db.konter.findById(req.params.id);
        return res.status(200).send({
            message: "Success get konter by id",
            data: dayaKonter
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while get konter by id."
        });
    }
};

exports.createKonter = async (req, res) => {
    const {konterName} = req.body;
    try{
        const newKonter = new konter({
            konterName
        });

        const saveKonter = await newKonter.save();
        return res.status(200).send({
            message: "Success create konter",
            data: saveKonter
        });


    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while create konter."
        });
    }
};

exports.updateKonter = async (req, res) => {
    try{
        // nyusull

    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while update konter."
        });
    }
};

exports.deleteKonter = async (req, res) => {
    try{
        // nyusull

    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while delete konter."
        });
    }
};



module.exports = exports;   
