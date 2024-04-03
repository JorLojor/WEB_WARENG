const mongoose = require('mongoose');

const konter = new mongoose.Schema({
    konterName: {type: String, required: true},
    pelayanan:[{ type: mongoose.Schema.Types.ObjectId ,ref: 'pelayanan'}]
})

module.exports = mongoose.model('konter',konter)
