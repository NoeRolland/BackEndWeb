const Client = require("../models/Client");

exports.getAll = async (req, res) => res.send(await Client.find());

exports.getById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)

        if (!client) {
            return res.status(404).json({ message: "Client non trouvée" });
        }

        res.status(200).json(client);
    } catch (err) {
        console.error("Erreur GET /clients/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.post = async (req, res) => {
    try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.put = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(201).json(updatedClient);
    } catch (err) {
        console.error("Erreur PUT /clients/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.drop = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Client supprimé avec succès" });
    } catch (err) {
        console.error("Erreur DELETE /clients/:id :", err);
        res.status(500).json({ error: err.message });
    }
};
