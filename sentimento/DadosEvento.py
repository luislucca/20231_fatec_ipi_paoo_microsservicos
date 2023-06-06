from typing import Optional
from pydantic import BaseModel, validator

class DadosEvento(BaseModel):
    id: int
    texto: str
    sentimento: str