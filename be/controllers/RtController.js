const db = require('../models/index');
const RtModel = db.rt;


exports.getAllRt = async (req, res) => {
    try {
        const rt = await RtModel.find();
        res.status(200).send({
            message: "Success get all rt",
            data: rt
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while get all rt."
        });
    }
}

exports.getRtById = async (req, res) => {
    try {
        const rt = await RtModel.findById(req.params.id);
        res.status(200).send({
            message: "Success get rt by id",
            data: rt
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while get rt by id."
        });
    }
}

exports.createRt = async (req, res) => {
    try{
        const {name, nik, alamat, nohp, status} = req.body;

        const newRt = await RtModel.create({
            name,
            nik,
            alamat,
            nohp,
            status
        });

        if(!newRt){
            return res.status(400).send({
                message: "Failed create rt",
                data: null
            });
        }
        
        res.status(200).send({
            message: "Success create rt",
            data: newRt
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while create rt.",
            data: null
        });
    }
}



module.exports = exports;
