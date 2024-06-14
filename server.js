const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

// Connecter à MongoDB
mongoose.connect('mongodb+srv://khadymbackediop1:diop%402000@cluster1psgbd.jat7mas.mongodb.net/dblp');

// Définir le schéma et le modèle de l'auteur
const authorSchema = new mongoose.Schema({
    name: String
});
const Author = mongoose.model('Author', authorSchema);

// Configurer le dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Liste des auteurs sénégalais
const senegaleseAuthors = [
    "Ousmane Sembène",
    "Mariama Ba",
    "Seydou Bodian",
    "Aminata Sow Fall",
    "Leopold Sédar Senghor",
    "Cheikh Hamidou Kane",
    "Abdoulaye Sadji",
    "Fatou Diome",
    "Birago Diop"
];

// Route principale pour afficher les auteurs
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route pour récupérer les auteurs en JSON
app.get('/authors', async (req, res) => {
    try {
        const authors = await Author.find({ name: { $in: senegaleseAuthors } });
        res.json(authors);
    } catch (err) {
        console.error('Error retrieving authors from MongoDB:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
