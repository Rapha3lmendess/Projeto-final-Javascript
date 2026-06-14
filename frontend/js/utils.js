/* Utilitários comuns: loading, toast, confirm, formatação e tema */
const loadingEl = () => document.getElementById('loading');
const toastContainer = () => document.getElementById('toast-container');

function showLoading(){ const el = loadingEl(); if(el) el.classList.remove('hidden'); }
function hideLoading(){ const el = loadingEl(); if(el) el.classList.add('hidden'); }

function showToast(message, type='info', timeout=3500){
  const container = toastContainer(); if(!container) return;
  const div = document.createElement('div'); div.className='toast'; div.textContent = message;
  container.appendChild(div);
  setTimeout(()=>{div.classList.add('hide');div.remove();}, timeout);
}

function confirmDialog(message){
  return new Promise(resolve=>{
    const result = confirm(message);
    resolve(result);
  });
}

function formatDateToLocale(dateStr){
  if(!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

function formatDateTime(dateStr, timeStr){
  if(!dateStr) return '';
  const d = new Date(dateStr + 'T' + (timeStr || '00:00'));
  return d.toLocaleString();
}

/* Simple phone mask (BR) */
function maskPhone(input){
  input = input.replace(/\D/g,'');
  if(input.length>10) input = input.replace(/(\d{2})(\d{5})(\d{4}).*/,'($1) $2-$3');
  else input = input.replace(/(\d{2})(\d{4})(\d{0,4}).*/,'($1) $2-$3');
  return input;
}

function applyPhoneMask(el){
  el.addEventListener('input', e=>{ const v = e.target.value; e.target.value = maskPhone(v); });
}

/* Theme handling */
const THEME_KEY = 'agenda_facil_theme';
function loadTheme(){
  const t = localStorage.getItem(THEME_KEY) || 'light';
  if(t === 'dark') document.documentElement.classList.add('dark');
}
function toggleTheme(){
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

/* Safe JSON parse */
function safeJSON(v){ try{return JSON.parse(v);}catch(e){return null;} }

/* Helper to get query param */
function getQueryParam(name){ const params = new URLSearchParams(location.search); return params.get(name); }

document.addEventListener('DOMContentLoaded', ()=>{
  loadTheme();
  const themeToggle = document.getElementById('themeToggle');
  if(themeToggle) themeToggle.addEventListener('click', ()=>{ toggleTheme(); });
});
