const mongoose = require('mongoose');
//Ajout du package permettant d'imposer une adresse mail unique
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//Méthode plugin permettant d'appliquer uniqueValidator
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);