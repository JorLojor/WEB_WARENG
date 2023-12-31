const mongoose = require('mongoose');

const warga = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    suratAcara: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
   
},{timestamps: true});

module.exports = mongoose.model('warga', warga);


 // partisipasiAgenda: [{ type: mongoose.Schema.Types.ObjectId, ref: 'agenda' }], next feature
