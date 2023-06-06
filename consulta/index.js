require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

//objeto que armazena os lembretes e observacoes para consultar
const baseConsulta = {}

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.id] = lembrete
    },
    LembreteAtualizado: (lembrete) => {
        baseConsulta[lembrete.id] = lembrete
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]['observacoes'] || []
        observacoes.push(observacao)
        baseConsulta[observacao.lembreteId]['observacoes'] = observacoes
    },
    ObservacaoAtualizada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]['observacoes']
        const indice = observacoes.findIndex(o => o.id === observacao.id)
        observacoes[indice] = observacao
        console.log(observacao)
    }
}

//GET /lembretes
app.get('/lembretes', (req, res) => {
    res.send(baseConsulta)
})

//POST /eventos
app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados)
    }
    catch(e){}
    res.status(200).send({msg: 'ok'})
})

const { MSS_CONSULTA_PORTA } = process.env
app.listen(MSS_CONSULTA_PORTA, () => console.log(`Consulta. Porta ${MSS_CONSULTA_PORTA}.`))