const mongoose = require('mongoose');

const warga = new mongoose.Schema({
    name: { type: String, required: true },
    nik: { type:Number, required: true, default: '',unique: true},
    password: { type:String, required: true, default: ''},
    alamat: { type:String, required: true, default: ''},
    nohp: { type:String, required: true, default: ''},
    status: { type:String, required: true, default: ''},
    // domisili array of string[rt,rw,desa,kecamatan,kabupaten,provinsi]
    domisili: [{ type: String, required: true, default: '' }],
    
    suratAcara: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }]
},{timestamps: true});

module.exports = mongoose.model('warga', warga);
