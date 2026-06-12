const API = 'http://localhost:3000'

let acaoConfirmada = null

function abrirModal(titulo, texto, callback){

    document.getElementById('tituloModal').innerText = titulo

    document.getElementById('textoModal').innerText = texto

    document.getElementById('modalExcluir').style.display = 'flex'

    acaoConfirmada = callback
}

function fecharModal(){

    document.getElementById('modalExcluir').style.display = 'none'
}

window.onload = () => {

    document.getElementById('btnConfirmar').onclick = () => {

        if(acaoConfirmada){
            acaoConfirmada()
        }

        fecharModal()
    }

    carregarQuartos()
}

async function carregarQuartos() {

    const resposta = await fetch(`${API}/quartos`)
    const quartos = await resposta.json()

    const lista = document.getElementById('listaQuartos')

    lista.innerHTML = ''

    quartos.forEach(quarto => {

        lista.innerHTML += `
            <tr>

                <td>${quarto.numero}</td>

                <td>${quarto.tipo}</td>

                <td>

                    <button
                        class="btn-ver"
                        onclick="abrirReservas(${quarto.id}, '${quarto.numero}', '${quarto.tipo}')"
                    >
                        Ver Reservas
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirQuarto(${quarto.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>
        `
    })
}

async function cadastrarQuarto() {

    const numero = document.getElementById('numero').value
    const tipo = document.getElementById('tipo').value

    if (!numero || !tipo) return

    await fetch(`${API}/quartos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero,
            tipo
        })
    })

    document.getElementById('numero').value = ''
    document.getElementById('tipo').value = ''

    carregarQuartos()
}

async function excluirQuarto(id) {

    abrirModal(
        'Excluir Quarto',
        'Deseja realmente excluir este quarto?',
        async () => {

            await fetch(`${API}/quartos/${id}`, {
                method: 'DELETE'
            })

            carregarQuartos()

            document.getElementById('areaReservas').innerHTML =
                '<h2>Selecione um quarto para visualizar as reservas</h2>'
        }
    )
}

async function abrirReservas(id, numero, tipo) {

    const resposta = await fetch(`${API}/reservas/${id}`)

    const reservas = await resposta.json()

    const area = document.getElementById('areaReservas')

    area.innerHTML = `
        <h2>Reservas do Quarto ${numero}</h2>

        <p><strong>Tipo:</strong> ${tipo}</p>

        <br>

        <input type="text" id="hospede" placeholder="Nome do hóspede">

        <input type="date" id="entrada">

        <input type="date" id="saida">

        <button
            class="btn-principal"
            onclick="cadastrarReserva(${id}, '${numero}', '${tipo}')"
        >
            Cadastrar Reserva
        </button>

        <br><br>

        <table>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Hóspede</th>
                    <th>Entrada</th>
                    <th>Saída</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody id="listaReservas">

            </tbody>

        </table>
    `

    const lista = document.getElementById('listaReservas')

    reservas.forEach(reserva => {

        lista.innerHTML += `
            <tr>

                <td>${reserva.id}</td>

                <td>${reserva.hospede}</td>

                <td>${reserva.data_entrada.substring(0,10)}</td>

                <td>${reserva.data_saida.substring(0,10)}</td>

                <td>

                    <button
                        class="btn-excluir"
                        onclick="excluirReserva(${reserva.id}, ${id}, '${numero}', '${tipo}')"
                    >
                        Excluir
                    </button>

                </td>

            </tr>
        `
    })
}

async function cadastrarReserva(quartoId, numero, tipo) {

    const hospede = document.getElementById('hospede').value
    const data_entrada = document.getElementById('entrada').value
    const data_saida = document.getElementById('saida').value

    if (!hospede || !data_entrada || !data_saida) return

    await fetch(`${API}/reservas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            hospede,
            data_entrada,
            data_saida,
            quarto_id: quartoId
        })
    })

    abrirReservas(quartoId, numero, tipo)
}

async function excluirReserva(id, quartoId, numero, tipo) {

    abrirModal(
        'Excluir Reserva',
        'Deseja realmente excluir esta reserva?',
        async () => {

            await fetch(`${API}/reservas/${id}`, {
                method: 'DELETE'
            })

            abrirReservas(quartoId, numero, tipo)
        }
    )
}