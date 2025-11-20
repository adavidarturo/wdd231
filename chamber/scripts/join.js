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

// Read GET parameters and display required fields
    (function(){
      const params = new URLSearchParams(window.location.search);
      const out = id => document.getElementById(id);
      const safe = v => v ? v : '—';

      out('out-first').textContent = safe(params.get('firstName'));
      out('out-last').textContent = safe(params.get('lastName'));
      out('out-email').textContent = safe(params.get('email'));
      out('out-mobile').textContent = safe(params.get('mobile'));
      out('out-business').textContent = safe(params.get('businessName'));

      const ts = params.get('timestamp');
      if(ts){
        try{
          out('out-ts').textContent = new Date(ts).toLocaleString();
        }catch(e){ out('out-ts').textContent = ts }
      }
    })();