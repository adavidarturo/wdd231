async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        return members;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

function getRandomSpotlights(members, count = 3) {
    // Filter members with gold or silver membership
    const eligibleMembers = members.filter(member => 
        member.membership === 'gold' || member.membership === 'silver'
    );

    // Shuffle array and get random members
    const shuffled = eligibleMembers.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function displaySpotlights(spotlightMembers) {
    const container = document.getElementById('spotlights-container');
    container.innerHTML = '';

    spotlightMembers.forEach(member => {
        const membershipClass = member.membership.toLowerCase();
        const membershipLabel = member.membership.charAt(0).toUpperCase() + member.membership.slice(1);

        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" class="spotlight-logo">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <div class="membership-badge ${membershipClass}">${membershipLabel}</div>
        `;
        container.appendChild(card);
    });
}

async function loadSpotlights() {
    const members = await fetchMembers();
    if (members.length > 0) {
        const spotlights = getRandomSpotlights(members, 3);
        displaySpotlights(spotlights);
    }
}

// Load spotlights when page loads
document.addEventListener('DOMContentLoaded', loadSpotlights);
