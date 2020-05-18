const express = require('express')
const mongoose = require('mongoose')
require('../models/Curso')
const Curso = mongoose.model('curso')
const Validator = require('../validators/validator')

exports.postCurso = (req, res)=>{ 

    let validator = new Validator();
    //validação do nome do curso
    validator.isRequired(req.body.nome,'O Nome do curso não pode ser vazio!')
    validator.hasMinLen(req.body.nome, 5, 'O nome do curso deve conter pelo menos 5 caracteres')
    
    //validação do slug do curso
    validator.isRequired(req.body.slug,'O slug do curso não pode ser vazio!')
    validator.hasMinLen(req.body.slug, 5, 'O slug deve conter pelo menos 5 caracteres')
    validator.hasMaxLen(req.body.nome, 15, 'O nome do curso deve conter no maximo 15 caracteres')
    //validação do slug do curso
    validator.isRequired(req.body.descricao,'A descrição do curso não pode ser vazio!')
    validator.hasMinLen(req.body.descricao, 5, 'A descrição deve conter pelo menos 20 caracteres')

    if(!validator.isValid()){
        res.statusCode = 400
        res.send(validator.errors()).end()
    }

    const novaCurso = {
        nome: req.body.nome,
        slug: req.body.slug,
        imagem: req.body.imagem,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        price: req.body.price
    }
    new Curso(novaCurso).save()
    .then(() =>{
        res.statusCode = 201
        res.send({message: 'Curso criado com sucesso!'});
    }).catch((err)=>{
        if(err){
            throw err;
        }
        res.statusCode = 417
        res.send({message: 'Erro interno!'})
    })
}

exports.getCurso = (req, res)=>{
    Curso.find().lean().populate("categoria").sort({data:"desc"}).then((cursos)=>{
        res.json(cursos)    
    }).catch((err)=>{
        res.statusCode = 417
        res.send({message: 'Erro interno!'});
    })    
}

exports.getCursoId = (req, res) =>{
    Curso.findOne({_id:req.params.id}).lean().then((curso)=>{
        res.json(curso)
    }).catch((err)=>{
        if(err){
            res.statusCode = 417
            res.send({message: 'Erro interno!'});
            throw err;
        }
    })
}

exports.deleteCurso = (req, res)=>{
    Curso.deleteOne({_id:req.params.id}).lean()
        .then((curso)=>{
            if(curso){
                res.statusCode = 200
                res.send({message: 'Curso atualizado com sucesso!'});
            }else{
                res.statusCode = 404
                res.send({message: 'Curso não encontrado!'})
            }
        }).catch((err)=>{
           if(err){
               res.statusCode = 417
               res.send({message: 'Erro interno!'});
               throw err;
           }
        })

}

exports.updateCurso = (req, res)=>{
    let validator = new Validator();
    //validação do nome do curso
    validator.isRequired(req.body.nome,'O Nome do curso não pode ser vazio!')
    validator.hasMinLen(req.body.nome, 5, 'O nome do curso deve conter pelo menos 5 caracteres')
    
    //validação do slug do curso
    validator.isRequired(req.body.slug,'O slug do curso não pode ser vazio!')
    validator.hasMinLen(req.body.slug, 5, 'O slug deve conter pelo menos 5 caracteres')
    validator.hasMaxLen(req.body.nome, 15, 'O nome do curso deve conter no maximo 15 caracteres')
    //validação do slug do curso
    validator.isRequired(req.body.descricao,'A descrição do curso não pode ser vazio!')
    validator.hasMinLen(req.body.descricao, 5, 'A descrição deve conter pelo menos 20 caracteres')

    if(!validator.isValid()){
        res.statusCode = 400
        res.send(validator.errors()).end()
    }
    Curso.findByIdAndUpdate(req.params.id,{
        $set: {
            nome: req.body.nome,
            slug: req.body.slug,
            descricao: req.body.descricao,
            imagem: req.body.imagem,
            categoria: req.body.categoria,
            price: req.body.price
        }
    }).then(()=>{
        res.statusCode = 201
        res.send({message: 'Curso atualizado com sucesso!'})
    }).catch((err)=>{
        res.statusCode = 400;
        res.send({message: 'Falha ao atualizar o curso: '+err})
    })
 
 }