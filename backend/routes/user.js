const express = require('express');

//Fonction Router d'express
const router = express.Router();

const userCtrl = require('../controllers/user');
//Routes fixes
//Pas de params dynamiques
//Moins dimpact de l'ordre
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;