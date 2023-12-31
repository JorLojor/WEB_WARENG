const express = require('express');

//import models
const konter = require('./userModels/perangkatDesa/PerangkatDesaModel');
const warga = require('./userModels/warga/wargaModel');
const user = require('./userModels/warga/userModel');
const suratAcara = require('./suratIzinModel/suratAcaraModels');
const PerangkatDesaModel = require('./userModels/perangkatDesa/PerangkatDesaModel')
const rt = require('./userModels/rt/rtModels')
const rw = require('./userModels/rw/rwModels')
const pimpinanDesa = require('./userModels/pimpinanDesa/pimpinanDesaModels')

//db object
const db = {
    pimpinanDesa,
    rw,
    rt,
    warga,
    user,
    konter,
    suratAcara,
    PerangkatDesaModel,
}


module.exports = db;
