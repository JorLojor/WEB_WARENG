const db = require('../../models/index');
const RtModel = db.rt;
const RwModel = db.rw;
const userModel = db.user;
const SuratAcaraModel = db.suratAcara;


exports.getAllRt = async (req, res) => {
    try {
        const rt = await RtModel.find().populate('user');
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
        const {name, nik} = req.body;

        const newRt = await RtModel.create({
            name,
            nik,
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

exports.postManyRt = async (req, res) => {
    try{
        const { rts } = req.body;
        const newRt = await RtModel.insertMany(rts);
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

exports.updateRt = async (req, res) => {
    const updateData = req.body;
    const id = req.params.id;
    try{
        const updatedRt = await RtModel.findByIdAndUpdate(id, updateData,{new: true});
        if(!updatedRt){
            return res.status(404).send({
                message: "Failed update rt with id " + id,
                data: null
            });
        }

        if (updatedRt.isModified === 0) {
            return res.status(200).send({
                message: "Data not changed",
                data: updatedRt
            });
        }

        res.status(200).send({
            message: "Success update rt",
            data: updatedRt
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while update rt.",
            data: null
        });
    }
}

exports.deleteRt = async (req, res) => {
    const _id = req.params.id;
    try{
        const deletedRt = await RtModel.findByIdAndDelete(_id);
        if(!deletedRt){
            return res.status(404).send({
                message: "Failed delete rt with id " + id,
                data: null
            });
        }

        res.status(200).send({
            message: "Success delete rt",
            data: deletedRt
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete rt.",
            data: null
        });
    }
}







module.exports = exports;
