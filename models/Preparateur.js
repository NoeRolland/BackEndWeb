const mongoose = require("mongoose");

const PreparateurSchema = new mongoose.Schema({ 
    nom: String,
    prenom: String
});

module.exports = mongoose.model("Preparateur", PreparateurSchema);
