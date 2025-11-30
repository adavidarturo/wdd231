// Set timestamp when form loads
(function(){
      const ts = document.getElementById('timestamp-field');
      if(ts){
        ts.value = new Date().toISOString();
      }
    })();

    // Modal open/close handling using <dialog>
    document.querySelectorAll('.open-modal').forEach(btn=>{
      btn.addEventListener('click', e=>{
        e.preventDefault();
        const id = btn.getAttribute('data-modal');
        const dialog = document.getElementById(id);
        if(!dialog) return;
        if(typeof dialog.showModal === 'function'){
          dialog.showModal();
          const closeBtn = dialog.querySelector('.close'); if(closeBtn) closeBtn.focus();
        } else {
          dialog.setAttribute('open','');
          const closeBtn = dialog.querySelector('.close'); if(closeBtn) closeBtn.focus();
        }
      });
    });

    document.querySelectorAll('dialog .close').forEach(btn=>btn.addEventListener('click', ()=>{
      const dialog = btn.closest('dialog');
      if(!dialog) return;
      if(typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
    }));

    // Close dialog on esc
    document.addEventListener('keydown', e=>{
      if(e.key === 'Escape') document.querySelectorAll('dialog[open]').forEach(d=>{ if(d.close) d.close(); else d.removeAttribute('open'); });
    });

// Read GET parameters and display required fields (safely)
    (function(){
      const params = new URLSearchParams(window.location.search);
      const out = id => document.getElementById(id);
      const safe = v => v ? v : '—';

      const firstEl = out('out-first'); if(firstEl) firstEl.textContent = safe(params.get('firstName'));
      const lastEl = out('out-last'); if(lastEl) lastEl.textContent = safe(params.get('lastName'));
      const emailEl = out('out-email'); if(emailEl) emailEl.textContent = safe(params.get('email'));
      const mobileEl = out('out-mobile'); if(mobileEl) mobileEl.textContent = safe(params.get('mobile'));
      const businessEl = out('out-business'); if(businessEl) businessEl.textContent = safe(params.get('businessName'));

      const tsVal = params.get('timestamp');
      if(tsVal){
        const tsEl = out('out-ts');
        if(tsEl){
          try { tsEl.textContent = new Date(tsVal).toLocaleString(); }
          catch(e) { tsEl.textContent = tsVal; }
        }
      }
    })();