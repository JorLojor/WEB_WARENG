const db = require('../models/index');
const WargaModel = db.warga;
const suratAcaraModel = db.suratAcara;
const RtModel = db.rt;

exports.getAllWarga = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Menambahkan nilai default jika query parameter tidak ada
        const limitt = parseInt(req.query.limit) || 10; // Menambahkan nilai default jika query parameter tidak ada

        console.log(`Received GET request to /api/v1/warga/get with page: ${page}, limit: ${limitt}`);
        
        const warga = await WargaModel.find()
            .populate('suratAcara')
            .limit(limitt)
            .skip((page - 1) * limitt);

        const total = await WargaModel.countDocuments();

        res.status(200).send({
            message: "Success get all warga",
            data: warga,
            page: page,
            limit: limitt,
            totalDocument: total
        });

    } catch (err) {
        console.error('Error while handling GET request to /api/v1/warga/get:', err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving warga."
        });
    }
};

exports.postWarga = async (req,res) => {
    const { name,nik,password, alamat, nohp, status,domisili } = req.body;
    try{
        const warga = await WargaModel.create({
            name,
            nik,
            password,
            alamat,
            nohp,
            status,
            domisili
        });

        res.status(200).send({
            message: "Success create warga",
            data: warga
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
};

exports.postManyWarga = async (req,res) => {
    try{
        const { wargas } = req.body;
        const warga = await WargaModel.insertMany(wargas);
        res.status(200).send({
            message: "Success create warga",
            data: warga
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
}

exports.getWargaById = async (req,res) => {
    const id = req.params.id;
    try{
        const warga = await WargaModel.findById(id);
        if (!warga) {
            return res.status(404).send({
                message: "warga not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success get warga by id",
            data: warga
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get warga by id."
        });
    }
}
        

exports.updateWargaById = async (req,res) => {
    const id = req.params.id;
    const updateData = req.body;
    try{
        const warga = await WargaModel.findByIdAndUpdate(id,updateData,{new: true}).populate('suratAcara');
        if (!warga) {
            return res.status(404).send({
                message: "warga not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success update warga by id",
            data: warga
        });
    }catch(error){ 
        res.status(500).send({
            message: error.message || "Some error occurred while update warga by id."
        });
    }   
};

exports.deleteWargaById = async (req,res) => {
    const id = req.params.id;
    try{
        const warga = await WargaModel.findByIdAndDelete(id);
        if (!warga) {
            return res.status(404).send({
                message: "warga not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success delete warga by id",
            data: warga
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete warga by id."
        });
    }
}



exports.CreateSuratAcara = async (req,res) => {
    try{
        const wargaId = req.params.id;
        const warga = await WargaModel.findById(wargaId);
        if (!warga) {
            return res.status(404).send({
                message: "warga not found with id " + id
            });
        }
        const { nameAcara, isiAcara, tanggalMulai,tanggalSelesai, tempatAcara} = req.body;
        //menegecek apakah warga sudah memiliki surat acara dengan nama acara yang sama
        const checkSuratAcara = warga.suratAcara.find((suratAcara) => suratAcara.nameAcara === nameAcara);
        if (checkSuratAcara) {
            console.log(checkSuratAcara);
            return res.status(400).send({
                message: "warga already has surat acara with name acara " + nameAcara
            });
        }
        const suratAcara = await suratAcaraModel.create({
            nameAcara,
            isiAcara,
            tanggalMulai,
            tanggalSelesai,
            tempatAcara,
            wargaId
        });
        warga.suratAcara.push(suratAcara._id);
        await warga.save();

        res.status(200).send({
            message: "Success create surat acara",
            data: suratAcara,
            author: warga
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while create surat acara."
        });
    }
};








exports.pengajuanSuratAcara = async (req, res) => {
    try {
        const userId = req.params.userId;
        const suratAcaraId = req.params.suratAcaraId;

        const user = await WargaModel.findById(userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + userId
            });
        }

        // mencari rt dengan domisili index ke 0 yang sama dengan user domisili index ke 0
        const Rt = await RtModel.find({ domisili: user.domisili[0] });
        if (!Rt || Rt.length === 0) {
            return res.status(404).send({
                message: "RT not found with domisili rt " + user.domisili[0]
            });
        }


        const suratAcara = await suratAcaraModel.findById(suratAcaraId);
        if (!suratAcara) {
            return res.status(404).send({
                message: "Surat Acara not found with id " + suratAcaraId
            });
        }

        // mengecek apakah surat acara sudah ada di dalam array suratAcaraPending
        const checkSuratAcara = Rt[0].suratAcaraPending.find((suratAcaraPending) => suratAcaraPending.toString() === suratAcaraId);
        if (checkSuratAcara) {
            return res.status(400).send({
                message: "Surat Acara already in pending",
                data: checkSuratAcara
            });
        }

        // memasukan surat acara ke dalam array yang berada di Rt.suratAcaraPending
        Rt[0].suratAcaraPending.push(suratAcara._id);
        await Rt[0].save();
        console.log('RT updated:', Rt);

        if (suratAcara.wargaId.toString() !== userId) {
            return res.status(403).send({
                message: "Forbidden. Surat Acara does not belong to the specified user."
            });
        }

        suratAcara.statusAcara = 'pengajuan';
        await suratAcara.save();

        res.status(200).send({
            message: "Surat Acara berhasil diajukan.",
            suratAcara: suratAcara
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while creating Surat Acara."
        });
    }
};









exports.deleteSuratAcaraById = async (req,res) =>{
    const UserId = req.params.userId;
    const SuratAcaraId = req.params.suratAcaraId;

    try{
        const User = await WargaModel.findById(UserId);
        if (!User) {
            return res.status(404).send({
                message: "User not found with id " + UserId
            });
        }
        const SuratAcara = await suratAcaraModel.findById(SuratAcaraId);
        if (!SuratAcara) {
            return res.status(404).send({
                message: "Surat Acara not found with id " + SuratAcaraId
            });
        }

        if (SuratAcara.wargaId.toString() !== UserId) {
            return res.status(403).send({
                message: "Forbidden. Surat Acara does not belong to the specified user."
            });
        }

        const dataSuratAcara = await suratAcaraModel.findByIdAndDelete(SuratAcaraId);

        res.status(200).send({
            message: "Success delete surat acara",
            data: dataSuratAcara
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete surat acara."
        });
    }
}


module.exports = exports;
