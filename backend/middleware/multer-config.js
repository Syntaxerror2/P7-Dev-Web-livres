//Package Multer, permet d'enregistrer des fichiers
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Fonction diskStorage de Multer pour enregistrer sur le disque
const storage = multer.diskStorage({
//Avec une destination, en 3 arguments (requète, fichier, callback)
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
//Et un filename, qui prenjd les 3 mêmes arguments
  filename: (req, file, callback) => {
//Nouveau nom du fichier
// On élimine les espaces de nom fichier/On remplace par underscore
    const name = file.originalname.split(' ').join('_');
//On récupère le mimetype (jpg, etc) pour générer l'extension du fihier
    const extension = MIME_TYPES[file.mimetype];
//TimeStamp permettant de rendre le fichier unique
    callback(null, name + Date.now() + '.' + extension);
  }
});

//On exporte multer avec la méthode single, pour indiquer que c'est un fichier unique
module.exports = multer({ storage: storage }).single('image');
