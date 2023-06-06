from fastapi import FastAPI
from Evento import Evento
import chatgpt
import requests

def criar_endpoints(OPENAI_API_KEY):
    app = FastAPI()
    
    @app.get('/', status_code = 200)
    async def root():
        return {'message' : 'Hello, FastAPI'}
    
    #envia texto para IA e devolve a análise do prompt
    @app.post('/eventos', status_code = 200)
    async def obter_sentimentos(evento: Evento):
        sentimento = chatgpt.encontrar_sentimento(OPENAI_API_KEY, evento.dados.texto)
        evento.dados.sentimento = sentimento
        evento.tipo = 'LembreteAnalisado'
        r = requests.post('http://localhost:10000/eventos', data=evento.json(), headers={"Content-type": "application/json"})
        return {'msg' : 'ok'}

    return app