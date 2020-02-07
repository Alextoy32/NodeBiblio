var LivreModel = require("../models/LivreModel")
var jwt = require("jsonwebtoken")


var LivreController = {
    livres: function (req, res) {
        LivreModel.find(function (err, livres) {
            if (err) {
                console.log(err);
                res.json({ status: false, message: err.message })
            } else if (livres.length == 0) {
                res.json({ status: false, message: "No book in base" })
            } else {
                res.json({ status: true, livres: livres })
            }
        })
    },
    livresId: function (req, res) {
        LivreModel.find({ numero: req.params.id }, function (err, livres) {
            if (err) {
                console.log(err);
                res.json({ status: false, message: err.message })
            } else if (livres.length == 0) {
                res.json({ status: false, message: "404 Livre not found" })
            } else {
                res.json({ status: true, result: livres })
            }
        })
    },
    livresPages: function (req, res) {
        LivreModel.find({ numero: req.params.id }, function (err, livres) {
            if (err) {
                console.log(err);
                res.json({ status: false, message: err.message })
            } else if (livres.length == 0 || livres[0].pages.length == 0) {
                res.json({ status: false, message: "404 not found" })
            }  else {
                res.json({ status: true, result: livres[0].pages })
            }
        })
    },
    livresPagesId: function (req, res) {
        LivreModel.find({ numero: req.params.id }, function (err, livres) {
            if (err) {
                console.log(err);
                res.json({ status: false, message: err.message })
            } else if (livres.length == 0 || livres[0].pages.length == 0 || livres[0].pages[req.params.idP] == null) {
                res.json({ status: false, message: "404 not found" })
            }  else {
                res.json({ status: true, result: livres[0].pages[req.params.idP] })
            }
        })
    },
    addLivre: function (req, res) {
        let add = new LivreModel(req.body)

        add.validate()
            .then(() => {
                console.log("valide")
                return add.save() // retour d’une promesse
            })
            .then(() => res.json("ajouté"))
            .catch((err) => res.json(err.message))
    },
    deleteLivre: function (req, res) {
        LivreModel.deleteOne({ numero: req.params.id })
            .then((status) => res.json(status.n + " livre supprimé"))
            .catch((error) => res.json(error.message))
    },
    majLivre: function (req, res) {
        LivreModel.updateOne({numero: req.body.numero}, req.body)
            .then((status) =>res.json(status.n + " livre modif"))
            .catch((error) => res.json(error.message))
    },
    auth: function (req, res) {
        var token = jwt.sign( { name: req.body.name }, 'maclesecrete', { expiresIn: '30m'});
        res.json(token)
    }

}


module.exports = LivreController