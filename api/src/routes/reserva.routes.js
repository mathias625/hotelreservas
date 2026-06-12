const express = require('express')

const router = express.Router()

const controller = require('../controller/reserva.controller')

router.get('/reservas/:quartoId', controller.listarPorQuarto)

router.post('/reservas', controller.cadastrar)

router.delete('/reservas/:id', controller.excluir)

module.exports = router