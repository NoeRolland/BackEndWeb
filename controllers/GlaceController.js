const Glace = require("../models/Glace");

exports.getAll = async (req, res) => res.send(await Glace.find());

exports.getById = async (req, res) => {
    try {
        const glace = await Glace.findById(req.params.id)

        if (!glace) {
            return res.status(404).json({ message: "Glace non trouvée" });
        }

        res.status(200).json(glace);
    } catch (err) {
        console.error("Erreur GET /glaces/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.post = async (req, res) => {
    try {
        const newGlace = new Glace(req.body);
        const savedGlace = await newGlace.save();
        res.status(201).json(savedGlace);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.put = async (req, res) => {
    try {
        const glace = await Glace.findById(req.params.id);

        if (!glace) {
            return res.status(404).json({ message: "Glace non trouvé" });
        }

        const updatedGlace = await Glace.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(201).json(updatedGlace);
    } catch (err) {
        console.error("Erreur PUT /glaces/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.drop = async (req, res) => {
    try {
        const glace = await Glace.findById(req.params.id);

        if (!glace) {
            return res.status(404).json({ message: "Glace non trouvé" });
        }

        await Glace.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Glace supprimée avec succès" });
    } catch (err) {
        console.error("Erreur DELETE /glaces/:id :", err);
        res.status(500).json({ error: err.message });
    }
};
