const mongoose = require('mongoose');

const TacheSchema = new mongoose.Schema({
    Commande : { type: String, required: true },
    Specifications: { type: String },
    dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tache', TacheSchema);