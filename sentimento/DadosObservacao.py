from pydantic import BaseModel

class DadosObservacao(BaseModel):
    id: str
    lembreteId: int
    texto: str
    sentimento: str
    status: str