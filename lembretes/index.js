require('dotenv').config()
const express = require ('express')
const axios = require ('axios')
const app = express()
app.use(express.json())

//objeto que armazena os lembretes
const lembretes = {}
let idAtual = 0

const funcoes = {
    LembreteAnalisado: (lembrete) => {
        lembretes[lembrete.id].dados = lembrete
        axios.post(
            'http://localhost:10000/eventos',
            {
                tipo: 'LembreteAtualizado',
                dados: lembrete
            }
        )
    }
}

//GET localhost:4000/lembretes
app.get ('/lembretes', (req, res) => {
    res.send(lembretes)
})

//POST localhost:4000/lembretes
app.post('/lembretes', async (req, res) => {
    idAtual++
    const { texto } = req.body
    lembretes[idAtual] = {
        dados: {
            id: idAtual,
            texto,
            sentimento: "aguardando"
        }
    }
    await axios.post(
        'http://localhost:10000/eventos',
        {
            tipo: 'LembreteCriado',
            dados: {
                id: idAtual,
                texto,
                sentimento: "aguardando",
                status: "aguardando"
            }
        }
    )
    res.status(201).send(lembretes[idAtual])
})

//POST localhost:4000/eventos
app.post ('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados)
    }
    catch (e){}
    res.status(200).send({msg: 'ok'})
})

const { MSS_LEMBRETES_PORTA } = process.env
app.listen(MSS_LEMBRETES_PORTA, () => console.log(`Lembretes. Porta ${MSS_LEMBRETES_PORTA}.`))