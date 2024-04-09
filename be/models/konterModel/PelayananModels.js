const mongoose = require('mongoose');

const pelayanan = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    jenisPelayanan : { type: String, required: true },
    statusPelayanan : { type: String, required: false, default: 'belum pengajuan' }, //belum pengajuan, pengajuan, disetujui, ditolak
    suratAcara: { type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara', required: false },                                                          
},{timestamps: true});

module.exports = mongoose.model('pelayanan', pelayanan);
