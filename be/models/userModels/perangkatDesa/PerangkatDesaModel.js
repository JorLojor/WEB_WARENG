const mongoose = require('mongoose'); 

const perangkatDesa = new mongoose.Schema({
    name: { type: String, required: true },
    nik: { type:Number, required: true, default: '',unique: true},
    password: { type:String, required: true, default: ''},
    alamat: { type:String, required: true, default: ''},
    nohp: { type:String, required: true, default: ''},
    status: { type:String, required: true, default: ''},

    suratAcaraPending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraApproved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraRejected: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }]

},{timestamps: true,unique: true});

module.exports = mongoose.model('perangkatDesa', perangkatDesa);
