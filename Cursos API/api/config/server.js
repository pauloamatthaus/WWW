const mongoose = require('mongoose')
require ('dotenv').config()

const conexao = process.env.MONGO_CONNECTION

mongoose.Promise = global.Promise;
mongoose.connect(conexao, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    
}).then(() =>{
    console.log("Conectado ao mongo")  
}).catch((err)=> {
    console.log("Erro ao se conectar: "+err)
})

module.exports = mongoose