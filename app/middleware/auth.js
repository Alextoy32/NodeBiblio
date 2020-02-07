const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    var token = req.body.token || req.query.token || req.headers.authorization;
    // est-ce qu'il y a un jeton ?
    if (token) {
        // vérification de la validité du jeton
        jwt.verify(token, 'maclesecrete', function (err, payload) {
            if (err) { // le jeton n'est pas correct, on stoppe le cycle des
                // middleware en renvoyant un code d'état
                return res.json({
                    satus: false,
                    message: 'token incorrect : ' + err.message
                });
            } else { // le token est correct
                req.payload = payload; // on stocke le payload du JTW dans
                // l'objet request pour qu'il puisse être utilisé par
                // les middlewares suivants
                next(); // on passe la main au prochain middleware
            }
        });
    } else { // il manque le token, on stoppe le cycle des middleware
        // en renvoyant un code d'état
        return res.status(403).send({
            status: false,
            message: 'token absent'
        });
    }
};