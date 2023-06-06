from pydantic import BaseModel
from DadosEvento import DadosEvento

class Evento(BaseModel):
    tipo: str
    dados: DadosEvento