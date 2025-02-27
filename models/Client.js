const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true }
});

module.exports = mongoose.model('Client', ClientSchema);