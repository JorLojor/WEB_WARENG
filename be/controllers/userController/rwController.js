const db = require("../../models");
const RwModel = db.rw;
const SuratAcaraModel = db.suratAcara;
const PerangkatDesaModel = db.PerangkatDesaModel;

// get all rw pagination
exports.getAllRw = async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;
        console.log(`Received GET request to /api/v1/rw/get with page: ${page}, limit: ${limit}`);
        
        const dataRw  = await RwModel.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .populate('user')

        const total = await RwModel.countDocuments();

        res.status(200).send({
            message: "Success get all rw",
            data: dataRw,
            page: page,
            limit: limit,
            totalDocument: total
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get all rw."
        });
    }
}

exports.getRwById = async (req,res)=>{
    try{
        const rw = await RwModel.findById(req.params.id);
        res.status(200).send({
            message: "Success get rw by id",
            data: rw
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get rw by id."
        });
    }
}

exports.postRw = async (req,res)=>{
    const { name,nik,password, alamat, nohp, status,domisili } = req.body;
    try{
        const rw = await RwModel.create({
            name,
            nik,
            password,
            alamat,
            nohp,
            status,
            domisili
        });

        res.status(200).send({
            message: "Success create rw",
            data: rw
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating rw."
        });
    }
};

exports.postManyRw = async (req,res)=>{
    try{
        const { rws } = req.body;
        const rw = await RwModel.insertMany(rws);
        res.status(200).send({
            message: "Success create rw",
            data: rw
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating rw."
        });
    }
}

exports.updateRwById = async (req,res)=>{
    const id = req.params.id;
    const updateData = req.body;
    try{
        const dataRw = await RwModel.findByIdAndUpdate(id,updateData,{new: true}).populate('suratAcara');

        if (!dataRw) {
            return res.status(404).send({
                message: "rw not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success update rw by id",
            data: dataRw
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while update rw by id."
        });
    }
}

exports.deleteRwById = async (req,res)=>{
    const id = req.params.id;
    try{
        const dataRw = await RwModel.findByIdAndDelete(id);

        if (!dataRw) {
            return res.status(404).send({
                message: "rw not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success delete rw by id",
            data: dataRw
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete rw by id."
        });
    }
}

module.exports = exports;
