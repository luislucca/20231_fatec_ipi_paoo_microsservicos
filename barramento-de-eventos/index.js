const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

app.post('/eventos', (req, res) => {
    // {tipo: LembreteCriado, payload: {id: 1, texto: "fazer café"}}
    const evento = req.body

    //direcionando o evento para o mss de lembretes
    axios.post('http://localhost:4000/eventos', evento)

    //direcionando o evento para o mss de observacoes
    axios.post.('http://localhost:5000/eventos', evento)

    res.status(200).send({msg: 'ok'})
})

app.listen(10000, () => console.log("Barramento. 10000"))