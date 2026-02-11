const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

//POST d'un nouveau Book //Méthode save 
router.post('/', (req, res, next) => {
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
router.get('/:id', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
});


//GET des Book enregistrés //Méthode find
router.get('/', (req, res, next) => {
 Book.find()
 .then(books => res.status(200).json(books))
 .catch(error => res.status(400).json({error}));
});

//PUT modifiant un objet existant //Méthode updateOne
router.put('/:id', (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//DELETE un objet existant //Méthode deleteOne
router.delete('/:id', (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;