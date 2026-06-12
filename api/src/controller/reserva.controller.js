const service = require('../services/reserva.service')

const listarPorQuarto = async (req, res) => {
    const reservas = await service.listarPorQuarto(req.params.quartoId)
    res.json(reservas)
}

const cadastrar = async (req, res) => {
    const reserva = await service.cadastrar(req.body)
    res.status(201).json(reserva)
}

const excluir = async (req, res) => {
    const reserva = await service.excluir(req.params.id)
    res.json(reserva)
}

module.exports = {
    listarPorQuarto,
    cadastrar,
    excluir
}