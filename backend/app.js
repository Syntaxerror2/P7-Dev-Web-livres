const express = require('express');
const mongoose = require('mongoose');


//On importe le router
const booksRoute = require('./routes/books')

const userRoute = require('./routes/user')



/*
mongoose.connect('mongodb+srv://syntaxicodeux:mongolie@cluster1.5iezpx7.mongodb.net/?appName=Cluster1')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error(err));
*/

//Connecté en dur en attendant mieux
mongoose.connect('mongodb://127.0.0.1:27017/livres')
  .then(() => console.log('Connexion MongoDB locale réussie !'))
  .catch(err => console.error(err));

const app = express();


app.use(express.json());

app.use('/images', express.static('images'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});




app.use('/api/books', booksRoute);
app.use('/api/auth', userRoute)

module.exports = app;