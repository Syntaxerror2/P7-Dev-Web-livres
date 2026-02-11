const mongoose = require('mongoose');

//fonction schema, mise à disposition par mongoose
//permet de passer un objet
const bookSchema = mongoose.Schema({
    userId: {type : String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    imageUrl: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    ratings: [
        {
            userId : {type: String, required: true},
            grade: {type: Number, required: true}
        }
    ],
    averageRating: {type: Number, required: true}
})

//Seconde méthode du package mongoose : mongoose.Model
//Permet d'exploiter les schémas
//Premier argument : nom du schéma ; Deuxième : la const associée
module.exports = mongoose.model('Book', bookSchema);