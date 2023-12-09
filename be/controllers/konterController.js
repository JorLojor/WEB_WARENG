const db = require('../models/index');
const layananKonterModel = require('../models/userModels/konter/layananKonterModel');
const KonterModel = db.konter;
const LayananModel = db.layanan;
const SuratAcaraModel = db.suratAcara;

exports.getAllKonter = async (req, res) => {
    const page = parseInt(req.query.page);
    const limitt = parseInt(req.query.limit);
    try{
        const konter = await KonterModel.find()
        .populate('layanan')
        .limit(limitt)
        .skip((page-1)*limitt);

        res.status(200).send({
            message: "Success get all konter",
            data: konter,
            page: page,
            limit: limitt,
            total: konter.length
        });

    }catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving konter."
        });
    }

};
exports.postKonter = async (req,res) => {
    const { name, description, tags } = req.body;
    try{
        const konter = await KonterModel.create({
            name,
            description,
            tags
        });

        res.status(200).send({
            message: "Success create konter",
            data: konter
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating konter."
        });
    }
};

exports.getKonterById = async (req,res) => {
    const id = req.params.id;
    try{
        const konter = await KonterModel.findById(id);
        if (!konter) {
            return res.status(404).send({
                message: "konter not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success get konter by id",
            data: konter
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get konter by id."
        });
    }
};

exports.updateKonterById = async (req, res) => {
    const id = req.params.id;
    const { name, description, tags } = req.body;
    try {
       const konter = await KonterModel.findByIdAndUpdate(
          id,
          { name, description, tags },
          { new: true }
       );
       if (!konter) {
          return res.status(404).send({
             message: "konter not found with id " + id,
          });
       }
 
       res.status(200).send({
          message: "Success update konter by id",
          data: konter,
       });
    } catch (error) {
       res.status(500).send({
          message: error.message || "Some error occurred while updating konter by id.",
       });
    }
 }; 
exports.deleteKonterById = async (req,res) => {
    const id = req.params.id;
    try{
        const konter = await KonterModel.findByIdAndRemove(id);
        if (!konter) {
            return res.status(404).send({
                message: "konter not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success delete konter by id",
            data: konter
        });       
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete konter by id."
        });
    }
}


//merubah statusPersetujuan pada suratAcara menjadi disetujuiKonter
exports.SubmitSuratAcara = async (req,res) => {
    const id = req.params.id;
    const { suratAcaraId, wargaId } = req.body;
    try{
        const konter = await KonterModel.findById(id);
        if (!konter) {
            return res.status(404).send({
                message: "konter not found with id " + id
            });
        }
        const ChangePersetujuan = await SuratAcaraModel.findByIdAndUpdate(suratAcaraId,{ statusPersetujuan: 'disetujuiKonter' },{new: true});
        if (!ChangePersetujuan) {
            return res.status(404).send({
                message: "ChangePersetujuan not found with id " + id
            });
        }
        const layanan = await layananKonterModel.create({
            suratAcaraId: ChangePersetujuan._id,
            wargaId: wargaId,
            konterId: id,
            status: "disetujui Konter"
        })
        konter.layanan.push(layanan._id);
        await konter.save();
        res.status(200).send({
            message: "Success pelayanan konter by id",
            data: konter
        });       
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while pelayanan konter by id."
        });
    }
};
