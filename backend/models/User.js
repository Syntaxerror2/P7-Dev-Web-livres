const mongoose = require('mongoose');

//Garanti la sécurité de l'application
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema);