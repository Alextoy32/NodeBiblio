var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema

var livreSchema = new Schema({
    numero: {type: Number, require: true},
    titre: {type: String, require: true},
    pages: {type: [String], createIndexes: true}
})

var LivreModel = mongoose.model("biblio", livreSchema)

module.exports = LivreModel