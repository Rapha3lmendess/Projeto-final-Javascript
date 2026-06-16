document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('formCadastro');
  const telefone = document.getElementById('telefone');
  if(telefone) applyPhoneMask(telefone);

  form && form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = collectForm();
    const errors = validate(data);
    if(errors.length){ showToast(errors.join('\n'),'error'); return; }

    try{
      showLoading();
      await apiCreate(data);
      showToast('Agendamento criado com sucesso');
      setTimeout(()=> location.href='index.html', 600);
    }catch(err){ showToast(err.message || 'Erro ao criar','error'); }
    finally{ hideLoading(); }
  });
});

function collectForm(){
  return {
    nome: document.getElementById('nome').value.trim(),
    telefone: document.getElementById('telefone').value.trim(),
    profissional: document.getElementById('profissional').value.trim(),
    data: document.getElementById('data').value,
    hora: document.getElementById('hora').value,
    status: 'pendente'
  };
}

function validate(data){
  const errors = [];
  if(!data.nome) errors.push('Campo Nome é obrigatório');
  if(!data.telefone) errors.push('Campo Telefone é obrigatório');
  if(!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(data.telefone)) errors.push('Telefone inválido');
  if(!data.profissional) errors.push('Campo Profissional é obrigatório');
  if(!data.data) errors.push('Campo Data é obrigatório');
  if(data.data && !/^\d{4}-\d{2}-\d{2}$/.test(data.data)) errors.push('Data inválida. Use YYYY-MM-DD');
  if(!data.hora) errors.push('Campo Hora é obrigatório');
  if(data.hora && !/^\d{2}:\d{2}$/.test(data.hora)) errors.push('Hora inválida. Use HH:MM');
  return errors;
}
