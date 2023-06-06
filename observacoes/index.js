require('dotenv').config()
const axios = require ('axios')
const express = require('express')
const {v4: uuidv4} = require ('uuid')
const app = express()
app.use(express.json())

//objeto que armazena as observacoes de cada lembrete
const observacoesPorLembreteId = {}

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes = observacoesPorLembreteId[observacao.lembreteId]
        const obsParaAtualizar = observacoes.find(o => o.id === observacao.id)
        obsParaAtualizar.status = observacao.status
        axios.post(
            'http://localhost:10000/eventos',
            {
                tipo: 'ObservacaoAtualizada',
                dados: observacao
            }
        )
    }
}

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

app.post('/lembretes/:id/observacoes', async (req, res) => {
    //gerar um id de observação
    const idObs = uuidv4()
    //pegar o texto da observação
    const { texto } = req.body
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []
    observacoesDoLembrete.push({id: idObs, texto, status: 'Aguardando'})
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete
    await axios.post(
        'http://localhost:10000/eventos',
        {
            tipo: 'ObservacaoCriada',
            dados: {
                id: idObs,
                texto,
                lembreteId: req.params.id,
                status: "Aguardando"
            }
        }
    )
    res.status(201).send(observacoesDoLembrete)
})

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados)
    }
    catch (e){}
    res.status(200).send({msg: 'ok'})
})

const { MSS_OBSERVACOES_PORTA } = process.env
app.listen(MSS_OBSERVACOES_PORTA, () => console.log(`Observacoes. Porta ${MSS_OBSERVACOES_PORTA}`))