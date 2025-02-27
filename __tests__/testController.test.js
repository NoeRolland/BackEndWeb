const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const clientRoutes = require("../routes/ClientRoutes");
const glaceRoutes = require("../routes/GlaceRoutes");
const preparateurRoutes = require("../routes/PreparateurRoutes");
const commandeRoutes = require("../routes/CommandeRoutes");
const Client = require("../models/Client");
const Commande = require("../models/Commande");
const Glace = require("../models/Glace");
const Preparateur = require("../models/Preparateur");
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
app.use("/clients", clientRoutes);
app.use("/glaces", glaceRoutes);
app.use("/preparateurs", preparateurRoutes);
app.use("/commandes", commandeRoutes);

dotenv.config({ path: '.env.local' });

describe("API Tests", () => {
    let clientId, glaceId, preparateurId, commandeId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);

        // Création d'un client
        const client = await new Client({ nom: "Doe", prenom: "John" }).save();
        clientId = client._id;

        // Création d'une glace
        const glace = await new Glace({ gout: "vanille", taille: "moyenne" }).save();
        glaceId = glace._id;

        // Création d'un préparateur
        const preparateur = await new Preparateur({ nom: "Smith", prenom: "Anna" }).save();
        preparateurId = preparateur._id;

        // Création d'une commande
        const commande = await new Commande({ clientId: clientId, glaceId: glaceId, preparateurId: preparateurId, statut: "en cours" }).save();
        commandeId = commande._id;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Tests pour les clients
    test("GET /clients - should return all clients", async () => {
        const response = await request(app).get("/clients");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /clients/:id - should return a single client", async () => {
        const response = await request(app).get(`/clients/${clientId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id", clientId.toString());
    });

    test("POST /clients - should create a new client", async () => {
        const response = await request(app).post("/clients").send({ nom: "Dupont", prenom: "Alice" });
        expect(response.status).toBe(201);
        expect(response.body.nom).toBe("Dupont");
    });

    test("PUT /clients/:id - should update a client", async () => {
        const response = await request(app).put(`/clients/${clientId}`).send({ nom: "Test", prenom: "Test" });
        expect(response.status).toBe(201);
        expect(response.body.nom).toBe("Test");
    });

    test("DELETE /clients/:id - should delete a client", async () => {
        const response = await request(app).delete(`/clients/${clientId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Client supprimé avec succès");
    });

    // Tests pour les glaces
    test("GET /glaces - should return all glaces", async () => {
        const response = await request(app).get("/glaces");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /glaces/:id - should return a single glace", async () => {
        const response = await request(app).get(`/glaces/${glaceId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id", glaceId.toString());
    });

    test("POST /glaces - should create a new glace", async () => {
        const response = await request(app).post("/glaces").send({ gout: "chocolat", taille: "grande" });
        expect(response.status).toBe(201);
        expect(response.body.gout).toBe("chocolat");
    });

    test("PUT /glaces/:id - should update a glace", async () => {
        const response = await request(app).put(`/glaces/${glaceId}`).send({ gout: "chocolat", taille: "petite" });
        expect(response.status).toBe(201);
        expect(response.body.taille).toBe("petite");
    });

    test("DELETE /glaces/:id - should delete a glace", async () => {
        const response = await request(app).delete(`/glaces/${glaceId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Glace supprimée avec succès");
    });

    // Tests pour les préparateurs
    test("GET /preparateurs - should return all preparateurs", async () => {
        const response = await request(app).get("/preparateurs");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /preparateurs/:id - should return a single preparateur", async () => {
        const response = await request(app).get(`/preparateurs/${preparateurId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id", preparateurId.toString());
    });

    test("POST /preparateurs - should create a new preparateur", async () => {
        const response = await request(app).post("/preparateurs").send({ nom: "Martin", prenom: "Sophie" });
        expect(response.status).toBe(201);
        expect(response.body.nom).toBe("Martin");
    });

    test("PUT /preparateurs/:id - should update a preparateur", async () => {
        const response = await request(app).put(`/preparateurs/${preparateurId}`).send({ nom: "Martin", prenom: "Maria" });
        expect(response.status).toBe(201);
        expect(response.body.prenom).toBe("Maria");
    });

    test("DELETE /preparateurs/:id - should delete a preparateur", async () => {
        const response = await request(app).delete(`/preparateurs/${preparateurId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Préparateur supprimé avec succès");
    });

    // Tests pour les commandes
    test("GET /commandes - should return all commandes", async () => {
        const response = await request(app).get("/commandes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /commandes - should create a new commande", async () => {
        const newCommande = {
            clientId: clientId,
            glaceId: glaceId,
            preparateurId: preparateurId,
            statut: "en cours"
        };

        const response = await request(app).post("/commandes").send(newCommande);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        commandeId = response.body._id;
    });

    test("GET /commandes/:id - should return a single commande", async () => {
        const response = await request(app).get(`/commandes/${commandeId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id", commandeId.toString());
    });

    test("PUT /commandes/:id - should update a commande", async () => {
        const updatedCommande = {
            clientId: clientId,
            glaceId: glaceId,
            preparateurId: preparateurId,
            statut: "terminée"
        };

        const response = await request(app).put(`/commandes/${commandeId}`).send(updatedCommande);
        expect(response.status).toBe(201);
        expect(response.body.statut).toBe("terminée");
    });

    test("DELETE /commandes/:id - should delete a commande", async () => {
        const response = await request(app).delete(`/commandes/${commandeId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Commande supprimée avec succès");
    });
});
