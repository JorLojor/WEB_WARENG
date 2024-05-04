const db = require('../../models/index');
const perangkatDesa = db.PerangkatDesaModel;
const SuratAcaraModel = db.suratAcara;
const PimpinanDesaModel = db.pimpinanDesa;
const WargaModel = db.warga;

exports.getAllPerangkatDesa = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const perangkatDesaList = await perangkatDesa.find()
            .limit(limit)
            .skip((page - 1) * limit);
        const total = await perangkatDesa.countDocuments();

        res.status(200).send({
            message: "Success get all konter",
            data: perangkatDesaList,
            page: page,
            limit: limit,
            totalDocument: total
        });

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving konter."
        });
    }
};

exports.postPerangkatDesa = async (req,res) => {
    const { name, nik,password, alamat, nohp, status,role } = req.body;
    try{
        const newPerangkatDesa = await perangkatDesa.create({
            name,
            nik,
            password,
            alamat,
            nohp,
            status,
            role
        });

        res.status(200).send({
            message: "Success create konter",
            data: newPerangkatDesa
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while post konter."
        });
    }
};

exports.getPerangkatDesaById = async (req,res) => {
    const id = req.params.id;
    try{
        const Datakonter = await perangkatDesa.findById(id);
        if (!Datakonter) {
            return res.status(404).send({
                message: "perangkat desa not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success get perangkat desa by id",
            data: Datakonter
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

//merubah statusPersetujuan pada suratAcara menjadi disetujui perangkat desa
