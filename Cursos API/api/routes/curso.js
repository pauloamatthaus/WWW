const express = require('express')
const routerCurso = express.Router()
const mongoose = require('mongoose')
require('../models/Curso')
const Curso = mongoose.model('curso')
const CursoController = require('../controller/curso-controller')

//EndPoints
//Cadastro
routerCurso.post('/curso',CursoController.postCurso)


//lista de Curso
routerCurso.get('/curso',CursoController.getCurso)

//consulta curso por id
routerCurso.get('/curso/:id',CursoController.getCursoId)

//delete o curso
routerCurso.delete('/curso/:id', CursoController.deleteCurso)

//edit a curso
routerCurso.put('/curso/:id', CursoController.updateCurso)

module.exports = routerCurso
