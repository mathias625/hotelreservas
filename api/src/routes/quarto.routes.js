const express = require('express')

const router = express.Router()

const controller = require('../controller/quarto.controller')

router.get('/quartos', controller.listar)

router.post('/quartos', controller.cadastrar)

router.delete('/quartos/:id', controller.excluir)

module.exports = router