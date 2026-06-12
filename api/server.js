const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const quartoRoute = require('./src/routes/quarto.routes')
const reservaRoute = require('./src/routes/reserva.routes')

app.use(quartoRoute)
app.use(reservaRoute)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})