const prisma = require('../data/prisma')

const listarPorQuarto = async (quartoId) => {
    return await prisma.reserva.findMany({
        where: {
            quarto_id: Number(quartoId)
        }
    })
}

const cadastrar = async (dados) => {
    return await prisma.reserva.create({
        data: {
            hospede: dados.hospede,
            data_entrada: new Date(dados.data_entrada),
            data_saida: new Date(dados.data_saida),
            quarto_id: Number(dados.quarto_id)
        }
    })
}

const excluir = async (id) => {
    return await prisma.reserva.delete({
        where: {
            id: Number(id)
        }
    })
}

module.exports = {
    listarPorQuarto,
    cadastrar,
    excluir
}