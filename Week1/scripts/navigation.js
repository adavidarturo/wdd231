
/* Nav buttons and dynamics */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const icon = hamburger ? hamburger.querySelector('.hamburger-icon') : null;

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        const willOpen = !expanded;
        hamburger.setAttribute('aria-expanded', String(willOpen));
        navMenu.classList.toggle('open');

        // toggle icon between hamburger and X
        if (icon) icon.textContent = willOpen ? '✕' : '☰';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            if (icon) icon.textContent = '☰';
        });
    });
}

/* Start point */
document.addEventListener('DOMContentLoaded', initNavigation);


