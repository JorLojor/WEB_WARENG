const mongoose = require('mongoose');

const perangkatDesaSchema = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

    rolePD : { type: Number, required: true },
    suratAcara: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],

    suratAcaraComing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraPending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraApproved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }],
    suratAcaraRejected: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suratAcara' }]

}, { timestamps: true });

const PerangkatDesaModel = mongoose.model('PerangkatDesa', perangkatDesaSchema);

module.exports = PerangkatDesaModel;


//note role:
// kasi pelayanan = 1
// yang bertugas sebagai 
// 1. Surat Keterangan Domisili
// 2. Surat Keterangan Usaha
// 3. Surat Kenal Lahir
// 4. Surat Pindah
// 5. Surat Pengantar SKCK
// 6. Surat Izin Keramaian
// 7. Surat Izin Bepergian
// 8. Dan Surat KeteranganLainnya


// kasi pemerintahan = 2
// yang bertugas sebagai
// 1. Pembuatan KK Baru
// 2. Pembuatan KTP Baru
// 3. Pembuatan KTP Lama
// 4. Pemecahan KK Lama
// 5. PBB-P2
// 6. Mutasi PBB
// 7. Pencatatan Kependudukan
// 8. Dan Surat Lainnya


// kasi kersa = 3
// yang bertugas sebagai
// 1. Surat Kematian
// 2. Surat Kelahiran
// 3. Santunan Kematian
// 4. Pengajuan JKN-KIS
// 5. Koordinator RTLH
// 6. Pendataan Masalah Sosial
// 7. Dan Bantuan Sosial
// Lainnya
