const db = require('../models');



exports.getDataKonter = async (req, res) => {
    try{
        // nyusull

    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while get all konter."
        });
    }
};

exports.getDataKonterById = async (req, res) => {
    try{
        // nyusull

    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while get konter by id."
        });
    }
};

exports.createKonter = async (req, res) => {
    try{
        // nyusull

    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while create konter."
        });
    }
};

exports.updateKonter = async (req, res) => {
    try{
        // nyusull

    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while update konter."
        });
    }
};

exports.deleteKonter = async (req, res) => {
    try{
        // nyusull

    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: error.message || "Some error occurred while delete konter."
        });
    }
};



module.exports = exports;   
