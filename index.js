let bodyParser = require("body-parser")


// utilisation du serveur web Express
var express = require('express');
var app = express();
app.use(bodyParser.json())
// utilisation de MongoDB et connection à la BD
//  la connection ne peut se faire qu'une fois dans l'application
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Livres",{ useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection
db.on('error', console.error.bind(console, 'erreur connexion :'));
db.once('open', function () {
    console.log('Connecté')
});
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: '*'}));
// utilisation du router pour la gestion de sportifs
var router = require("./app/routes/routes");
app.use(router);

// lancement du serveur qui se met à l'écoute
var port = 5000
app.listen(port);