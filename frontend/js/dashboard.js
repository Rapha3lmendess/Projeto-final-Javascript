/* Lógica da dashboard: carregar agendamentos, cards, tabela e ações */
async function loadDashboard(){
  try{
    showLoading();
    const data = await apiGetAll();
    renderCards(data);
    renderTable(data);
  }catch(err){
    console.error('Erro ao carregar agendamentos:', err);
    showToast('Erro ao carregar agendamentos: ' + (err.message || err), 'error');
  }finally{ hideLoading(); }
}

function renderCards(items){
  const total = items.length;
  const pendentes = items.filter(i=>i.status==='pendente').length;
  const concluidos = items.filter(i=>i.status==='concluido').length;
  const cancelados = items.filter(i=>i.status==='cancelado').length;
  document.getElementById('total').textContent = total;
  document.getElementById('pendentes').textContent = pendentes;
  document.getElementById('concluidos').textContent = concluidos;
  document.getElementById('cancelados').textContent = cancelados;
}

function createStatusBadge(status){
  const span = document.createElement('span');
  span.className = 'status-badge ' + (status==='pendente' ? 'status-pendente' : status==='concluido' ? 'status-concluido' : 'status-cancelado');
  span.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  return span;
}

function renderTable(items){
  const tbody = document.querySelector('#agendamentosTable tbody'); tbody.innerHTML='';
  items.forEach(item=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${escapeHtml(item.nome)}</td>
      <td>${escapeHtml(item.profissional)}</td>
      <td>${formatDateToLocale(item.data)} ${item.hora || ''}</td>
      <td></td>
      <td class="actions"></td>
    `;
    const statusTd = tr.querySelector('td:nth-child(5)');
    statusTd.appendChild(createStatusBadge(item.status));

    const actionsTd = tr.querySelector('.actions');
    // Edit
    const editBtn = document.createElement('button'); editBtn.className='icon-btn'; editBtn.innerHTML='<i class="fa-solid fa-pen"></i>'; editBtn.title='Editar';
    editBtn.addEventListener('click', ()=>{ location.href = `editar.html?id=${item.id}`; });
    actionsTd.appendChild(editBtn);
    // Delete
    const delBtn = document.createElement('button'); delBtn.className='icon-btn'; delBtn.innerHTML='<i class="fa-solid fa-trash"></i>'; delBtn.title='Excluir';
    delBtn.addEventListener('click', async ()=>{
      const ok = await confirmDialog('Confirmar exclusão do agendamento #' + item.id + '?');
      if(!ok) return;
      try{ showLoading(); await apiDelete(item.id); showToast('Agendamento excluído'); loadDashboard(); }catch(e){ showToast(e.message,'error'); }finally{ hideLoading(); }
    });
    actionsTd.appendChild(delBtn);
    // Finalizar
    const finishBtn = document.createElement('button'); finishBtn.className='icon-btn'; finishBtn.innerHTML='<i class="fa-solid fa-check"></i>'; finishBtn.title='Concluir';
    finishBtn.addEventListener('click', async ()=>{ try{ showLoading(); await apiFinalize(item.id); showToast('Agendamento concluído'); loadDashboard(); }catch(e){ showToast(e.message,'error'); }finally{ hideLoading(); } });
    actionsTd.appendChild(finishBtn);
    // Cancelar
    const cancelBtn = document.createElement('button'); cancelBtn.className='icon-btn'; cancelBtn.innerHTML='<i class="fa-solid fa-xmark"></i>'; cancelBtn.title='Cancelar';
    cancelBtn.addEventListener('click', async ()=>{ try{ showLoading(); await apiCancel(item.id); showToast('Agendamento cancelado'); loadDashboard(); }catch(e){ showToast(e.message,'error'); }finally{ hideLoading(); } });
    actionsTd.appendChild(cancelBtn);

    tbody.appendChild(tr);
  });
}

function escapeHtml(text){ if(!text) return ''; return text.replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }

// Pesquisa simples
document.addEventListener('DOMContentLoaded', ()=>{
  const search = document.getElementById('search');
  if(search){
    search.addEventListener('input', async (e)=>{
      try{ showLoading(); const items = await apiGetAll(); const q = e.target.value.toLowerCase(); const filtered = items.filter(i=> (i.nome||'').toLowerCase().includes(q) || (i.profissional||'').toLowerCase().includes(q)); renderTable(filtered); renderCards(items); }catch(err){showToast(err.message,'error')}finally{hideLoading();}
    });
  }
  loadDashboard();
});
