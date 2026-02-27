//Framework Node pour créer une API REST
const express = require('express');
//Mongoose permet d'interagir avec MongoDB via des schémas
const mongoose = require('mongoose');
//Module Node pour gérer les chemins des fichiers
const path = require('path');

//On importe les routers
const booksRoute = require('./routes/books')
const userRoute = require('./routes/user')


//Travail effectué depuis une BDD en dur, faute d'autre possibilité
/* 
mongoose.connect('mongodb://127.0.0.1:27017/livres')
  .then(() => console.log('Connexion MongoDB locale réussie !'))
  .catch(err => console.error(err));
*/
//Je commente celle-ci et ajoute ci-dessous l'URL de la BDD exportée en ligne
mongoose.connect('mongodb+srv://syntaxerror:1234@cluster0.28mlqmf.mongodb.net/?appName=Cluster0')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error(err));

const app = express();

//Middleware permettant de parser le JSON des requêtes
app.use(express.json());

// Rend le dossier "images" accessible publiquement
// Permet d'accéder aux images via une URL
app.use('/images', express.static(path.join(__dirname, 'images')))

//Midleware CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Définition des routes principales
// Toutes les routes livres commenceront par /api/books
app.use('/api/books', booksRoute);

// Toutes les routes d’authentification commenceront par /api/auth
app.use('/api/auth', userRoute)

//Export de l'app pour être utlisée dans server.js
module.exports = app;