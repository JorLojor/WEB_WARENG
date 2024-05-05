const mongoose = require('mongoose');

const warga = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // ini adalah field yang merujuk ke model "user"
    suratAcara: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
},{timestamps: true});

module.exports = mongoose.model('warga', warga);
