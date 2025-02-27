// routes/preparateurs.js
const express = require('express');
const router = express.Router();
const Preparateur = require('../models/Preparateur');

// Liste des préparateurs
router.get('/', async (req, res) => {
    try {
        const preparateurs = await Preparateur.find();
        res.render('preparateurs', { preparateurs });
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Ajouter un préparateur
router.post('/ajout', async (req, res) => {
    try {
        const { nom, prenom } = req.body;
        const nouveauPreparateur = new Preparateur({ nom, prenom });
        await nouveauPreparateur.save();
        res.redirect('/preparateurs');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Supprimer un préparateur
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Preparateur.findByIdAndDelete(req.params.id);
        res.redirect('/preparateurs');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
