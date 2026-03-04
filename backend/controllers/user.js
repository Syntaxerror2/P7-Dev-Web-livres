const bcrypt = require('bcrypt')
const User = require('../models/User')
//On importe le package permettant de vérifier des tokens
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {

// Regex simple pour vérifier le format de l'email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(req.body.email)) {
  return res.status(400).json({
    message: "Veuillez saisir une adresse email valide"
  });
}

//On passe à bcrypt le mdp du corps de la requète/le nombre de tour de l'algo 
//de hachage (cryptage)
  bcrypt.hash(req.body.password, 10)
//On récupère le mdp haché qu'on enregistre en base de donnée
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
//Erreur 500 > erreur serveur
    .catch(error => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if(user === null) {
    return res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
    } else {
//La méthode compare va comparer ce qui est entré et ce qui est stocké en bdd
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                res.status(401).json({message: 'Paire indentifiant/mot de passe incorrecte'})
            } else {
                res.status(200).json({
                    userId: user._id,
//On appelle la fonction sign() de jwt
//arguments : payload, clé d'encodage, délai avant expiration
                    token: jwt.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'}
                    )
                })
            }
        })
        .catch(error => {
            res.status(500).json({error})
        })
    }
  })
  .catch(error => res.status(500).json({error}))
};