const db = require('../models/index');
const RtModel = db.rt;
const RwModel = db.rw;
const SuratAcaraModel = db.suratAcara;


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
        const {name, nik,password, alamat, nohp, status} = req.body;

        const newRt = await RtModel.create({
            name,
            nik,
            password,
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



exports.persetujuanSuratAcara = async (req, res) => {
    const idSurat = req.params.suratAcaraId; // Ubah dari req.params.id menjadi req.params.suratAcaraId
    const idRt = req.params.rtId; // Ubah dari req.params.id menjadi req.params.rtId
    const statusPersetujuan = req.body.statusPersetujuan;

    try {
        const PakRt = await RtModel.findById(idRt);
        if (!PakRt) {
            console.error("RT not found with id", idRt);
            return res.status(404).send({
                message: "RT not found with id " + idRt
            });
        }

        const suratAcara = await SuratAcaraModel.findById(idSurat);
        if (!suratAcara) {
            console.error("Surat Acara not found with id", idSurat);
            return res.status(404).send({
                message: "Surat Acara not found with id " + idSurat
            });
        }

        if (suratAcara.statusPersetujuan === 'belum ada persetujuan') {
            suratAcara.rtId = idRt;

            if (statusPersetujuan === true) {
                suratAcara.statusPersetujuan = 'disetujui rt';
                PakRt.suratAcaraApproved.push(suratAcara._id);
                // mencari rw dengan domisili[1] sama dengan rt domisili[1]
                const PakRw = await RwModel.findOne({ domisili: PakRt.domisili[1] });
                console.log("PakRw", PakRw);
                if (!PakRw || PakRw.length === 0) {
                    console.error("RW not found with domisili rw", PakRt.domisili[1]);
                    return res.status(404).send({
                        message: "RW not found with domisili rw " + PakRt.domisili[1]
                    });
                }
                suratAcara.statusAcara = 'pengajuan rw';
                PakRw.suratAcaraPending.push(suratAcara._id);
                await PakRw.save();
                
            } else if (statusPersetujuan === false) {
                suratAcara.statusPersetujuan = 'ditolak rt';
                PakRt.suratAcaraRejected.push(suratAcara._id);
            }
            
            await suratAcara.save(); // Simpan perubahan surat acara ke dalam database
            await PakRt.save(); // Simpan perubahan RT ke dalam database
            
            console.log("Surat Acara successfully updated with RT approval status.");
            res.status(200).send({
                message: "Surat Acara successfully updated with RT approval status."
            });
        } else {
            console.error("Surat Acara has already been approved or rejected.");
            res.status(400).send({
                message: "Surat Acara has already been approved or rejected."
            });
        }

    } catch (error) {
        console.error("Error in persetujuanSuratAcara:", error);
        res.status(500).send({
            message: error.message || "Some error occurred while updating surat acara."
        });
    }
};




module.exports = exports;
