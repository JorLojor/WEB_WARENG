const moongose = require('mongoose');

const rt = new moongose.Schema({
    name: { type: String, required: true },
    nik: { type:Number, required: false, default: '', unique: true},
    alamat: { type:String, required: false, default: ''},
    nohp: { type:String, required: false, default: ''},
    status: { type:String, required: false, default: ''},
    // domisili array of string[rt,rw,desa,kecamatan,kabupaten,provinsi]
    domisili: [{ type: String, required: false, default: '' }],
    suratAcara: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraPending: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraApproved: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraRejected: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }]
},{timestamps: true});

module.exports = moongose.model('rt', rt);
