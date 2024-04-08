const mongoose = require('mongoose');

const konter = new mongoose.Schema({
    konterName: {type: String, required: true},
    pelayanan:[{ type: mongoose.Schema.Types.ObjectId ,ref: 'pelayanan',required: false}]
})

module.exports = mongoose.model('konter',konter)
