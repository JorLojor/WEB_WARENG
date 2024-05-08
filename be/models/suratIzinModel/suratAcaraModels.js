const mongoose = require('mongoose');

const suratAcara = new mongoose.Schema({
    nameAcara: { type: String, required: true },
    jenisSurat : { type: String, required: true },
    isiAcara : { type:[String], required: true }, 
    statusAcara: { type:String, required: false, default: 'belum pengajuan'},
    tanggalMulai: { type: Date, required: true },  // kalo di postman formatnya 2021-08-01T00:00:00.000+00:00
    tanggalSelesai: { type: Date, required: true },
    tempatAcara: { type: String, required: true },
    statusPersetujuan: { type: String, required: false, default: 'belum ada persetujuan' }, //belum ada persetujuan, disetujui, ditolak, revisi
    rtId: { type: mongoose.Schema.Types.ObjectId, ref: 'rt', required: false },
    rwId: { type: mongoose.Schema.Types.ObjectId, ref: 'rw', required: false },
    pimpinanDesaId: { type: mongoose.Schema.Types.ObjectId, ref: 'pimpinanDesa', required: false },
    perangkatDesaId: { type: mongoose.Schema.Types.ObjectId, ref: 'perangkatDesa', required: false },
    wargaId: { type: mongoose.Schema.Types.ObjectId, ref: 'warga', required: false },
    keterangan: { type: [String], required: false},
    
},{timestamps: true});

module.exports = mongoose.model('suratAcara', suratAcara);


//note :
// statusAcara default = belum pengajuan (warga)
// -pengajuan (rt),
// -pengajuan (rw),
// -pengajuan (konter),  
// -pengajuan (perangkat desa kasi pelayanan),(perangkat desa kasi pemerintahan),(perangkat desa kasi kersa )
// -pengajuan (kades)


// jenisSurat
// kasi pelayanan = 1
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
