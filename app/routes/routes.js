var express = require('express');
var routeur = express.Router();

var livreController = require('../controllers/LivreController')

const auth = require('../middleware/auth');

routeur.get('/livres', auth, livreController.livres)
routeur.get('/livres/:id', auth, livreController.livresId)
routeur.get('/livres/:id/pages', auth, livreController.livresPages)
routeur.get('/livres/:id/pages/:idP', auth, livreController.livresPagesId)
routeur.post('/livres', auth, livreController.addLivre)
routeur.delete('/livres/:id', auth, livreController.deleteLivre)
routeur.put('/livres', auth, livreController.majLivre)
routeur.post('/auth', livreController.auth)

module.exports = routeur