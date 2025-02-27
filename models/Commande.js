const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  glaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Glace",
    required: true
  },
  preparateurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Preparateur",
    required: true
  },
  statut: {
    type: String,
    required: true,
    default: "en cours"
  }
});

module.exports = mongoose.model("Commande", CommandeSchema);
