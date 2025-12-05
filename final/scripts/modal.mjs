let modalEl = null;
let modalBody = null;
let closeBtn = null;

function ensureNodes(){
  if(!modalEl) modalEl = document.getElementById('modal');
  if(!modalBody) modalBody = document.getElementById('modal-body');
  if(!closeBtn) closeBtn = document.getElementById('modal-close');
}

export function openModal(html){
  ensureNodes();
  if(!modalEl || !modalBody) return;
  modalBody.innerHTML = html;
  modalEl.setAttribute('aria-hidden','false');
  // ensure overlay is visible — CSS controls layout; we rely on aria-hidden
  modalEl.style.display = 'flex';
  focusTrap(modalEl);
}

export function closeModal(){
  ensureNodes();
  if(!modalEl) return;
  modalEl.setAttribute('aria-hidden','true');
  modalEl.style.display = 'none';
  releaseFocus();
}

// Simple focus trap implementation
let lastFocused;
function focusTrap(el){
  lastFocused = document.activeElement;
  const focusable = el.querySelectorAll('button,a,input,select,textarea,[tabindex]');
  const first = focusable[0];
  first?.focus();
  document.addEventListener('keydown', handleKey);
}
function releaseFocus(){
  document.removeEventListener('keydown', handleKey);
  lastFocused?.focus();
}

function handleKey(e){
  if(e.key === 'Escape') closeModal();
}

// Attach close handler after DOM is ready
document.addEventListener('DOMContentLoaded', ()=>{
  ensureNodes();
  // Close when user clicks the overlay (outside modal content). This
  // provides the behavior requested: no X close, but click outside closes.
  if(modalEl){
    modalEl.addEventListener('click', (ev)=>{
      if(ev.target === modalEl) closeModal();
    });
  }
});
