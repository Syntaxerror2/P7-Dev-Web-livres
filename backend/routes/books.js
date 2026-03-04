const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');
//Auth est à placer avant les gestions de route pour être exécuté en 1er
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//On récupère le token, ensuite seulement on ajoute multer
//POST un nouvel objet
router.post('/', auth, multer, bookCtrl.createBook); 

//POST Afin de vérifier les images
router.post('/:id/rating', auth, bookCtrl.rateBook);

//Important de placer les routes spécifiques avant les routes dynamiques (comme id)

//PUT modifiant un objet existant, Méthode updateOne
router.put('/:id', auth, bookCtrl.modifyBook);

//GET des 3 livres les mieux notés
router.get('/bestrating', bookCtrl.bestRating)

//GET d'un seul Book //Méthode findOne
router.get('/:id', bookCtrl.findOneBook);

//Express teste /bestrating
//Si ça ne correspond pas, il teste /:id
// La route spécifique est prioritaire
  
//GET des Book enregistrés //Méthode find
router.get('/', bookCtrl.findBook);

//DELETE un objet existant //Méthode deleteOne
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;