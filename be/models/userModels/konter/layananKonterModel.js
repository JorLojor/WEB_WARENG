const mongoose = require('mongoose');

const layananSchema = new mongoose.Schema({
    suratAcaraId: { type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara', required: true },
    wargaId: { type: mongoose.Schema.Types.ObjectId, ref: 'warga', required: true },
    konterId: { type: mongoose.Schema.Types.ObjectId, ref: 'konter', required: true },
    status: { type: String, required: false, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('layanan', layananSchema);
