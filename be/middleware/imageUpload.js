const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Upload'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});
3
const imageFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('Hanya diperbolehkan mengunggah file gambar PNG atau JPEG!'), false);
    }
};

const uploadProjectImages = multer({
    storage: storage,
    fileFilter: imageFilter,
}).array('img', 3);

module.exports = { uploadProjectImages };
