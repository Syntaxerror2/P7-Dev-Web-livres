const express = require('express');
const mongoose = require('mongoose');

const Book = require('./models/Book');
const { TopologyDescriptionChangedEvent } = require('mongodb');
//Ligne au dessus à supprimer ?



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


//POST d'un nouveau Book //Méthode save 
app.post('/api/books', (req, res, next) => {
//Pour le moment, l'ID renvoyée est générée automatiquement, donc on la delete
delete req.body._id
const book = new Book({
//spread operator pour reprendre l'ensemble de l'objet
  ...req.body
});
book.save()
.then(() => res.status(201).json({message: 'Objet enregistré'}))
.catch(error => res.status(400).json({error}));
});

//GET d'un seul Book //Méthode findOne
app.get('/api/books/:id', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
});


//GET des Book enregistrés //Méthode find
app.get('/api/books', (req, res, next) => {
 Book.find()
 .then(books => res.status(200).json(books))
 .catch(error => res.status(400).json({error}));
});

//PUT modifiant un objet existant //Méthode updateOne
app.put('/api/books/:id', (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//DELETE un objet existant //Méthode updateOne
app.delete('/api/stuff/:id', (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});



module.exports = app;