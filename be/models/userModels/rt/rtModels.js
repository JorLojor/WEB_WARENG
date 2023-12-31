const moongose = require('mongoose');

const rt = new moongose.Schema({
    user : { type: moongose.Schema.Types.ObjectId, ref: 'user' },

    suratAcara: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraPending: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraApproved: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraRejected: [{ type: moongose.Schema.Types.ObjectId, ref: 'suratAcara' }]
},{timestamps: true});

module.exports = moongose.model('rt', rt);
