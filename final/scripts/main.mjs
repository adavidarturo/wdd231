import { openModal, closeModal } from './modal.mjs';
import { initMap } from './map.mjs';

// Main module: loads dynamic gym items from a local JSON file and manages
// favorites stored in localStorage.
// File:
// - ES Modules (this file is imported by pages with `type="module"`).
// - Fetching a local JSON file acting like a small API (see `fetch` + `await`).
// - Proper async error handling with try/catch around the fetch call.
// - Using arrays parsed from JSON and common array methods (map, find).

const FAV_KEY = 'mma_favs';

function getFavorites(){
  const raw = localStorage.getItem(FAV_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveFavorites(arr){
  localStorage.setItem(FAV_KEY, JSON.stringify(arr));
}

// Toggle a favorite and update the button UI. `btn` is optional (caller may
// pass it so we update the DOM immediately).
function toggleFavorite(id, btn){
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if(idx === -1){
    favs.push(id);
    if(btn){ btn.textContent = '♥'; btn.setAttribute('aria-pressed','true'); }
  } else {
    favs.splice(idx, 1);
    if(btn){ btn.textContent = '♡'; btn.setAttribute('aria-pressed','false'); }
  }
  saveFavorites(favs);
}

// Render the details HTML for a gym item; used inside the modal.
function renderItemDetails(item){
  // Render detailed gym information using the fields added to gyms.json.
  // The `trainers` field is an array; we join it for display. This content
  // appears inside the shared modal and is centered by the modal styles.
  const trainers = Array.isArray(item.trainers) ? item.trainers.join(', ') : (item.trainers || 'TBA');
  return `
    <div class="modal-content">
      <h3>${item.name}</h3>
      <p class="muted">${item.discipline} — ${item.level}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Hours:</strong> ${item.hours || 'Contact for hours'}</p>
      <p><strong>Phone:</strong> ${item.phone || 'N/A'}</p>
      <p><strong>Trainers:</strong> ${trainers}</p>
    </div>
  `;
}

// Load gyms from `data/gyms.json` and render into the container marked with `data-source="gyms"` or `id="gyms"`.
export async function loadItems(){
  const itemsContainer = document.querySelector('[data-source="gyms"]') || document.getElementById('gyms');
  if(!itemsContainer) return; // nothing to do on pages without the container

  try{
    // fetch the local JSON file (acts as a simple API). We use await/try/catch so any network or parsing error can be handled gracefully.
    const resp = await fetch('data/gyms.json');
    if(!resp.ok) throw new Error('Network response not ok');
    const items = await resp.json();

    // `items` is an array parsed from the JSON file. Use `map` to convert
    // each item into an HTML string, then join them into a single string.
    itemsContainer.innerHTML = items.map(it => `
      <article class="card">
        <img src="${it.img}" alt="${it.name}">
        <div class="card-body">
          <h3>${it.name}</h3>
          <p class="muted">${it.discipline} — ${it.level}</p>
          <p>${it.location}</p>
          <div class="card-actions">
            <button class="details" data-id="${it.id}">Details</button>
            <button class="fav" data-id="${it.id}" aria-pressed="false">♡</button>
          </div>
        </div>
      </article>
    `).join('');

    // Apply initial favorite state from localStorage, and attach listeners.
    const favs = getFavorites();
    itemsContainer.querySelectorAll('.fav').forEach(btn => {
      const id = Number(btn.dataset.id);
      if(favs.includes(id)){
        btn.textContent = '♥';
        btn.setAttribute('aria-pressed','true');
      }
      btn.addEventListener('click', () => toggleFavorite(id, btn));
    });

    // Details buttons: open modal with the selected item's details.
    itemsContainer.querySelectorAll('.details').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        const item = items.find(i => i.id === id);
        if(item) openModal(renderItemDetails(item));
      });
    });

  } catch(err){
    console.error('Failed to load gyms', err);
    itemsContainer.innerHTML = '<p class="error">Could not load nearby gyms.</p>';
  }
}

// Initialize behaviors when DOM is ready.
document.addEventListener('DOMContentLoaded', ()=>{
  const gymsEl = document.querySelector('[data-source="gyms"]') || document.getElementById('gyms');
  if(gymsEl) loadItems();
  // initialize the map even if gyms not present (map module guards internally)
  initMap();
});

export default { loadItems };
