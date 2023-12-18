const express = require('express');

//import models
const konter = require('./userModels/perangkatDesa/PerangkatDesaModel');
const warga = require('./userModels/warga/wargaModels');
const suratAcara = require('./suratIzinModel/suratAcaraModels');
const PerangkatDesaModel = require('./userModels/perangkatDesa/PerangkatDesaModel')

const rt = require('./userModels/rt/rtModels')
const rw = require('./userModels/rw/rwModels')

//db object
const db = {
    rw,
    rt,
    warga,
    konter,
    suratAcara,
    PerangkatDesaModel,
}


module.exports = db;
