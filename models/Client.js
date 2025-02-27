const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    nom: String,
    prenom: String
});

module.exports = mongoose.model("Client", ClientSchema);
