const db = require("../models");
const RwModel = db.rw;
const SuratAcaraModel = db.suratAcara;

// get all rw pagination
exports.getAllRw = async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;
        console.log(`Received GET request to /api/v1/rw/get with page: ${page}, limit: ${limit}`);
        
        const dataRw  = await RwModel.find()
            .limit(limit)
            .skip((page - 1) * limit);

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
    const { name,nik, alamat, nohp, status,domisili } = req.body;
    try{
        const rw = await RwModel.create({
            name,
            nik,
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

exports.persetujuanSurat = async (req,res)=>{
    const idSurat = req.params.SuratId;
    const idRw = req.params.RwId;
    const ReqStatusPersetujuan = req.body.statusPersetujuan; 
    try{
        // cari pak rw dengan id rw
        const PakRw = await RwModel.findById(idRw);
        if (!PakRw) {
            console.log("rw not found with id " + idRw);
            return res.status(404).send({
                message: "rw not found with id " + idRw
            });
        }
        // cari surat dengan id surat
        const surat = await SuratAcaraModel.findById(idSurat);
        if (!surat) {
            console.log("Surat not found with id " + idSurat);
            return res.status(404).send({
                message: "Surat not found with id " + idSurat
            });
        }

        if(surat.statusPersetujuan === "belum ada persetujuan" || surat.statusPersetujuan === "ditolak rt"){
            return res.status(404).send({
                message: "belum ada persetujuan dari rt"
            });
        }else if (surat.statusPersetujuan === "disetujui rt" && surat.statusAcara === "pengajuan rw"){
            if (ReqStatusPersetujuan === true) {
                surat.statusPersetujuan = "disetujui rw";
                surat.statusAcara = "pengajuan konter";
                surat.rwId = idRw;
                await surat.save();
                res.status(200).send({
                    message: "Success update persetujuan surat",
                    info: "surat sudah disetujui rw dan sudah di ajukan ke konter",
                    data: surat
                });
            }else{
                surat.statusPersetujuan = "ditolak rw";
                await surat.save();
                res.status(200).send({
                    message: "Success update persetujuan surat",
                    info: "surat sudah ditolak rw",
                    data: surat
                });
            }
            
        }
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while update persetujuan surat."
        });
    }
}





































































module.exports = exports;
