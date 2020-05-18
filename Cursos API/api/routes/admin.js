const express = require('express')
const router = express.Router()
const routerCategoria = require('./categoria')
const routerCurso = require('./curso')


//Rota de Categoria
router.use(routerCategoria);

//Rota de Curso
router.use(routerCurso);

module.exports = router