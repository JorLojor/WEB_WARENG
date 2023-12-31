const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    name: { type: String, required: true },
    nik: { type:Number, required: true, default: '',unique: true},
    nohp: { type:Number, required: true, default: ''},
    userName : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    password: { type:String, required: true, default: ''},
},{timestamp: true});

module.exports = mongoose.model('admin', admin);
