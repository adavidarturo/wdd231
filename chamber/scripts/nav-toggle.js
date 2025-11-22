document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('nav-list');
  if (!menuToggle || !navList) return;

  function setOpenState(isOpen){
    navList.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    const icon = menuToggle.querySelector('.menu-icon');
    const label = menuToggle.querySelector('.menu-text');
    if (icon) icon.textContent = isOpen ? '✕' : '☰';
    if (label) label.textContent = isOpen ? 'Close' : 'Menu';
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = navList.classList.contains('active');
    setOpenState(!isOpen);
  });

  // Close menu when a nav link is clicked (use event delegation)
  navList.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a' && window.innerWidth < 768) {
      setOpenState(false);
    }
  });

  // Close menu on resize to large screens
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      setOpenState(false);
    }
  });
});
