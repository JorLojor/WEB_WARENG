const moongose = require('mongoose');

const rw = new moongose.Schema({
    user : { type: moongose.Schema.Types.ObjectId, ref: 'user' },
    
    ketuaRw: { type: String, required: false, default: '' },
    suratAcara: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],

    suratAcaraComing: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraPending: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraApproved: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraRejected: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }]
},{timestamps: true});

module.exports = moongose.model('rw', rw);
