const mongoose = require('mongoose');

const suratAcara = new mongoose.Schema({
    nameAcara: { type: String, required: true },
    isiAcara : { type:[String], required: true }, 
    statusAcara: { type:String, required: false, default: ''},
    tanggalAcara: { type: Date, required: true },
    tempatAcara: { type: String, required: true },
    statusPersetujuan: { type: String, required: false, default: 'belum ada persetujuan' },
    wargaId: { type: mongoose.Schema.Types.ObjectId, ref: 'warga', required: true },
},{timestamps: true});

module.exports = mongoose.model('suratAcara', suratAcara);
