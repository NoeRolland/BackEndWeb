// routes/glaces.js
const express = require('express');
const router = express.Router();
const Glace = require('../models/Glace');

// Liste des glaces
router.get('/', async (req, res) => {
    try {
        const glaces = await Glace.find();
        res.render('glaces', { glaces }); // ✅ Utilisation de glaces.ejs
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});


// Ajouter une glace
router.post('/ajout', async (req, res) => {
    try {
        const { gout, taille } = req.body;

        // Vérification des valeurs possibles
        const goutsDisponibles = ["Fraise", "Vanille", "Chocolat", "Citron"];
        const taillesDisponibles = ["Petit", "Moyen", "Grand"];

        if (!goutsDisponibles.includes(gout) || !taillesDisponibles.includes(taille)) {
            return res.status(400).send('Erreur : goût ou taille invalide.');
        }

        const nouvelleGlace = new Glace({ gout, taille });
        await nouvelleGlace.save();
        res.redirect('/glaces');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});


// Supprimer une glace
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Glace.findByIdAndDelete(req.params.id);
        res.redirect('/glaces');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;