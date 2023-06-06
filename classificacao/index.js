require('dotenv').config()
const axios = require ('axios')
const express = require('express')
const app = express()
app.use(express.json())

const palavraChave = 'importante'
const funcoes = {
    ObservacaoAnalisada: (observacao) => {
        observacao.status = observacao.texto.includes(palavraChave) ?
            'importante' : 'comum'
        axios.post(
            'http://localhost:10000/eventos',
            {
                tipo: 'ObservacaoClassificada',
                dados: observacao
            }
        )
    },
    LembreteAnalisado: (lembrete) => {
        lembrete.status = lembrete.texto.includes(palavraChave) ?
            'importante' : 'comum'
        axios.post(
            'http://localhost:10000/eventos',
            {
                tipo: 'LembreteClassificado',
                dados: lembrete
            }
        )
    }
}

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados)
    }
    catch (e){}
    res.status(200).send({msg: 'ok'})
})

const { MSS_CLASSIFICACAO_PORTA } = process.env
app.listen(MSS_CLASSIFICACAO_PORTA, () => console.log(`Classificacao. Porta ${MSS_CLASSIFICACAO_PORTA}`))