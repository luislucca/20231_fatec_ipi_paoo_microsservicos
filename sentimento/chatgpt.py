import openai

def encontrar_sentimento(OPENAI_API_KEY, frase):
    openai.api_key = OPENAI_API_KEY

    pergunta_padrao = 'Responda com apenas uma das seguintes opções: "Positivo", "Negativo" ou "Neutro". Qual opção define melhor o sentimento da seguinte frase? '

    prompt = f'{pergunta_padrao}`"{frase}"`'

    resposta = openai.Completion.create(
        engine = 'text-davinci-003',
        prompt = prompt
    )

    return resposta.choices[0].text.strip()