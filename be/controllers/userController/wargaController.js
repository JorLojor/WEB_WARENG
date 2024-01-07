const db = require('../../models/index');
const WargaModel = db.warga;
const userModel = db.user;
const suratAcaraModel = db.suratAcara;
const RtModel = db.rt;

const bcrypt = require('bcrypt');
const puppeteer = require('puppeteer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {generatePDF} = require('../../middleware/fileUpload');
const wargaModel = require('../../models/userModels/warga/wargaModel');


exports.LoginWarga = async (req,res) => {
    const {name,password} = req.body;
    try{
        const dataNama = name.toUpperCase();
        const dataUser = await userModel.findOne({name: dataNama}).select('-token');

        if (!dataUser) {
            return res.status(404).send({
                message: "User not found with name " + name
            });
        }

        const comparePassword = await bcrypt.compare(password, dataUser.password);

        if (!comparePassword) {
            return res.status(400).send({
                message: "incorrect password"
            });
        }

        const token = jwt.sign({id: dataUser._id}, process.env.LOGIN_TOKEN, {expiresIn: '1d'});
        dataUser.token = token;
        await dataUser.save();

        res.status(200).send({
            message: "Success login warga",
            data: dataUser
        });
    

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while login warga."
        });
    }
};

exports.RegisterWarga = async (req,res) => {
    try{
        const {username,password,nohp} = req.body;

        if (!username || !password || !nohp) {
            return res.status(400).send({
                message: "you must insert username, password, and nohp"
            });
        }

        const newUser = await userModel.create({
            name: username.toUpperCase(),
            password : await bcrypt.hash(password, 10), 
            nohp: nohp,
        });

        // buat warga

        const newWarga = await WargaModel.create({
            user: newUser._id
        });
        
        res.status(200).send({
            message: "Success register warga",
            user: newUser,
            warga: newWarga
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while register warga."
        });
    }
};


exports.postWarga = async (req,res) => {
    const { name,nik,password, alamat, nohp, statusPerkawinan ,domisili } = req.body;
    try{
        // UPPER CASE request body
        const warga = await WargaModel.create({
            name : name.toUpperCase(),
            nik,
            password,
            alamat: alamat.toUpperCase(),
            nohp,
            statusPerkawinan : statusPerkawinan.toUpperCase(),
            domisili : domisili.map((domisili) => domisili.toUpperCase())
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

exports.updateWargaById = async (req,res) => {
    try{
        const id = req.params.id;
        const {updatedData} = req.body;

        const updatedWarga = await userModel.findByIdAndUpdate(id, updatedData, {new: true});
        if (!updatedWarga) {
            return res.status(404).send({
                message: "warga not found with id " + id
            });
        }

        updatedWarga.save();

        res.status(200).send({
            message: "Success update warga",
            data: updatedWarga
        });
        
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while update warga."
        });
    }
}


exports.getAllWarga = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Menambahkan nilai default jika query parameter tidak ada
        const limitt = parseInt(req.query.limit) || 10; // Menambahkan nilai default jika query parameter tidak ada

        console.log(`Received GET request to /api/v1/warga/get with page: ${page}, limit: ${limitt}`);
        
        const warga = await WargaModel.find()
            .populate('user')
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

exports.getWargaById = async (req,res) => {
    const id = req.params.id;
    try{
        const warga = await WargaModel.findById(id).populate('user').populate('suratAcara');
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
        


exports.deleteWargaById = async (req,res) => {
    const id = req.params.id;
    try{
        // ambil id user dari warga
        const dataUser = await wargaModel.findById(id);
        const idUser = dataUser.user;
        // hapus user
        const user = await userModel.findByIdAndDelete(idUser);
        if (!user) {
            return res.status(404).send({
                message: "user not found with id " + idUser
            });
        }
        // hapus warga
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
        const { nameAcara,jenisSurat, isiAcara, tanggalMulai,tanggalSelesai, tempatAcara} = req.body;
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
            jenisSurat : jenisSurat.toLowerCase(),
            isiAcara,
            tanggalMulai,
            tanggalSelesai,
            tempatAcara,
            wargaId : warga._id
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

exports.createsuratPDF = async (req, res) => {
    try{
        const { nameAcara,jenisSurat, isiAcara, tanggalMulai,tanggalSelesai, tempatAcara} = req.body;

        const pdfhtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Surat Acara</title>
            <style>
                .container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .card {
                    width: 100%;
                    height: 100%;
                    border: 1px solid black;
                    padding: 20px;
                }
                .card-header {
                    text-align: center;
                }
                .card-body {
                    margin-top: 20px;
                }
                .card-body .row {
                    margin-bottom: 10px;
                }
                .card-body .row .col-3 {
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <div class="card-header">
                        <h3>Surat Acara</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-3">Nama Acara</div>
                            <div class="col-9">: ${nameAcara}</div>
                        </div>
                        <div class="row">
                            <div class="col-3">Jenis Surat</div>
                            <div class="col-9">: ${jenisSurat}</div>
                        </div>
                        <div class="row">
                            <div class="col-3">Isi Acara</div>
                            <div class="col-9">: ${isiAcara}</div>
                        </div>
                        <div class="row">
                            <div class="col-3">Tanggal Mulai</div>
                            <div class="col-9">: ${tanggalMulai}</div>
                        </div>
                        <div class="row">
                            <div class="col-3">Tanggal Selesai</div>
                            <div class="col-9">: ${tanggalSelesai}</div>
                        </div>
                        <div class="row">
                            <div class="col-3">Tempat Acara</div>
                            <div class="col-9">: ${tempatAcara}</div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        `
        const browser = await puppeteer.launch();
        const page = await browser.newPage(); 

        await page.setContent(pdfhtml);
        await page.emulateMediaType('screen'); // set media type sebagai screen agar background warna putih
        const pdfBuffer = await page.pdf({ format: 'A4' }); // generate pdf dengan format A4
        const pdfPath = `${__dirname}/../assets/document`; // folder tempat menyimpan file pdf
        const pdfName = `Surat-${nameAcara}.pdf`; // nama file pdf yang akan disimpan
        const pdfFullPath = `${pdfPath}/${pdfName}`;
        fs.writeFileSync(pdfFullPath, pdfBuffer); // simpan file pdf ke dalam folder assets/document

        await browser.close();

        res.status(200).send({
            message: "Success create surat acara",
            data: pdfName
        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while create surat acara."
        });
    }
}

exports.createSuratPdf = async (req, res) => {
    try {
       
        const {idSuratAcara} = req.params;
        const {idWarga} = req.params;

        const dataSurat = await suratAcaraModel.findById(idSuratAcara);

        if (!dataSurat) {
            return res.status(404).send({
                message: "Surat Acara not found with id " + idSuratAcara
            });
        }

        if (dataSurat.statusAcara === 'pengajuan') {
            return res.status(400).send({
                message: "Surat Acara harus disetujui terlebih dahulu."
            });
        }

        if(dataSurat.statusPersetujuan === 'disetujui pimpinan desa' && dataSurat.statusAcara === 'pengajuan selesai'){

            const data = {
                nameAcara: dataSurat.nameAcara,
                jenisSurat : dataSurat.jenisSurat,
                isiAcara : dataSurat.isiAcara,
                tanggalMulai : dataSurat.tanggalMulai,
                tanggalSelesai : dataSurat.tanggalSelesai,
                tempatAcara : dataSurat.tempatAcara
            };

            const SuratResultPdf = await generatePDF(data);
            res.status(200).send({
                message: "Success create surat acara",
                data: SuratResultPdf
            });
        }else{
            return res.status(400).send({
                message: "Surat Acara harus disetujui terlebih dahulu."
            });
        }
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
