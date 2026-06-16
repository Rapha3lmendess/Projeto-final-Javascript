require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const agendamentos = require('./routes/agendamentos');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/agendamentos', agendamentos);

app.get('/', (req,res)=> res.json({ ok: true, msg: 'API funcionando' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
