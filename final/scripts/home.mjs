// home.mjs
// This module is loaded as an ES Module on the home page. It fetches
// local JSON (`data/disciplines.json`) and demonstrates asynchronous
// functionality with try/catch. The JSON file is parsed into a JavaScript
// array which we manipulate with array methods (sort, slice, map).
// Template literals are used to render HTML strings for each item.
import { openModal } from './modal.mjs';
import { initMap } from './map.mjs';

async function loadFeatured(){
  const container = document.getElementById('items');
  if(!container) return;
  try{
    // Fetch local JSON data. Using `await` inside a try/catch provides a
    // clear way to handle network or parsing errors.
    const res = await fetch('data/disciplines.json');
    if(!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    // shuffle and take 3
    // `data` is now a JS array. We shuffle and take three featured items,
    // then map each to an HTML string using template literals.
    const shuffled = data.sort(()=>0.5 - Math.random()).slice(0,3);
    const html = shuffled.map(d=>`
      <article class="card">
        <div class="media"><img src="${d.img}" alt="${d.name}" loading="lazy"></div>
        <div class="card-body">
          <h4>${d.name}</h4>
          <p class="meta">${d.focus}</p>
          <p class="meta">Duration: ${d.duration} • ${d.level}</p>
          <div class="card-actions"><button data-id="${d.id}" class="details">Details</button></div>
        </div>
      </article>
    `).join('');
    container.innerHTML = html;

    container.querySelectorAll('.details').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.dataset.id;
        const item = shuffled.find(x=>x.id===id);
        if(item) openModal(renderDetails(item));
      });
    });

  }catch(err){
    console.error('Failed to load featured', err);
    container.textContent = 'Failed to load featured disciplines.';
  }
}

function renderDetails(d){
  return `
    <h3 id="modal-title">${d.name}</h3>
    <p><strong>Focus:</strong> ${d.focus}</p>
    <p><strong>Duration:</strong> ${d.duration}</p>
    <p><strong>Level:</strong> ${d.level}</p>
    <p>${d.description}</p>
  `;
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadFeatured();
  // init map from map.mjs (map included on page)
  initMap();
});
