# IaraGames

## Instalação

Utilize o Node versão >= 20.0
1. Instale as dependências com `npm install`
2. Rode o projeto com `npm run start`
3. Acesse o projeto em `http://localhost:3000`


## Implementação do Projeto

Foi utilizado o express para criar um servidor em node.js, as páginas foram criadas com html e css puro, e são servidas através dos métodos get do express.

O servidor também conta com uma api de autenticação, onde é possível realizar o cadastro de um usuário e realizar o login.

Os usuários são salvos em um banco de dados sqlite.

## Rotas

### GET /
Página inicial do projeto, contém um formulário de login e um link para a página de cadastro.

### GET /cadastro
Página de cadastro de usuário, contém um formulário de cadastro.

### GET /home
Página de home do usuário, contém o projeto principal do Iara Games.

### POST /signup
Rota para cadastro de usuário, recebe um json com os campos `email` e `password` e retorna um json com uma mensagem de sucesso ou erro.

### POST /login
Rota para login de usuário, recebe um json com os campos `email` e `password` e retorna um json com uma mensagem de sucesso ou erro.

## Tabelas

### USERS
Tabela que contém os usuários cadastrados no sistema.
```sql
CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, password TEXT)
```