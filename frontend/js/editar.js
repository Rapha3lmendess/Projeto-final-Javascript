document.addEventListener('DOMContentLoaded', ()=>{
  const id = getQueryParam('id');
  const form = document.getElementById('formEditar');
  const telefone = document.getElementById('telefone');
  if(telefone) applyPhoneMask(telefone);
  if(!id){ showToast('ID não informado','error'); return; }
  loadData(id);

  form && form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = {
      nome: document.getElementById('nome').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
      profissional: document.getElementById('profissional').value.trim(),
      data: document.getElementById('data').value,
      hora: document.getElementById('hora').value
    };
    const errors = [];
    if(!data.nome) errors.push('Nome obrigatório');
    if(!data.telefone) errors.push('Telefone obrigatório');
    if(!data.profissional) errors.push('Profissional obrigatório');
    if(!data.data) errors.push('Data obrigatória');
    if(!data.hora) errors.push('Hora obrigatória');
    if(errors.length){ showToast(errors.join('\n'),'error'); return; }

    try{ showLoading(); await apiUpdate(id,data); showToast('Agendamento atualizado'); setTimeout(()=>location.href='index.html',600); }
    catch(e){ showToast(e.message,'error'); }
    finally{ hideLoading(); }
  });
});

async function loadData(id){
  try{ showLoading(); const item = await apiGet(id); document.getElementById('id').value = item.id; document.getElementById('nome').value = item.nome||''; document.getElementById('telefone').value = item.telefone||''; document.getElementById('profissional').value = item.profissional||''; document.getElementById('data').value = item.data||''; document.getElementById('hora').value = item.hora||''; }
  catch(e){ showToast(e.message,'error'); }
  finally{ hideLoading(); }
}
