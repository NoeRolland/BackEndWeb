const Preparateur = require("../models/Preparateur");

exports.getAll = async (req, res) => res.send(await Preparateur.find());

exports.getById = async (req, res) => {
    try {
        const preparateur = await Preparateur.findById(req.params.id)

        if (!preparateur) {
            return res.status(404).json({ message: "Preparateur non trouvée" });
        }

        res.status(200).json(preparateur);
    } catch (err) {
        console.error("Erreur GET /preparateurs/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.post = async (req, res) => {
    try {
        const newPreparateur = new Preparateur(req.body);
        const savedPreparateur = await newPreparateur.save();
        res.status(201).json(savedPreparateur);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.put = async (req, res) => {
    try {
        const preparateur = await Preparateur.findById(req.params.id);

        if (!preparateur) {
            return res.status(404).json({ message: "Preparateur non trouvé" });
        }

        const updatedPreparateur = await Preparateur.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(201).json(updatedPreparateur);
    } catch (err) {
        console.error("Erreur PUT /preparateurs/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.drop = async (req, res) => {
    try {
        const preparateur = await Preparateur.findById(req.params.id);

        if (!preparateur) {
            return res.status(404).json({ message: "Preparateur non trouvé" });
        }

        await Preparateur.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Préparateur supprimé avec succès" });
    } catch (err) {
        console.error("Erreur DELETE /preparateurs/:id :", err);
        res.status(500).json({ error: err.message });
    }
};
