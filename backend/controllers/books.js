const Book = require('../models/Book');

/* Ancien createBook (avant Multer)
exports.createBook = 
//POST d'un nouveau Book //Méthode save 
(req, res, next) => {
//Pour le moment, l'ID renvoyée est générée automatiquement, donc on la delete
delete req.body._id
const book = new Book({
//spread operator pour reprendre l'ensemble de l'objet
  ...req.body
});
book.save()
.then(() => res.status(201).json({message: 'Objet enregistré'}))
.catch(error => res.status(400).json({error}));
}; */

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;

  const book = new Book({
    ...bookObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  book.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré' }))
    .catch(error => res.status(400).json({ error }));
};


//PUT modifiant un objet existant //Méthode updateOne
exports.modifyBook = 
(req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.findOneBook = 
  (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

exports.findBook = 
(req, res, next) => {
 Book.find()
 .then(books => res.status(200).json(books))
 .catch(error => res.status(400).json({error}));
};

exports.deleteBook =
(req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};