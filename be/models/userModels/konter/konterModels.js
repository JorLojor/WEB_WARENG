const mongoose = require('mongoose'); 

const konter = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false, default: ''},
    tags: { type:String, required: false, default: ''},
    layanan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'layanan' }]
},{timestamps: true,unique: true});

module.exports = mongoose.model('konter', konter);
