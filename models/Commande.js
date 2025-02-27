const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    glace: { type: mongoose.Schema.Types.ObjectId, ref: 'Glace', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    preparateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Preparateur', required: true }
});

module.exports = mongoose.model('Commande', CommandeSchema);
