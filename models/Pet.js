const mongoose = require('mongoose')

const Pet = mongoose.model('Pet', {
    id: Number,
    nome: String,
    dono: String,
    raca: String,
    idade: Number
})


module.exports = Pet