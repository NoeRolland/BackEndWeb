const mongoose = require('mongoose');

const GlaceSchema = new mongoose.Schema({
    gout: { type: String, enum: ["Fraise", "Vanille", "Chocolat", "Citron"], required: true },
    taille: { type: String, enum: ["Petit", "Moyen", "Grand"], required: true }
});

module.exports = mongoose.model('Glace', GlaceSchema);
