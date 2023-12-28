const db = require("../../models/index");
const mongoose = require("mongoose");
const KadesModel = db.kades;
const SuratAcaraModel = db.suratAcara;


exports.getKades = async (req, res) => {
    try{
        const roleKades = "kades";
        const roleWakilKades = "wakil kades";
        const {role} = req.params;
        if (!role){
            return res.status(400).send({
                message: "Role not found"
            });
        }
        if (role !== roleKades && role !== roleWakilKades){
            return res.status(400).send({
                message: "Role not found"
            });
        }
        if (role === roleKades){
            const dataKades = await KadesModel.find({role: roleKades})
            if (!dataKades){
                return res.status(404).send({
                    message: "Data kades not found"
                });
            }
            res.status(200).send({
                message: "Success get kades",
                data: dataKades
            });
        }

        if (role === roleWakilKades){
            const dataKades = await KadesModel.find({role: roleWakilKades})
            if (!dataKades){
                return res.status(404).send({
                    message: "Data wakil kades not found"
                });
            }
            res.status(200).send({
                message: "Success get wakil kades",
                data: dataKades
            });
        }

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get kades."
        });
    }
   

}

exports.postKadesWakades = async (req, res) => {
    try{
        const {name, nik, password, alamat, nohp, status, role} = req.body;
        const newKades = new KadesModel({
            name,
            nik,
            password,
            alamat,
            nohp,
            status,
            role
        });
        const dataKades = await newKades.save();
        res.status(200).send({
            message: "Success create kades",
            data: dataKades
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while post kades."
        });
    }
}

exports.updateKadesByRole = async (req, res) => {
    try{
        const {role} = req.params;
        const {name, nik, password, alamat, nohp, status} = req.body;
        if (!role){
            return res.status(400).send({
                message: "Role not found"
            });
        }
        const dataKades = await KadesModel.findOneAndUpdate({role: role}, {
            name,
            nik,
            password,
            alamat,
            nohp,
            status
        }, {new: true});
        if (!dataKades){
            return res.status(404).send({
                message: "Data kades not found"
            });
        }
        res.status(200).send({
            message: "Success update kades",
            data: dataKades
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while update kades."
        });
    }
}

exports.deleteKadesById = async (req, res) => {
    try{
        const {id} = req.params;
        const dataKades = await KadesModel.findByIdAndDelete(id);
        if (!dataKades){
            return res.status(404).send({
                message: "Data kades not found"
            });
        }
        res.status(200).send({
            message: "Success delete kades",
            data: dataKades
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete kades."
        });
    }
}

exports.SubmitSuratKades = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {kadesId, suratAcaraId} = req.body;
        const dataKades = await KadesModel.findById([kadesId], {session: session});
        if (!dataKades){
            await session.abortTransaction();
            return res.status(404).send({
                message: "Data kades not found"
            });
        }
        const dataSuratAcara = await SuratAcaraModel.findById([suratAcaraId], {session: session});
        if (!dataSuratAcara){
            await session.abortTransaction();
            return res.status(404).send({
                message: "Data surat acara not found"
            });
        }
        if (dataSuratAcara.statusPersetujuan === "disetujui"){
            await session.abortTransaction();
            return res.status(400).send({
                message: "Surat acara sudah disetujui"
            });
        }

    }catch(error){
        await session.abortTransaction();
        res.status(500).send({
            message: error.message || "Some error occurred while submit surat kades."
        });
    }finally{
        session.endSession();
    }
};
