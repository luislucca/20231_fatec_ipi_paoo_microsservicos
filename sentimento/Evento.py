from pydantic import BaseModel
from DadosLembrete import DadosLembrete
from DadosObservacao import DadosObservacao
from typing import Union, Any

class Evento(BaseModel):
    tipo: str
    dados: Union[DadosLembrete, DadosObservacao, Any]