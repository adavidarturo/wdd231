// disciplines.mjs
// ES Module responsible for loading the disciplines list. It fetches
// `data/disciplines.json` (local JSON), parses it into a JS array, and
// renders each entry. The try/catch around fetch demonstrates safe
// asynchronous handling of network/parsing errors.
import { openModal } from './modal.mjs';

const container = document.getElementById('items');

async function loadDisciplines(){
  try{
    // Fetch the JSON file and parse it into a JS array named `data`.
    const res = await fetch('data/disciplines.json');
    if(!res.ok) throw new Error('Network response not ok');
    const data = await res.json();

    // Render six disciplines — use map + forEach
    const cards = data.map(d => {
      return `
        <article class="card discipline-card">
          <div class="media" aria-hidden="true"><img src="${d.img}" alt="${d.name} image" loading="lazy"></div>
          <div class="card-body">
            <h4>${d.name}</h4>
            <p class="muted">${d.focus}</p>
            <p class="meta">Duration: ${d.duration} • Level: ${d.level}</p>
            <div class="card-actions">
              <button data-id="${d.id}" class="details">Details</button>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = cards.join('');

    // Add event listeners for details using forEach to attach
    container.querySelectorAll('.details').forEach(btn => {
      btn.addEventListener('click', (e)=>{
        const id = btn.dataset.id;
        const item = data.find(x=>x.id === id);
        if(item) openModal(renderDetails(item));
      });
    });

  }catch(err){
    console.error('Error loading disciplines', err);
    if(container) container.textContent = 'No disciplines available.';
  }
}

function renderDetails(d){
  return `
    <h3 id="modal-title">${d.name}</h3>
    <p><strong>Focus:</strong> ${d.focus}</p>
    <p><strong>Duration:</strong> ${d.duration}</p>
    <p><strong>Level:</strong> ${d.level}</p>
    <p>${d.description}</p>
    <hr>
    <p><strong>More details:</strong> ${d.extra || 'No additional information available.'}</p>
  `;
}

document.addEventListener('DOMContentLoaded', ()=> loadDisciplines());
