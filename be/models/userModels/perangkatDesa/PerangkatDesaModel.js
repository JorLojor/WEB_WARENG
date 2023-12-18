const mongoose = require('mongoose');

const perangkatDesaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nik: { type: Number, required: true, unique: true },
    password: { type: String, required: true, default: '' },
    alamat: { type: String, required: true, default: '' },
    nohp: { type: String, required: true, default: '' },
    status: { type: String, required: true, default: '' },

    suratAcaraPending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraApproved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraRejected: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }]

}, { timestamps: true });

const PerangkatDesaModel = mongoose.model('PerangkatDesa', perangkatDesaSchema);

module.exports = PerangkatDesaModel;
