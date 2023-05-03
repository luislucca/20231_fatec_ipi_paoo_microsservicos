require('dotenv').config()
const axios = require ('axios')
const express = require('express')
const app = express()
app.use(express.json())

const palavraChave = 'importante'
const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status = observacao.texto.includes
        (palavraChave) ? 'importante' : 'comum'
        axios.post(
            'http://localhost:10000/eventos',
            {
                tipo: 'ObservacaoClassificada',
                dados: observacao
            }
        )
    }
}

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados)
        res.sendStatus(200).send({msg: 'ok'})
    }
    catch (e){}
})

const { MSS_CLASSIFICACAO_PORTA } = process.env
app.listen(MSS_CLASSIFICACAO_PORTA, () => console.log(`Observacoes. ${MSS_CLASSIFICACAO_PORTA}`))