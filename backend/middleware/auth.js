//On importe json web token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
//On récupère le token afin de savoir la nature de l'erreur
//Pour cela, on split le token (on divise la chaîne de caractères en tableau)
//On récupère le token, 2e élément du tableau : [1]
    try {
    const token = req.headers.authorization.split(' ')[1];
//On décode le token obtenu, via la méthode verify de jwt
//1er argument : token récupéré. 2e argument : clé secrète
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
//On récupère la propriété userId du token
    const userId = decodedToken.userId;
    req.auth = {
        userId : userId

    };
    next();
//Si on ne parvient pas à décoder, on renvoie au client le fait qu'il est invalide
    } catch(error) {
        res.status(401).json(error);
    }
}