// routes/clients.js
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Liste des clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.render('clients', { clients });
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Ajouter un client
router.post('/ajout', async (req, res) => {
    try {
        const { nom, prenom } = req.body;
        const nouveauClient = new Client({ nom, prenom });
        await nouveauClient.save();
        res.redirect('/clients');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Supprimer un client
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.redirect('/clients');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;