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
const {getKasiType} = require('../../middleware/kasiDecider')


exports.getAllSuratAcaraLessDetail_TAVERSION = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        let arrDataSuratAcara = [];
        const limit = parseInt(req.query.limit) || 10;
        const dataSuratAcara = await suratAcaraModel.find()
            .limit(limit)
            .skip((page - 1) * limit);
        dataSuratAcara.forEach((suratAcara) => {
            arrDataSuratAcara.push({
                nameAcara: suratAcara.nameAcara,
                jenisSurat: suratAcara.jenisSurat,
                isiAcara: suratAcara.isiAcara,
                statusAcara: suratAcara.statusAcara,
                tanggalMulai: suratAcara.tanggalMulai,
                tanggalSelesai: suratAcara.tanggalSelesai,
            });
        });
            
        const dataTotal = await suratAcaraModel.countDocuments();
        res.status(200).send({
            message: "Success get all surat acara",
            data: arrDataSuratAcara,
            page: page,
            limit: limit,
            totalDocument: dataTotal
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get all surat acara."
        });
    }
}


exports.wargaCreateSurat_TAVERSION = async (req, res) => {
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
        Rt.suratAcaraPending.push(suratAcara._id);
        
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

        res.status(200).send({
            message: "Success create surat acara",
            data: suratAcara
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while creating Surat Acara."
        });
    }
}

exports.generateSuratPdf_TAVERSION = async (req, res) => {
    try {
        const {idSuratAcara} = req.params;
        const suratAcara = await suratAcaraModel.findById(idSuratAcara).populate('wargaId');
        if (!suratAcara) {
            throw new Error(`Surat Acara with id ${idSuratAcara} not found`);
        }
        const data = {
            nameAcara: suratAcara.nameAcara,
            jenisSurat : suratAcara.jenisSurat,
            isiAcara : suratAcara.isiAcara,
            tanggalMulai : suratAcara.tanggalMulai,
            tanggalSelesai : suratAcara.tanggalSelesai,
            tempatAcara : suratAcara.tempatAcara,
            Rt : suratAcara.rtId,
            Rw : suratAcara.rwId,
            Warga : suratAcara.wargaId
        };
        const SuratResultPdf = await generatePDF(data);
        res.status(200).send({
            message: "Success generate surat acara",
            data: SuratResultPdf
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Some error occurred while generating Surat Acara."
        });
    }
};

exports.updateSuratPdf_TAVERSION = async (req, res) => {
    try {
        const {idSuratAcara} = req.params;
        const { nameAcara,isiAcara, tanggalMulai, tanggalSelesai, tempatAcara, } = req.body;
        const suratAcara = await suratAcaraModel.findById(idSuratAcara)
        if (!suratAcara) {
            throw new Error(`Surat Acara with id ${idSuratAcara} not found`);
        }

        if (!suratAcara.statusAcara === 'revision') {
            throw new Error(`Surat Acara with id ${idSuratAcara} is not revision status`);
        }
        if (nameAcara) {
            suratAcara.nameAcara = nameAcara;
        }
        if (isiAcara) {
            suratAcara.isiAcara = isiAcara;
        }
        if (tanggalMulai) {
            suratAcara.tanggalMulai = tanggalMulai;
        }
        if (tanggalSelesai) {
            suratAcara.tanggalSelesai = tanggalSelesai;
        }
        if (tempatAcara) {
            suratAcara.tempatAcara = tempatAcara;
        }
        await suratAcara.save();
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Some error occurred while updating Surat Acara."
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

//Rt
exports.persetujuanSuratAcaraRt_TAVERSION = async (req, res) => {
    const idSurat = req.params.suratAcaraId; 
    const idRt = req.params.rtId; 
    const statusPersetujuanReq = req.body.statusPersetujuan;

    try {
        const PakRt = await RtModel.findById(idRt);
        if (!PakRt) {
            console.error("RT not found with id", idRt);
            return res.status(404).send({
                message: "RT not found with id " + idRt
            });
        }

        const userRt = await userModel.findById(PakRt.user);
        if (!userRt) {
            console.error("User RT not found with id", PakRt.user);
            return res.status(404).send({
                message: "User RT not found with id " + PakRt.user
            });
        }

        const suratAcara = await suratAcaraModel.findById(idSurat);
        if (!suratAcara) {
            console.error("Surat Acara not found with id", idSurat);
            return res.status(404).send({
                message: "Surat Acara not found with id " + idSurat
            });
        }

        if (suratAcara.statusPersetujuan === 'belum ada persetujuan') {
            suratAcara.rtId = idRt;

            if (statusPersetujuanReq === true) {
                suratAcara.statusPersetujuan = 'disetujui rt';
                PakRt.suratAcaraApproved.push(suratAcara._id);
                const dataIndex = PakRt.suratAcaraPending.indexOf(suratAcara._id);
                PakRt.suratAcaraPending.splice(dataIndex, 1);

                
                const PakRw = await RwModel.findOne({ ketuaRw: userRt.domisili[1] });
                if (!PakRw || PakRw.length === 0) {
                    console.error("RW not found with domisili rw", userRt.domisili[1]);
                    return res.status(404).send({
                        message: "RW not found with domisili rw " + userRt.domisili[1]
                    });
                }
                suratAcara.statusAcara = 'pengajuan rw';
                PakRw.suratAcaraPending.push(suratAcara._id);
                const dataIndexRw = PakRw.suratAcaraComing.indexOf(suratAcara._id);
                PakRw.suratAcaraComing.splice(dataIndexRw, 1);

                await PakRw.save();
                await PakRt.save();
                
            } else if (statusPersetujuanReq === false) {
                suratAcara.statusPersetujuan = 'ditolak rt';
                PakRt.suratAcaraRejected.push(suratAcara._id);
                await PakRt.save();
            }
            
            await suratAcara.save();
            await PakRt.save();
            
            res.status(200).send({
                message: "Surat Acara successfully updated with RT approval status." + statusPersetujuanReq,
                data: suratAcara
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

//Rw\
exports.persetujuanSuratAcaraRw_TAVERSION = async (req, res) => {
    try {
        console.log('masuk');
        const { SuratId, RwId } = req.params;
        const { statusPersetujuanReq } = req.body;
        const PakRw = await RwModel.findById(RwId);
        const surat = await suratAcaraModel.findById(SuratId);

        if (!PakRw) {
            return res.status(404).send({
                message: "RW not found."
            });
        }

        if (!surat) {
            return res.status(404).send({
                message: "Surat not found."
            });
        }

        if (surat.statusPersetujuan === "belum ada persetujuan" || surat.statusPersetujuan === "ditolak rt") {
            return res.status(404).send({
                message: "Belum ada persetujuan dari RT."
            });
        }

        if (surat.statusPersetujuan === "disetujui rt" && surat.statusAcara === "pengajuan rw") {
            if (statusPersetujuanReq === true) {
                surat.statusPersetujuan = "disetujui rw";
                const rolePd = kasiDecider(surat.jenisSurat);

                if (rolePd !== null) {
                    const Kasi = await PerangkatDesaModel.findOne({ rolePD: rolePd.role });

                    if (Kasi) {
                        surat.statusAcara = `pengajuan perangkat desa kasi ${getKasiType(rolePd.role)}`;
                        
                        Kasi.suratAcaraPending.push(surat._id);
                        // menghapus surat dari suratAcaraComing
                        const indexDataKasi = Kasi.suratAcaraComing.indexOf(surat._id);
                        Kasi.suratAcaraComing.splice(indexDataKasi, 1);
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



//Perangkat Desa
exports.persetujuanSuratAcaraPerangkatDesa_TAVERSION = async (req,res) => {
    const { suratAcaraId, perangkatDesaId } = req.params;
    const { statusPersetujuanReq } = req.body;
    try{
        const dataPD = await PerangkatDesaModel.findById(perangkatDesaId);
        const surat = await suratAcaraModel.findById(suratAcaraId);
        

        if (!dataPD || !surat) {
            return res.status(404).send({
                message: "perangkat desa or surat acara not found with id " + id
            });
        }

        if (surat.statusPersetujuan === 'belum ada persetujuan' || surat.statusPersetujuan === 'ditolak rw') {
            return res.status(404).send({
                message: "belum ada persetujuan dari rw " + id
            });
        }

        if (surat.statusPersetujuan === 'disetujui rw' && statusPersetujuanReq === true) {
            surat.statusPersetujuan = 'disetujui perangkat desa';
            surat.statusAcara = 'pengajuan kades dan wakades';

            dataPD.suratAcaraApproved.push(suratAcaraId);
            const indexData = dataPD.suratAcaraPending.indexOf(suratAcaraId);
            dataPD.suratAcaraPending.splice(indexData, 1);
            await dataPD.save();
            
            const DataPimpinanDesa = await PimpinanDesa.findOne({rolePemimpinDesa:1});
            if(!DataPimpinanDesa){
                return res.status(404).send({message: "kepala desa not found"});
            } 
            DataPimpinanDesa.suratAcaraPending.push(suratAcaraId);
            const indexDataPimpinanDesa = DataPimpinanDesa.suratAcaraComing.indexOf(suratAcaraId);
            DataPimpinanDesa.suratAcaraComing.splice(indexDataPimpinanDesa, 1);
            await DataPimpinanDesa.save();
            surat.perangkatDesaId = dataPD._id
            await surat.save();
            return res.send({message: "test",result: surat});
        }
        else{
            surat.statusPersetujuan = 'ditolak perangkat desa';
            await surat.save();
            return res.send({message: "test",result: surat});
        }
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while pelayanan konter by id."
        });
    }
};

//Kepala Desa

exports.persetujuanSuratAcaraKades_TAVERSION = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {kadesId, suratAcaraId} = req.params;
        const { statusPersetujuanReq } = req.body;
        const dataKades = await PimpinanDesa.findById([kadesId]).session(session);
        if (!dataKades){
            await session.abortTransaction();
            return res.status(404).send({
                message: "Data kades not found"
            });
        }
        const dataSuratAcara = await PimpinanDesa.findById([suratAcaraId]).session(session);
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

        if (statusPersetujuanReq === true && dataSuratAcara.statusAcara === "pengajuan kades dan wakades" && dataSuratAcara.statusPersetujuan === "disetujui perangkat desa"){
            dataSuratAcara.statusPersetujuan = "disetujui pimpinan desa";
            dataSuratAcara.statusAcara = "pengajuan selesai";
            dataKades.suratAcaraApproved.push(dataSuratAcara._id);
            const indexData = dataKades.suratAcaraPending.indexOf(dataSuratAcara._id);
            dataKades.suratAcaraPending.splice(indexData, 1);
            await dataKades.save();
            await dataSuratAcara.save();
            await session.commitTransaction();
            return res.status(200).send({
                message: "Success submit surat kades",
                data: dataSuratAcara
            });
        }

        res.send({
            message: "test",
            data: dataKades,
            data2: dataSuratAcara
        });


    }catch(error){
        await session.abortTransaction();
        res.status(500).send({
            message: error.message || "Some error occurred while submit surat kades."
        });
    }finally{
        session.endSession();
    }
};








module.exports = exports;
