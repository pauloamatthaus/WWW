const express = require('express')
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
const Validator = require('../validators/validator')

exports.postCategoria = (req, res) => {
    let validator = new Validator();
    validator.isRequired(req.body.nome, 'O Nome deve ser preenchido!')
    validator.hasMinLen(req.body.nome, 5, 'O título deve ter no minimo 5 caracteres')
    validator.isRequired(req.body.slug, 'O slug deve ser preenchida')
    validator.hasMinLen(req.body.slug, 5, 'O slug deve ter no minimo 5 caracteres')

    if (!validator.isValid()) {
        res.statusCode = 400
        res.send(validator.errors()).end()
    }


    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save()
        .then(() => {
            res.statusCode = 201
            res.send({ message: 'Criada com sucesso!' });
        }).catch((err) => {
            if (err) {
                throw err;
            }
            res.statusCode = 417
            res.send({ message: 'Erro interno!' })
        })
}

exports.getCategria = (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.json(categorias)
    }).catch((err) => {
        res.statusCode = 417
        res.send({ message: 'Erro interno!' });
    })
}

exports.getCategoriaId = (req, res) => {
    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        res.json(categoria)
    }).catch((err) => {
        if (err) {
            res.statusCode = 417
            res.send({ message: 'Erro interno!' });
            throw err;
        }
    })

}

exports.deleteCategoria = (req, res) => {
    Categoria.deleteOne({ _id: req.params.id }).lean()
        .then((categoria) => {
            if (categoria) {
                res.statusCode = 200
                res.send({ message: 'Deletada com sucesso!' });
            } else {
                res.statusCode = 404
                res.send({ message: 'Não encontrada!' })
            }
        }).catch((err) => {
            if (err) {
                res.statusCode = 417
                res.send({ message: 'Erro interno!' });
                throw err;
            }
        })

}
exports.updateCategoria = (req, res) => {
    let validator = new Validator();
    validator.isRequired(req.body.nome, 'O Nome deve ser preenchido!')
    validator.hasMinLen(req.body.nome, 5, 'O título deve ter no minimo 5 caracteres')
    validator.isRequired(req.body.slug, 'O slug deve ser preenchida')
    validator.hasMinLen(req.body.slug, 5, 'O slug deve ter no minimo 5 caracteres')

    if (!validator.isValid()) {
        res.statusCode = 400
        res.send(validator.errors()).end()
    }
    Categoria.findByIdAndUpdate(req.params.id, {
        $set: {
            nome: req.body.nome,
            slug: req.body.slug
        }
    }).then(() => {
        res.statusCode = 201
        res.send({ message: 'Atualizada com sucesso!' })
    }).catch((err) => {
        res.statusCode = 400;
        res.send({ message: 'Erro ao atualizar a Categoria: ' + err })
    })

}