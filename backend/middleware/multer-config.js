//Package Multer, permet d'enregistrer des fichiers
//update avec l'implémentation de Sharp
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Fonction memoryStorage de Multer pour enregistrer en mémoire
//Sharp s'occupe ensuite de l'écriture sur le disque
const storage = multer.memoryStorage();

//On exporte multer avec la méthode single, pour indiquer que c'est un fichier unique
module.exports = multer({ storage: storage }).single('image');

