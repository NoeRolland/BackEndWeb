const mongoose = require('mongoose');

const PreparateurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true }
});

module.exports = mongoose.model('Preparateur', PreparateurSchema);