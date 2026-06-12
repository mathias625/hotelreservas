const prisma = require('../data/prisma')

const listar = async () => {
    return await prisma.quarto.findMany()
}

const cadastrar = async (dados) => {
    return await prisma.quarto.create({
        data: {
            numero: dados.numero,
            tipo: dados.tipo
        }
    })
}

const excluir = async (id) => {
    await prisma.reserva.deleteMany({
        where: {
            quarto_id: Number(id)
        }
    })

    return await prisma.quarto.delete({
        where: {
            id: Number(id)
        }
    })
}

module.exports = {
    listar,
    cadastrar,
    excluir
}