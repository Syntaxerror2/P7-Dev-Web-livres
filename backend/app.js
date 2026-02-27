const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//On importe leS routers
const booksRoute = require('./routes/books')
const userRoute = require('./routes/user')

/* 
IMPORTANT : POUR l'EVALUATEUR, URL VALIDE de la BDD en ligne
mongoose.connect('mongodb+srv://syntaxerror:1234@cluster0.28mlqmf.mongodb.net/?appName=Cluster0')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error(err));
*/

//BDD en dur faute d'autre possibilité
mongoose.connect('mongodb://127.0.0.1:27017/livres')
  .then(() => console.log('Connexion MongoDB locale réussie !'))
  .catch(err => console.error(err));

const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')))

//Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/books', booksRoute);
app.use('/api/auth', userRoute)

module.exports = app;