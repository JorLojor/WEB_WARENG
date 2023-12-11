const express = require('express');

//import models
const konter = require('./userModels/konter/konterModels');
const warga = require('./userModels/warga/wargaModels');
const suratAcara = require('./suratIzinModel/suratAcaraModels');
const layanan = require('./userModels/konter/layananKonterModel');
const rt = require('./userModels/rt/rtModels')

//db object
const db = {
    rt,
    warga,
    konter,
    suratAcara,
    layanan,
    
}


module.exports = db;
