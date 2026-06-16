# Projeto Final Javascript

O **Agenda Fácil** é um sistema web para gerenciamento de agendamentos. A aplicação permite cadastrar, consultar, editar, concluir e cancelar registros, usando backend em Node.js com API REST e banco MySQL.

## Tecnologias

- Backend: Node.js, Express, Knex, dotenv, mysql2, cors
- Frontend: HTML, JavaScript e CSS
- Banco de dados: MySQL

## Como executar

1. Configure o MySQL e crie o banco `projeto_final`.
2. No diretório `backend`, copie `.env.example` para `.env` e ajuste as credenciais.
3. Para iniciar tudo com um comando só, use o script na raiz do projeto:

```bash
cd Projeto-final-Javascript
./start.sh
```

4. Se preferir iniciar manualmente, siga os passos abaixo.
5. Instale as dependências:

```bash
cd backend
npm install
```

6. Rode a migration:

```bash
npm run migrate
```

7. Inicie o backend:

```bash
npm run dev
```

8. Em outro terminal, inicie o frontend:

```bash
cd ../frontend
python3 -m http.server 8000
```

9. Abra a aplicação em:

```text
http://localhost:8000
```

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
