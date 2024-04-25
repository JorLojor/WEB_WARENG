const moongose = require('mongoose');

const rt = new moongose.Schema({
    user : { type: moongose.Schema.Types.ObjectId, ref: 'user' },
    ketuaRt: { type: String, required: false, default: '' },  // nomor rt (rt1,rt2,rt3,rt4,rt5,rt6,rt7,rt8,rt9,rt10)
    suratAcara: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],

    
    suratAcaraComing: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraPending: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraApproved: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraRejected: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }]
},{timestamps: true});

module.exports = moongose.model('rt', rt);
