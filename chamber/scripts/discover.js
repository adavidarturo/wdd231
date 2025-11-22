import { places } from '../data/places.mjs';

// Build the discover cards and handle last-visit messaging
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('discover-grid');
  const visitText = document.getElementById('visit-text');
  const visitMessage = document.getElementById('visit-message');
  const visitClose = document.getElementById('visit-close');

  // Build cards
  places.forEach((place, idx) => {
    const card = document.createElement('article');
    card.className = `place-card card--${idx + 1}`;

    const title = document.createElement('h2');
    title.textContent = place.name;

    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.setAttribute('loading', 'lazy');
    img.decoding = 'async';
    img.src = place.photo_url;
    img.alt = place.name + ' photo';
    img.width = 300;
    img.height = 200;
    fig.appendChild(img);

    const addr = document.createElement('address');
    addr.textContent = place.address;

    const p = document.createElement('p');
    p.textContent = place.description;

    const btn = document.createElement('button');
    btn.className = 'learn-more';
    btn.textContent = 'Learn more';
    btn.addEventListener('click', () => {
      // Expand or show details - placeholder behavior
      alert(`${place.name}\n\n${place.description}`);
    });

    card.appendChild(title);
    card.appendChild(fig);
    card.appendChild(addr);
    card.appendChild(p);
    card.appendChild(btn);

    grid.appendChild(card);
  });

  // LocalStorage: visit tracking
  const key = 'chamberDiscover_lastVisit';
  const now = Date.now();
  const last = Number(localStorage.getItem(key));

  function setVisitMessage() {
    if (!last || Number.isNaN(last)) {
      visitText.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
      const diffMs = now - last;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffMs < 1000 * 60 * 60 * 24) {
        visitText.textContent = 'Back so soon! Awesome!';
      } else {
        visitText.textContent = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
      }
    }
  }

  setVisitMessage();

  // Update stored visit time to now for subsequent visits
  localStorage.setItem(key, String(now));

  // Close button
  visitClose.addEventListener('click', () => {
    visitMessage.style.display = 'none';
  });
});
