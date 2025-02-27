// routes/icecreams.js
const express = require('express');
const router = express.Router();
const Icecream = require('../models/Icecream.js');

// Liste des commandes a faire
router.get('/', async (req, res) => {
    try {
        const commandes = await Icecream.find();
        res.render('index', { taches });
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Ajouter une commande
router.post('/ajout', async (req, res) => {
    try {
        const { titre, description } = req.body;
        const nouvelleTache = new Tache({ titre, description });
        await nouvelleTache.save();
        res.redirect('/taches');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Supprimer une tâche
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Tache.findByIdAndDelete(req.params.id);
        res.redirect('/taches');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;