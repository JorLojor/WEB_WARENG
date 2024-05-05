const db = require('../../models');
const userModel = db.user;
const jwt = require('jsonwebtoken');

exports.wargaValidation = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const secretKey = process.env.LOGIN_TOKEN;

    try {
    
        if (!authHeader) {
            return res.status(403).send({
                message: "Forbidden. kamu tidak diizinkan mengakses ini. 1"
            });
        }

        const tokenArray = authHeader.split('Bearer ');

        if (tokenArray.length !== 2) {
            return res.status(403).send({
                message: "Forbidden. kamu tidak diizinkan mengakses ini. 2"
            });
        }

        const token = tokenArray[1];
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    message: "Forbidden. kamu tidak diizinkan mengakses ini. Terjadi kesalahan saat memverifikasi token."
                });
            }

            const user = await userModel.findById(decoded.id);
            if (!user) {
                return res.status(403).send({
                    message: "Forbidden. kamu tidak diizinkan mengakses ini. 4"
                });
            }

            req.user = user;
            next();
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || "Some error occurred while validating user."
        });
    }
};

module.exports = exports;
