# Projeto Final Javascript

O **Agenda Fácil** é um sistema web para gerenciamento de agendamentos. A aplicação permite cadastrar, consultar, editar, concluir e cancelar registros, usando backend em Node.js com API REST e banco MySQL.

## Tecnologias

- Backend: Node.js, Express, Knex, dotenv, mysql2, cors
- Frontend: HTML, JavaScript e CSS
- Banco de dados: MySQL

## Como executar

1. Abra o projeto em um terminal Linux/WSL e garanta que `node` e `npm` sejam da instalação Linux, não do Windows.
2. Instale o MySQL e crie um usuário com permissão para o banco `projeto_final`.
3. No diretório `backend`, copie `.env.example` para `.env` e ajuste as credenciais conforme o seu banco.
4. Instale as dependências do backend:

```bash
cd backend
npm install
```

5. Rode a migration para criar as tabelas no banco:

```bash
npm run migrate
```

6. Inicie o backend:

```bash
npm run dev
```

7. Em outro terminal, inicie o frontend:

```bash
cd ../frontend
python3 -m http.server 8000
```

8. Abra a aplicação em:

```text
http://localhost:8000
```

## Se você acabou de clonar o projeto

Use este passo a passo rápido:

1. Clone o repositório e abra a pasta no VS Code em um ambiente WSL ou Linux.
2. Verifique se o Node.js funciona com `node -v` e `npm -v`.
3. Configure o MySQL e confirme que o usuário informado em [backend/.env](backend/.env) existe.
4. Rode `npm install` dentro de [backend](backend).
5. Rode `npm run migrate` dentro de [backend](backend).
6. Inicie o backend com `npm run dev`.
7. Inicie o frontend com `python3 -m http.server 8000` dentro de [frontend](frontend).
8. Acesse `http://localhost:8000` no navegador.

## Endpoints da API

- `GET /agendamentos`
- `GET /agendamentos/:id`
- `POST /agendamentos`
- `PUT /agendamentos/:id`
- `DELETE /agendamentos/:id`
- `PUT /agendamentos/finalizar/:id`
- `PUT /agendamentos/cancelar/:id`

## Integrantes

- Raphael Alves Mendes
- Tiago Andrade Lima
- Andre Luis
