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

const getRolePd = (jenisSurat) => {
    const pd1 = [
        "surat keterangan domisili",
        "surat keterangan usaha",
        "surat kenal lahir",
        "surat pindah",
        "surat pengantar skck",
        "surat izin keramaian",
        "surat izin pepergian",
    ];

    const pd2 = [
        "pembuatan kk baru",
        "pembuatan ktp baru",
        "pembuatan ktp lama",
        "pemecahan kk lama",
        "pbb-p2",
        "mutasi pbb",
        "pencatatan kependudukan",
    ];

    const pd3 = [
        "surat kematian",
        "surat kelahiran",
        "santunan kematian",
        "pengajuan jkn-kis",
        "koordinator rtlh",
        "pendataan masalah sosial",
        "bantuan sosial",
    ];
    if (pd1.includes(jenisSurat)) return 1;
    if (pd2.includes(jenisSurat)) return 2;
    if (pd3.includes(jenisSurat)) return 3;

}

const getKasiType = (rolePd) => {
    const kasiTypes = ["pelayanan", "pemerintahan", "kersa"];
    return kasiTypes[rolePd - 1] || ""; 
};

exports.persetujuanSurat = async (req, res) => {
    const { SuratId, RwId } = req.params;
    const { statusPersetujuan } = req.body;

    try {
        const PakRw = await RwModel.findById(RwId);
        const surat = await SuratAcaraModel.findById(SuratId);

        if (!PakRw || !surat) {
            return res.status(404).send({
                message: "RW or Surat not found."
            });
        }

        if (surat.statusPersetujuan === "belum ada persetujuan" || surat.statusPersetujuan === "ditolak rt") {
            return res.status(404).send({
                message: "Belum ada persetujuan dari RT."
            });
        }

        if (surat.statusPersetujuan === "disetujui rt" && surat.statusAcara === "pengajuan rw") {
            if (statusPersetujuan === true) {
                surat.statusPersetujuan = "disetujui rw";
                const rolePd = getRolePd(surat.jenisSurat);

                if (rolePd) {
                    surat.statusAcara = `pengajuan perangkat desa kasi ${getKasiType(rolePd)}`;
                    const Kasi = await PerangkatDesaModel.findOne({ rolePD: rolePd });

                    if (Kasi) {
                        Kasi.suratAcaraPending.push(surat._id);
                        await Kasi.save();

                        surat.rwId = RwId;
                        await surat.save();

                        PakRw.suratAcaraApproved.push(surat._id);
                        const indexData = PakRw.suratAcaraPending.indexOf(surat._id);
                        PakRw.suratAcaraPending.splice(indexData, 1);
                        await PakRw.save();

                        return res.status(200).send({
                            message: "Success update persetujuan surat",
                            info: "Surat sudah disetujui RW dan sudah diajukan ke Perangkat Desa",
                            data: surat
                        });

                        
                    } else {
                        return res.status(404).send({
                            message: "Perangkat Desa not found."
                        });
                    }
                }

            } else {
                surat.statusPersetujuan = "ditolak rw";
                await surat.save();
                return res.status(200).send({
                    message: "Success update persetujuan surat",
                    info: "Surat ditolak RW",
                    data: surat
                });
            }
        }
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Some error occurred while updating persetujuan surat."
        });
    }
};





































































module.exports = exports;
