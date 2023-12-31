const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: { type: String, required: true },
    nik: { type:Number, required: true, default: '',unique: true},
    password: { type:String, required: true, default: ''},
    alamat: { type:String, required: true, default: ''},
    nohp: { type:String, required: true, default: ''},
    statusPerkawinan: { type:String, required: true, default: ''}, // sudah menikah atau belum ,janda ,duda, meninggal
    tempatlahir: { type:String, required: false, default: ''},
    tanggallahir: { type:String, required: false, default: ''},
    jenisKelamin: { type:String, required: false, default: ''}, // laki-laki atau perempuan
    agama: { type:String, required: false, default: ''},
    pekerjaan: { type:String, required: false, default: ''},
    kewarganegaraan: { type:String, required: false, default: 'WNI'},
    berlakuHingga: { type:String, required: false, default: 'SEUMUR HIDUP'},
    // domisili array of string[rt,rw,desa,kecamatan,kabupaten,provinsi]
    domisili: [{ type: String, required: true, default: '' }],
    role : { type: Number, required: true }, // 1 = warga, 2 = rt , 3 = rw, 4 = perangkat desa, 5 = pimpinan desa
},{timestamps: true});

module.exports = mongoose.model('user', user);
