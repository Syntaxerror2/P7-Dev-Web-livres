const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');

//POST un nouvel objet
router.post('/', bookCtrl.createBook);

//PUT modifiant un objet existant //Méthode updateOne
router.put('/:id', bookCtrl.modifyBook);

//GET d'un seul Book //Méthode findOne
router.get('/:id', bookCtrl.findOneBook);
  
//GET des Book enregistrés //Méthode find
router.get('/', bookCtrl.findBook);


//DELETE un objet existant //Méthode deleteOne
router.delete('/:id', bookCtrl.deleteBook);

module.exports = router;