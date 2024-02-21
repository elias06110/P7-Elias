const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')




const auth = require('../middleware/auth');
// permet d'authentifier les requetes

const booksCtrl = require('../controllers/books');

router.get('/bestrating',booksCtrl.bestRating)

router.post('/:id/rating', auth, booksCtrl.rating)

router.get('/', booksCtrl.getAllBooks);
//renvoie un tableau de tous les livres de la base de données

router.get('/:id', booksCtrl.getOneBook);
//Renvoie le livre avec l’_id fourni

router.post('/', auth, multer, booksCtrl.createBook);
/*Capture et enregistre l'image, analyse le livre
transformé en chaîne de caractères, et l'enregistre
dans la base de données en définissant
correctement son ImageUrl.
/*/


router.put('/:id', auth, multer, booksCtrl.updateBook);
//Met à jour le livre avec l'_id fourni

router.delete('/:id', auth, booksCtrl.deleteBook);
//Supprime le livre avec l'_id fourni ainsi que l’image associée

module.exports = router;