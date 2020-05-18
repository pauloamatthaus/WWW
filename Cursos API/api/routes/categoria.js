const express = require('express')
const routerCategoria = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
const CategoriaController = require('../controller/categoria-controller')

//Categoria EndPoints
//lista de Categoria
routerCategoria.get('/categoria',CategoriaController.getCategria)

//consulta categoria por id
routerCategoria.get('/categoria/:id',CategoriaController.getCategoriaId)

//cadastro de categoria
routerCategoria.post('/categoria',CategoriaController.postCategoria)

//delete a categoria
routerCategoria.delete('/categoria/:id', CategoriaController.deleteCategoria)

//edit a categoria
routerCategoria.put('/categoria/:id', CategoriaController.updateCategoria)

module.exports = routerCategoria

