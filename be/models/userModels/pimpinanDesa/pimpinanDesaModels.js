const mongoose = require('mongoose');

const kepalaDesa = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    suratAcara: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraPending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraApproved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraRejected: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
},{timestamp: true});

module.exports = mongoose.model('kepalaDesa', kepalaDesa);
