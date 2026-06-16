const db = require('../../db/knex');

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
    const payload = req.body;
    const [id] = await db('agendamentos').insert(payload);
    const created = await db('agendamentos').where({ id }).first();
    res.status(201).json(created);
  }catch(err){ res.status(500).json({ message: err.message }); }
}

async function update(req, res){
  try{
    const { id } = req.params;
    const payload = req.body;
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
