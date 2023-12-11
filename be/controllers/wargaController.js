const db = require('../models/index');
const WargaModel = db.warga;
const suratAcaraModel = db.suratAcara;

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
    const { name,nik, alamat, nohp, status } = req.body;
    try{
        const warga = await WargaModel.create({
            name,
            nik,
            alamat,
            nohp,
            status
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
    const { name,nik, alamat, nohp, status } = req.body;
    try{
        const warga = await WargaModel.findByIdAndUpdate(id,{ name,nik, alamat, nohp, status },{new: true}).populate('suratAcara');
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
        const warga = await WargaModel.findByIdAndRemove(id);
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
        const warga = await WargaModel.findById(wargaId);
        if (!warga) {
            return res.status(404).send({
                message: "warga not found with id " + id
            });
        }
        const { nameAcara, isiAcara, tanggalMulai,tanggalSelesai, tempatAcara, wargaId } = req.body;
        //menegecek apakah warga sudah memiliki surat acara dengan nama acara yang sama
        const checkSuratAcara = await suratAcaraModel.findOne({nameAcara: nameAcara});
        if(checkSuratAcara.nameAcara === nameAcara){
            return res.status(404).send({
                message: "warga already have surat acara with name " + nameAcara
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


module.exports = exports;
