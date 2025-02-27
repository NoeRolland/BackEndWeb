const mongoose = require("mongoose");

const GlaceSchema = new mongoose.Schema({
    gout: { type: String, enum: ["chocolat", "vanille", "fraise"] },
    taille: { type: String, enum: ["petite", "moyenne", "grande"] },
});

module.exports = mongoose.model("Glace", GlaceSchema);
