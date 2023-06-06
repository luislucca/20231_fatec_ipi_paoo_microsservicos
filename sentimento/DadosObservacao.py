from pydantic import BaseModel, validator

class DadosObservacao(BaseModel):
    id: str
    lembreteId: int
    texto: str
    sentimento: str
    status: str