require('dotenv').config()
const express = require ('express')
const axios = require ('axios')
const app = express()
app.use(express.json())

const { BARRAMENTO_PORTA } = process.env

app.post('/eventos', (req, res) => {
    // {tipo: LembreteCriado, dados: {id: 1, texto: "texto aqui", sentimento: "aguardando"}}
    const evento = req.body
    //direcionando o evento para o mss de lembretes
    axios.post('http://localhost:4000/eventos', evento)

    // //direcionando o evento para o mss de observacoes
    axios.post('http://localhost:5000/eventos', evento)
    
    //direcionando o evento para o mss de consulta
    axios.post('http://localhost:6000/eventos', evento)
    
    // //direcionando o evento para o mss de classificacao
    axios.post('http://localhost:7000/eventos', evento)
        
    //direcionando o evento para o mss de sentimento
    axios.post('http://localhost:8000/eventos', evento)
    
    res.status(200).send({msg: 'ok'})
})

app.listen(BARRAMENTO_PORTA, () => console.log(`Barramento. Porta ${BARRAMENTO_PORTA}.`))