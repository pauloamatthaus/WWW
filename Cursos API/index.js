
const express = require('./node_modules/express');
bodyParser = require('./node_modules/body-parser');

const app = express();
let port = 8000
var cursos = []
app.use(bodyParser.json());


app.listen(port, function () {
    console.log("running on port 8000")
})


app.get('/cursos', (req, res) => {
    console.log("get all cursos")
    res.send(cursos)
})


app.post('/cursos', (req, res) => {
    console.log(req.body['titulo'])

    cursos.push(new Curso(req.body['id'], req.body['titulo'], req.body['imagem'], req.body['preco']))
    res.send("200")
})


app.delete('/cursos', (req, res) => {
    var posicao = 0

    for (var i = 0; i < cursos.length; i++) {
        if (cursos[i].id == req.body['id']) {
            posicao = i
            break
        }
    }

    cursos.splice(posicao)
    res.send("200")
})

app.put('/cursos', (req, res) => {
    var posicao = 0
    for (var i = 0; i < cursos.length; i++) {
        if (cursos[i].id == req.body['id']) {
            posicao = i
            break
        }
    }

    cursos[posicao].titulo = req.body['titulo']
    res.send(cursos[posicao])
})

function Curso(id, imagem, titulo, preco) {
    this.id = id
    this.imagem = imagem
    this.titulo = titulo
    this.preco = preco
}