from pydantic import BaseModel, validator

class DadosLembrete(BaseModel):
    id: int
    texto: str
    sentimento: str
    status: str