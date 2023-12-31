const jwt = require('jsonwebtoken');
require('dotenv').config();


// digunakan untuk semua role 1,2,3,4,5  (warag, rt, rw, pd, kedes/wakades)
exports.allRole = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const keys = process.env.secret_key;
    
    try{
        const token = authHeader.split(' ')[1];

        jwt.verify(token, keys, (err, user) => {
            if(err) return res.sendStatus(403);
            req.user = user;
            next();
        });

    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
};


// digunakan untuk role 2 (rt)
exports.rtRole = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const keys = process.env.secret_key;
    
    try{
        const token = authHeader.split(' ')[1];

        jwt.verify(token, keys, (err, user) => {
            if(err) return res.sendStatus(403);
            if(user.role !== 2) return res.sendStatus(403);
            req.user = user;
            next();
        });

    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
};

// digunakan untuk role 3 (rw)
exports.rwRole = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const keys = process.env.secret_key;
    
    try{
        const token = authHeader.split(' ')[1];

        jwt.verify(token, keys, (err, user) => {
            if(err) return res.sendStatus(403);
            if(user.role !== 3) return res.sendStatus(403);
            req.user = user;
            next();
        });

    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
};

// digunakan untuk role 4 (pd)
exports.pdRole = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const keys = process.env.secret_key;
    
    try{
        const token = authHeader.split(' ')[1];

        jwt.verify(token, keys, (err, user) => {
            if(err) return res.sendStatus(403);
            if(user.role !== 4) return res.sendStatus(403);
            req.user = user;
            next();
        });

    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
};

// digunakan untuk role 5 (kades/wakades)
exports.kadesRole = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const keys = process.env.secret_key;
    
    try{
        const token = authHeader.split(' ')[1];

        jwt.verify(token, keys, (err, user) => {
            if(err) return res.sendStatus(403);
            if(user.role !== 5) return res.sendStatus(403);
            req.user = user;
            next();
        });

    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
};

// digunakan untuk role 6 (admin)
exports.adminRole = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const keys = process.env.secret_key;
    
    try{
        const token = authHeader.split(' ')[1];

        jwt.verify(token, keys, (err, user) => {
            if(err) return res.sendStatus(403);
            if(user.role !== 6) return res.sendStatus(403);
            req.user = user;
            next();
        });

    }catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
};
