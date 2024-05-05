const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());

// env
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
const api = require('./api/index');
app.use('/api/v1', api);

// connect to mongodb
mongoose.connect(process.env.DATABASE);


const db = mongoose.connection;
db.on('error', (err) => {
  console.error('Kesalahan koneksi MongoDB:', err);
});
db.once('open', () => {
  console.log('Terkoneksi ke Database ....',);
});

// use static file
app.use('/assets', express.static('assets'));

module.exports = app;
