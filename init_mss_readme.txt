npm init -y

npm i axios express dotenv

npm i nodemon --save-dev (atualiza o código em tempo de execução)

Altere no package.json em "scripts": "test" para "start": "nodemon index.js"

Crie os arquivos dotenv e dotenv.example



------------------------------------------

PUSH NO GIT

cria o repositorio remoto

git init
git add .
git commit
git remote add origin <REMOTE_REPOSITORY_HTTP_KEY>
git push origin main