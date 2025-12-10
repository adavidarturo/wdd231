// directory.js
// Fetch members.json and render member cards
// Implement view toggle between grid and list
// Accessible controls: buttons update aria-pressed and container class

const membersUrl = 'data/members.json'; // relative to directory.html

async function getMembers() {
  try {
    const res = await fetch(membersUrl);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}

function membershipLabel(level){
  // map numeric membership to label
  switch (level) {
    case 3: return 'Platinum';
    case 2: return 'Gold';
    case 1: return 'Silver';
    default: return 'Member';
  }
}

function createMemberCard(member){
  const card = document.createElement('article');
  card.className = 'member-card';
  card.setAttribute('tabindex','0');

  // Image container
  const imgWrap = document.createElement('div');
  imgWrap.className = 'member-image';
  const img = document.createElement('img');
  img.src = `images/${member.image}`;
  img.alt = `${member.name} logo`;
  imgWrap.appendChild(img);

  // Info
  const info = document.createElement('div');
  info.className = 'member-info';

  const name = document.createElement('h3');
  name.className = 'member-name';
  name.textContent = member.name;

  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = membershipLabel(member.membershipLevel);

  const address = document.createElement('p');
  address.className = 'member-meta';
  address.textContent = member.address;

  const phone = document.createElement('p');
  phone.className = 'member-meta';
  phone.textContent = `Tel: ${member.phone}`;

  // Actions
  const actions = document.createElement('div');
  actions.className = 'member-actions';

  const visit = document.createElement('a');
  visit.className = 'visit-btn';
  visit.href = member.websiteURL;
  visit.target = '_blank';
  visit.rel = 'noopener noreferrer';
  visit.textContent = 'Visit';

  info.appendChild(name);
  info.appendChild(badge);
  info.appendChild(address);
  info.appendChild(phone);
  actions.appendChild(visit);

  // Assemble card
  card.appendChild(imgWrap);
  card.appendChild(info);
  card.appendChild(actions);

  return card;
}

async function displayMembers(){
  const container = document.getElementById('members');
  container.innerHTML = ''; // clear ;)
  const members = await getMembers();
  if (!members.length) {
    container.textContent = 'No members available.';
    return;
  }

  const frag = document.createDocumentFragment();
  members.forEach(m => {
    const card = createMemberCard(m);
    frag.appendChild(card);
  });

  container.appendChild(frag);
}

// View toggle logic
function setupViewToggle(){
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const container = document.getElementById('members');

  function setGrid(){
    container.classList.remove('members-list');
    container.classList.add('members-grid');
    gridBtn.setAttribute('aria-pressed','true');
    listBtn.setAttribute('aria-pressed','false');
  }
  function setList(){
    container.classList.remove('members-grid');
    container.classList.add('members-list');
    gridBtn.setAttribute('aria-pressed','false');
    listBtn.setAttribute('aria-pressed','true');
  }

  gridBtn.addEventListener('click', setGrid);
  listBtn.addEventListener('click', setList);

  // keyboard accessibility: toggle via Enter/Space
  [gridBtn, listBtn].forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // default: grid
  setGrid();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  displayMembers();
  setupViewToggle();
});
