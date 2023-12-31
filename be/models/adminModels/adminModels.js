const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    name: { type: String, required: true },
    nik: { type:Number, required: true, default: '',unique: true},
    password: { type:String, required: true, default: ''},
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
},{timestamp: true});

module.exports = mongoose.model('admin', admin);
