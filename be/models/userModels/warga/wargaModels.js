const mongoose = require('mongoose');

const warga = new mongoose.Schema({
    name: { type: String, required: true },
    nik: { type:Number, required: false, default: ''},
    alamat: { type:String, required: false, default: ''},
    nohp: { type:String, required: false, default: ''},
    status: { type:String, required: false, default: ''},
    suratAcara: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }]
},{timestamps: true});

module.exports = mongoose.model('warga', warga);
