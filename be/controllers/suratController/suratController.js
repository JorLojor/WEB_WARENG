const db = require('../../models/index');
const WargaModel = db.warga;
const userModel = db.user;
const suratAcaraModel = db.suratAcara;
const RtModel = db.rt;
const RwModel = db.rw;
const PerangkatDesaModel = db.PerangkatDesaModel;
const PimpinanDesa = db.pimpinanDesa;
const bcrypt = require('bcrypt');
const puppeteer = require('puppeteer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const {generatePDF} = require('../../middleware/fileUpload');
const {kasiDecider} = require('../../middleware/kasiDecider') 


exports.createSuratPdf_TAVERSION = async (req, res) => {
    try {
        const {idWarga} = req.params;
        const { nameAcara, jenisSurat, isiAcara, tanggalMulai, tanggalSelesai, tempatAcara } = req.body;

        const dataWarga = await WargaModel.findById(idWarga).populate('user');
        const Rt = await RtModel.findOne({ ketuaRt: dataWarga.user.domisili[0] }).populate('user');
        
        if (!Rt || Rt.length === 0) {
            return res.status(404).send({
                message: "RT not found with domisili rt " + dataWarga.user.domisili[0]
            });
        }
        const Rw = await RwModel.findOne({ ketuaRw: dataWarga.user.domisili[1] }).populate('user');
        console.log('Rw:', Rw);
        console.log('nama Rw:', Rw.user.alamat);
        if (!Rw || Rw.length === 0) {
            return res.status(404).send({
                message: "RW not found with domisili rw " + dataWarga.user.domisili[1]
            });
        }
        const rolePerangkatDesa = kasiDecider(jenisSurat);
        console.log('rolePerangkatDesa:', rolePerangkatDesa);
        const Kasi = await PerangkatDesaModel.findOne({ rolePD: rolePerangkatDesa.role });
        console.log('Kasi:', Kasi);

        const kades = await PimpinanDesa.findOne({rolePemimpinDesa: 1});
        if (!kades) {
            return res.status(404).send({
                message: "Kades not found"
            });
        }
        console.log('kades:', kades);
    
        //pengondisian jika kasi tidak ditemukan
        if(rolePerangkatDesa === "rolePd not found"){
            throw new Error(`Kasi administasi ${jenisSurat} not found`);
        }

        // Periksa apakah si surat acara dengan nama yang sama sudah ada
        const existingSuratAcara = await suratAcaraModel.findOne({
            nameAcara,
            wargaId: dataWarga._id
        });
        if (existingSuratAcara) {
            throw new Error(`Surat Acara with name ${nameAcara} already exists`);
        }

        // Buat surat acara baru
        const suratAcara = await suratAcaraModel.create({
            nameAcara,
            jenisSurat: jenisSurat.toLowerCase(),
            isiAcara,
            tanggalMulai,
            tanggalSelesai,
            tempatAcara,
            wargaId: dataWarga._id
        });
        // Tambahkan ID surat acara ke array suratAcara di warga
        dataWarga.suratAcara.push(suratAcara._id);
        await dataWarga.save();
        // // tmbahkan ID surat acara ke array suratAcaraPending di Rt
        Rt.suratAcaraComing.push(suratAcara._id);
        
        await Rt.save();
        // tambahkan ID surat acara ke array suratAcaraPending di Rw
        Rw.suratAcaraComing.push(suratAcara._id);
        await Rw.save();
        // tamabhakan ID surat acara ke array suratAcaraPending di Kasi
        Kasi.suratAcaraComing.push(suratAcara._id);
        await Kasi.save();
         // tambahkan ID surat acara ke array suratAcaraComing di Kades
        kades.suratAcaraComing.push(suratAcara._id);
        await kades.save();
        
        if (suratAcara.wargaId.toString() !== dataWarga._id.toString()) {
            return res.status(403).send({
                message: "Forbidden. Surat Acara does not belong to the specified user."
            });
        }
        const data = {
            nameAcara: suratAcara.nameAcara,
            jenisSurat : suratAcara.jenisSurat,
            isiAcara : suratAcara.isiAcara,
            tanggalMulai : suratAcara.tanggalMulai,
            tanggalSelesai : suratAcara.tanggalSelesai,
            tempatAcara : suratAcara.tempatAcara,
            Rt : Rt.ketuaRt,
            Rw : Rw.ketuaRw,
            RtName : Rt.user.name,
            RwName : Rw.user.name
        };

        const SuratResultPdf = await generatePDF(data);
        res.status(200).send({
            message: "Success create surat acara",
            data: SuratResultPdf
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while creating Surat Acara."
        });
    }
}




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
