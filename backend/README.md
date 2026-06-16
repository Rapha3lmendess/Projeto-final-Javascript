# Backend (Node + Express + Knex)

Instalação e execução:

1. Copie `.env.example` para `.env` e preencha as credenciais do MySQL.
2. Instale dependências: `npm install` dentro da pasta `backend`.
3. Rode migrações: `npm run migrate`.
4. Inicie: `npm run dev` ou `npm start`.

Endpoints principais:
- `GET /agendamentos`
- `GET /agendamentos/:id`
- `POST /agendamentos`
- `PUT /agendamentos/:id`
- `DELETE /agendamentos/:id`
- `PUT /agendamentos/finalizar/:id`
- `PUT /agendamentos/cancelar/:id`
