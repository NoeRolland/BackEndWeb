// routes/commandes.js
const express = require('express');
const router = express.Router();
const Commande = require('../models/Commande');
const Glace = require('../models/Glace');
const Client = require('../models/Client');
const Preparateur = require('../models/Preparateur');

// Liste des commandes
router.get('/', async (req, res) => {
    try {
        const commandes = await Commande.find().populate('glace client preparateur');
        res.render('commandes', { commandes });
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Ajouter une commande
router.post('/ajout', async (req, res) => {
    try {
        const { glace, client, preparateur } = req.body;

        // Vérifier si les objets existent
        const glaceExist = await Glace.findById(glace);
        const clientExist = await Client.findById(client);
        const preparateurExist = await Preparateur.findById(preparateur);

        if (!glaceExist || !clientExist || !preparateurExist) {
            return res.status(400).send('Erreur : Glace, client ou préparateur introuvable.');
        }

        // Créer la commande
        const nouvelleCommande = new Commande({ glace, client, preparateur });
        await nouvelleCommande.save();

        res.redirect('/commandes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
});

// Supprimer une commande
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Commande.findByIdAndDelete(req.params.id);
        res.redirect('/commandes');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
