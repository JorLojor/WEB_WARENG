const mongoose = require('mongoose');

const konter = new mongoose.Schema({
    konterName: {type: String, required: true},
    suratAcaraId:[{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara', required: false }],
})

module.exports = mongoose.model('konter',konter);
