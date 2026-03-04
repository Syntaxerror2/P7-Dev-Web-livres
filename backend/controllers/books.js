//Controller, logique métier propre à l'application
const Book = require('../models/Book');
const sharp = require('sharp');
const path = require('path');
//signifie « file system »
//Il donne accès aux fonctions qui permettent de modifier le système de fichiers
const fs = require('fs');
exports.createBook = async (req, res, next) => {
console.log(req.file);
console.log(req.body);
//On utilise l’opérateur ternaire pour récupérer les données du livre envoyées dans la requête.
//Si on obtient les données on les parse, autrement on utilise directement le body
const bookObject = req.body.book ? JSON.parse(req.body.book) : req.body;
if (typeof bookObject.ratings === 'string') {
  try {
    bookObject.ratings = JSON.parse(bookObject.ratings);
  } catch {
    bookObject.ratings = null;
  }
}
//ID générée automatiquement par bdd donc delete
delete bookObject._id; 
//On utilise le userId venant du token d'auth
//Ainsi, personne ne peut utiliser le userId de quelqu'un d'autre
delete bookObject._userId; 

if (!Array.isArray(bookObject.ratings) || bookObject.ratings.length === 0) {
  return res.status(400).json({
    message: "Vous devez obligatoirement attribuer une note au livre."
  });
}

const rating = Number(bookObject.ratings[0].grade);

//On vérifie que la note est comprise entre 0 et 5
if (rating < 0 || rating > 5) {
  return res.status(400).json({
    message: "La note doit être comprise entre 0 et 5."
  });
}

//On sécurise le userId dans ratings
bookObject.ratings = [{
  userId: req.auth.userId,
  grade: rating
}];

//On calcule la moyenne à la création
bookObject.averageRating = rating;

 try {

//Nouveau nom du fichier avec extension webp
const filename = Date.now() + '.webp';
const imagePath = path.join('images', filename);

//Traitement de l'image avec Sharp
await sharp(req.file.buffer)
  .resize(500)
  .webp({ quality: 80 })
  .toFile(imagePath);

//On génère nous-même l'URL via le nom de fichier donné par Sharp
const book = new Book({
  ...bookObject,
  userId: req.auth.userId,
  imageUrl: `${req.protocol}://${req.get('host')}/images/${filename}`,
  ratings: bookObject.ratings,
  averageRating: bookObject.averageRating || 0
}); 

await book.save();
res.status(201).json({message: 'Objet enregistré'});
} catch(error) {
  res.status(400).json({error});
}
};

//PUT modifiant un objet existant //Méthode updateOne
exports.modifyBook = (req, res, next) => {
//Si l'utilisateur transmet un fichier, il est obtenu sous la forme d'un string
//MAIS ce n'est pas le cas s'il n'en transmet pas : il faut donc gérer les 2 cas
 const bookObject = req.file ? {
  ...JSON.parse(req.body.book),
//S'il n'y a pas d'objet transmis, on la récupère dans le corps de la requète
  imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
 } : {...req.body};
//On supprime le userId pour éviter que quelqu'un crée un objet
//Puis le modifie pour le réassigner à son nom
delete bookObject._userId;
Book.findOne({_id: req.params.id})
.then((book) => {
//Si le champ userId récupéré en base est différent de l'userId du token
//C'est que quelqu'un essaie de modifie un objet qui ne lui appartient pas
//On renvoie donc une erreur 403
  if(book.userId !== req.auth.userId ) {
  return  res.status(403).json({message: "Non-autorisé"})
  } else {
//Filtre indiquant quel est l'enregistrement à mettre à jour
//Et avec quel objet : celui récupéré dans le corps de la fonction
//Avec l'id venant des paramètres de l'URL
    Book.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id} )
    .then(() => res.status(200).json({message: 'Objet autorisé'}))
    .catch(error => res.status(401).json({error}))
  }
})
.catch((error) => {
  res.status(400).json({error});
})
};

//On récupère un seul livre à partir de son id (req.params.id)
//Utilise Book.findOne()
//Retourne 200 avec le livre ou 404 s’il n’existe pas
exports.findOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

//On récupère un seul livre à partir de son id (req.params.id)
//Utilise Book.findOne()
//On Retourne 200 avec le livre ou 404 s’il n’existe pas
exports.findBook = (req, res, next) => {
 Book.find()
 .then(books => res.status(200).json(books))
 .catch(error => res.status(400).json({error}));
};

exports.deleteBook =(req, res, next) => {
//On récupère l'objet en bdd
Book.findOne({_id: req.params.id})
.then(book => {
if(book.userId !== req.auth.userId) {
  return res.status(403).json({message: 'Non-autorisé'})
} else {
//On récupère le nom de fichier via un split du repertoire images
  const fileName = book.imageUrl.split('/images/')[1];
//Méthode unlink de fs
fs.unlink(`images/${fileName}`, () => {
Book.deleteOne({_id: req.params.id})
.then(() => {res.status(200).json({message: 'objet supprimé'})})
.catch(error => res.status(403).json({error}));
})
}
})
.catch(error => {
  res.status(500).json({error});
})
};

//POST de notation des livres
exports.rateBook = (req, res, next) => {
  const userId = req.auth.userId;
  const rating = Number(req.body.rating);
if(rating < 0 || rating > 5) {
  return res.status(400).json({
    message : "Votre note doit être comprise en 0 et 5"
  });
}
  Book.findOne({_id: req.params.id})
  .then(book => {
//On vérifie si l'utilisateur a déjà noté
  const alreadyRated = book.ratings.find(
    rating => rating.userId === userId
  );
  if(alreadyRated) {
    return res.status(400).json({
      message: "Vous avez déjà noté ce livre"
    });
  }
//On ajoute la note
  book.ratings.push({userId, grade: rating});
//On recalcule la moyenne en incrémentant la nouvelle note
const total = book.ratings.reduce(
  (sum, rating) => sum + rating.grade, 0
);
//On divise le total par le nombre de notes uniques, en gardant une note à décimale
book.averageRating = Math.round((total / book.ratings.length) * 10) / 10;
return book.save();
  })
.then(updateBook => res.status(200).json(updateBook))
.catch(error => res.status(400).json({error}));
}

//GET on récupère les 3 livres les mieux évalués
exports.bestRating = (req, res, next) => {
Book.find()
//tri décroissant
.sort({averageRating: -1}) 
//seulement les 3 premiers
.limit(3) 
.then((books => res.status(200).json(books)))
.catch((error) => res.status(400).json({error}))
}
