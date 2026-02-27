const mongoose = require('mongoose');

//Méthode schema, mise à disposition par mongoose
//permet de passer un objet
const bookSchema = mongoose.Schema({
    userId: {type : String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    imageUrl: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    ratings: {
  type: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true }
    }
  ],
  required: true,
  validate: [
    val => val.length > 0,
    'Un livre doit contenir au moins une note.'
  ]
},
  averageRating: {type: Number}
})


//Seconde méthode du package mongoose : mongoose.Model
//Permet d'exploiter les schémas
//Premier argument : nom du schéma ; Deuxième : la const associée
module.exports = mongoose.model('Book', bookSchema);