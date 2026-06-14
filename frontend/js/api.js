// API helper para consumir os endpoints de agendamentos
const API_BASE = '';// deixar vazio para usar o mesmo host. Ex: 'http://localhost:3000'

async function handleResponse(res){
  const text = await res.text();
  if(!res.ok){
    let msg = `HTTP ${res.status} ${res.statusText}`;
    try{ const json = JSON.parse(text); msg += ' - ' + (json.message || JSON.stringify(json)); }
    catch(e){ if(text) msg += ' - ' + text; }
    throw new Error(msg);
  }
  try{ return JSON.parse(text); }
  catch(e){ return text; }
}

async function apiGetAll(){
  const res = await fetch(API_BASE + '/agendamentos');
  return handleResponse(res);
}

async function apiGet(id){
  const res = await fetch(`${API_BASE}/agendamentos/${id}`);
  return handleResponse(res);
}

async function apiCreate(data){
  const res = await fetch(API_BASE + '/agendamentos',{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)
  });
  return handleResponse(res);
}

async function apiUpdate(id,data){
  const res = await fetch(`${API_BASE}/agendamentos/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  return handleResponse(res);
}

async function apiDelete(id){
  const res = await fetch(`${API_BASE}/agendamentos/${id}`,{method:'DELETE'});
  await handleResponse(res);
  return true;
}

async function apiFinalize(id){
  const res = await fetch(`${API_BASE}/agendamentos/finalizar/${id}`,{method:'PUT'});
  return handleResponse(res);
}

async function apiCancel(id){
  const res = await fetch(`${API_BASE}/agendamentos/cancelar/${id}`,{method:'PUT'});
  return handleResponse(res);
}
