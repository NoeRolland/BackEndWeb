const Commande = require("../models/Commande");

exports.getAll = async (req, res) => {
    try {
        const commandes = await Commande.find()
            .populate("clientId")
            .populate("glaceId")
            .populate("preparateurId");

        res.status(200).json(commandes);
    } catch (err) {
        console.error("Erreur GET /commandes :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id)
            .populate("clientId")
            .populate("glaceId")
            .populate("preparateurId");

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        res.status(200).json(commande);
    } catch (err) {
        console.error("Erreur GET /commandes/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.post = async (req, res) => {
    try {
        const nouvelleCommande = new Commande(req.body);
        const savedCommande = await nouvelleCommande.save();
        res.status(201).json(savedCommande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.put = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id)
            .populate("clientId")
            .populate("glaceId")
            .populate("preparateurId");

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        const updatedCommande = await Commande.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("clientId")
         .populate("glaceId")
         .populate("preparateurId");

        res.status(201).json(updatedCommande);
    } catch (err) {
        console.error("Erreur PUT /commandes/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.drop = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id);

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        await Commande.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Commande supprimée avec succès" });
    } catch (err) {
        console.error("Erreur DELETE /commandes/:id :", err);
        res.status(500).json({ error: err.message });
    }
};
