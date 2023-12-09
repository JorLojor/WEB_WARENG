

const wargaController = require('../../controllers/wargaController');
const express = require('express');
const router = express.Router();


router.post('/post/warga',wargaController.postWarga);


module.exports = router;
