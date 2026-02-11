const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');

const Book = require('../backend/models/Book');



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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/books', (req, res, next) => {
//Pour le moment, l'ID renvoyée est générée automatiquement, donc on la delete
delete req.body._id
const book = new Book({
//spread operator pour reprendre l'ensemble de l'objet
  ...req.body
});
//Méthode save nous permet d'enregistrer dans la base
book.save()
.then(res => res.status(201).json({message: 'Objet enregistré'}))
.catch(error => res.status(400).json({error}));
});

app.get('/api/books', (req, res, next) => {
  const stuff = [
    {
      genre: 'essai',
      title: 'La Société du Spectacle',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      author: 'Guy Debord',
      year: 1959,
      userId: 'qsomihvqios',
      ratings: [
        {
          userId: 'qsomihvqios',
          grade: 5
        }
      ],
      averageRating: 5
    },
    {
      genre: 'essai',
      title: 'La Société du Spectacle',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      author: 'Guy Debord',
      year: 1959,
      userId: 'thytht',
      ratings: [
        {
          userId: 'thytht',
          grade: 5
        }
      ],
      averageRating: 5
    }
  ];
  res.status(200).json(stuff);
});



module.exports = app;