const service = require('../services/quarto.service')

const listar = async (req, res) => {
    const quartos = await service.listar()
    res.json(quartos)
}

const cadastrar = async (req, res) => {
    const quarto = await service.cadastrar(req.body)
    res.status(201).json(quarto)
}

const excluir = async (req, res) => {
    const quarto = await service.excluir(req.params.id)
    res.json(quarto)
}

module.exports = {
    listar,
    cadastrar,
    excluir
}