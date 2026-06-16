const db = require('../../db/knex');

function normalizePayload(body){
  return {
    nome: (body.nome || '').trim(),
    telefone: (body.telefone || '').trim(),
    profissional: (body.profissional || '').trim(),
    data: (body.data || '').trim(),
    hora: (body.hora || '').trim(),
    status: (body.status || 'pendente').trim() || 'pendente'
  };
}

function validatePayload(payload){
  if(!payload.nome) return 'Campo nome é obrigatório';
  if(!payload.telefone) return 'Campo telefone é obrigatório';
  if(!payload.profissional) return 'Campo profissional é obrigatório';
  if(!payload.data) return 'Campo data é obrigatório';
  if(!payload.hora) return 'Campo hora é obrigatório';

  if(!/^\d{4}-\d{2}-\d{2}$/.test(payload.data)){
    return 'Data inválida. Use o formato YYYY-MM-DD';
  }

  const [year, month, day] = payload.data.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if(
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() + 1 !== month ||
    parsed.getUTCDate() !== day
  ){
    return 'Data inválida. Use uma data real no formato YYYY-MM-DD';
  }

  if(!/^\d{2}:\d{2}$/.test(payload.hora)){
    return 'Hora inválida. Use o formato HH:MM';
  }

  return null;
}

async function list(req, res){
  try{
    const rows = await db('agendamentos').select('*').orderBy('id','desc');
    res.json(rows);
  }catch(err){ res.status(500).json({ message: err.message }); }
}

async function getById(req, res){
  try{
    const { id } = req.params;
    const row = await db('agendamentos').where({ id }).first();
    if(!row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
  }catch(err){ res.status(500).json({ message: err.message }); }
}

async function create(req, res){
  try{
    const payload = normalizePayload(req.body);
    const validationError = validatePayload(payload);
    if(validationError) return res.status(400).json({ message: validationError });

    const [id] = await db('agendamentos').insert(payload);
    const created = await db('agendamentos').where({ id }).first();
    res.status(201).json(created);
  }catch(err){ res.status(500).json({ message: err.message }); }
}

async function update(req, res){
  try{
    const { id } = req.params;
    const payload = normalizePayload(req.body);
    const validationError = validatePayload(payload);
    if(validationError) return res.status(400).json({ message: validationError });

    const affected = await db('agendamentos').where({ id }).update(payload);
    if(!affected) return res.status(404).json({ message: 'Not found' });
    const updated = await db('agendamentos').where({ id }).first();
    res.json(updated);
  }catch(err){ res.status(500).json({ message: err.message }); }
}

async function remove(req, res){
  try{
    const { id } = req.params;
    const affected = await db('agendamentos').where({ id }).del();
    if(!affected) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  }catch(err){ res.status(500).json({ message: err.message }); }
}

async function finalizar(req, res){
  try{
    const { id } = req.params;
    const affected = await db('agendamentos').where({ id }).update({ status: 'concluido' });
    if(!affected) return res.status(404).json({ message: 'Not found' });
    const updated = await db('agendamentos').where({ id }).first();
    res.json(updated);
  }catch(err){ res.status(500).json({ message: err.message }); }
}

async function cancelar(req, res){
  try{
    const { id } = req.params;
    const affected = await db('agendamentos').where({ id }).update({ status: 'cancelado' });
    if(!affected) return res.status(404).json({ message: 'Not found' });
    const updated = await db('agendamentos').where({ id }).first();
    res.json(updated);
  }catch(err){ res.status(500).json({ message: err.message }); }
}

module.exports = { list, getById, create, update, remove, finalizar, cancelar };
