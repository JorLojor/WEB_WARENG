const mongoose = require('mongoose');

const kepalaDesa = new mongoose.Schema({
    name: { type: String, required: true },
    nik: { type:Number, required: false, default: '', unique: true},
    password: { type:String, required: true, default: ''},
    alamat: { type:String, required: false, default: ''},
    nohp: { type:String, required: false, default: ''},
    status: { type:String, required: false, default: ''},

    suratAcara: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraPending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraApproved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraRejected: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
},{timestamp: true});

module.exports = mongoose.model('kepalaDesa', kepalaDesa);
