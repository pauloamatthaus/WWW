const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Curso = new Schema({
    nome : {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }

})

mongoose.model("curso", Curso)