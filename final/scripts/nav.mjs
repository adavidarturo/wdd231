// Lightweight nav toggle module used on all pages
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;

  const isSmall = () => window.matchMedia('(max-width:720px)').matches;

  function closeNav() {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerText = '☰';
  }

  function openNav() {
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerText = '✕';
  }

  btn.addEventListener('click', (ev) => {
    if (!isSmall()) return; // only on small screens
    ev.preventDefault();
    if (nav.classList.contains('open')) closeNav();
    else openNav();
  });

  // close nav when clicking a link inside (mobile)
  nav.addEventListener('click', (ev) => {
    const target = ev.target.closest('a');
    if (target && isSmall()) closeNav();
  });

  // close on Escape
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && nav.classList.contains('open')) closeNav();
  });

  // reset button text when resizing to large screens
  window.addEventListener('resize', () => {
    if (!isSmall()) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerText = '☰';
    }
  });

  // Wayfinding: mark the active nav link for accessibility and visual cue.
  // We resolve each link's pathname against the current origin so both
  // absolute and relative hrefs compare correctly.
  const currentPath = location.pathname.replace(/\/$/, '');
  nav.querySelectorAll('a').forEach(a => {
    try{
      const linkPath = new URL(a.getAttribute('href'), location.origin).pathname.replace(/\/$/, '');
      if (linkPath === currentPath) {
        a.setAttribute('aria-current', 'page');
        a.classList.add('active');
      }
    }catch(e){ /* ignore malformed hrefs */ }
  });
});
