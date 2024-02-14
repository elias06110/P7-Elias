const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
    //divise l'en tete pour selectionner le token
       const token = req.headers.authorization.split(' ')[1];
       //Déchiffre le token avec la clé
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};