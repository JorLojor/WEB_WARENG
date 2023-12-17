const db = require('../models/index');
const perangkatDesa = db.perangkatDesa;
const SuratAcaraModel = db.suratAcara;
const WargaModel = db.warga;

exports.getAllPerangkatDesa = async (req, res) => {
    const page = parseInt(req.query.page);
    const limitt = parseInt(req.query.limit);
    try{
        const konter = await perangkatDesa.find()
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
exports.postPerangkatDesa = async (req,res) => {
    const { name, description, tags } = req.body;
    try{
        const konter = await perangkatDesa.create({
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

exports.getPerangkatDesaById = async (req,res) => {
    const id = req.params.id;
    try{
        const konter = await perangkatDesa.findById(id);
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

exports.updatePerangkatDesaById = async (req, res) => {
    const id = req.params.id;
    const { name, description, tags } = req.body;
    try {
       const konter = await perangkatDesa.findByIdAndUpdate(
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
exports.deletePerangkatDesaById = async (req,res) => {
    const id = req.params.id;
    try{
        const konter = await perangkatDesa.findByIdAndRemove(id);
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
        const perangkatDesa = await perangkatDesa.findById(id);
        if (!perangkatDesa) {
            return res.status(404).send({
                message: "konter not found with id " + id
            });
        }
        const ChangePersetujuan = await SuratAcaraModel.findByIdAndUpdate(suratAcaraId,{ statusPersetujuan: 'disetujui perangkat desa' },{new: true});
        if (!ChangePersetujuan) {
            return res.status(404).send({
                message: "ChangePersetujuan not found with id " + id
            });
        }
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
