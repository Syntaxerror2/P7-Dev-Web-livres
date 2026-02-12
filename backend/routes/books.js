const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');
//Auth est à placer avant les gestions de route pour être exécuté en 1er
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//POST un nouvel objet
router.post('/', auth, multer, bookCtrl.createBook);
//On récupère le token, et ensuite seulement on ajoute multer
//Afin de vérifier les images

//PUT modifiant un objet existant //Méthode updateOne
router.put('/:id', auth, bookCtrl.modifyBook);

//GET d'un seul Book //Méthode findOne
router.get('/:id', bookCtrl.findOneBook);
  
//GET des Book enregistrés //Méthode find
router.get('/', bookCtrl.findBook);

//DELETE un objet existant //Méthode deleteOne
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;