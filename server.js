const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const clientRoutes = require("./routes/ClientRoutes");
const glaceRoutes = require("./routes/GlaceRoutes");
const preparateurRoutes = require("./routes/PreparateurRoutes");
const commandeRoutes = require("./routes/CommandeRoutes");
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connecté à MongoDB"))
    .catch(err => console.error("Erreur de connexion à MongoDB:", err));

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/glaces", glaceRoutes);
app.use("/preparateurs", preparateurRoutes);
app.use("/commandes", commandeRoutes);

app.listen(process.env.PORT, () => console.log(`Serveur démarré sur http://${process.env.IP_ADDRESS}:${process.env.PORT}`));
