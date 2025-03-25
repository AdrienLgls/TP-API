// views/EvolutionView.js
export function renderEvolutionChain(evolutions) {
    const evolutionTreeDiv = document.getElementById('evolution-tree');
    evolutionTreeDiv.innerHTML = '';
    evolutions.forEach(evo => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.className = 'evolution-node';
        pokemonDiv.setAttribute('data-pokemon', evo.name);
        if (evo.level) pokemonDiv.setAttribute('data-level', evo.level);
        if (evo.item) pokemonDiv.setAttribute('data-item', evo.item);
        if (evo.location) pokemonDiv.setAttribute('data-location', evo.location);
        pokemonDiv.innerHTML = `
            <img src="${evo.image}" alt="${evo.name}">
            <p>${evo.name}</p>
        `;
        pokemonDiv.addEventListener('click', () => {
            window.location.href = `details.html?name=${evo.name}`;
        });
        evolutionTreeDiv.appendChild(pokemonDiv);
    });
}

export function highlightEvolutions(conditionType, conditionValue) {
    const evolutionNodes = document.querySelectorAll('.evolution-node');
    evolutionNodes.forEach(node => {
        node.classList.remove('highlight');
        let conditionMet = false;
        if (conditionType === 'level' && node.getAttribute('data-level') === conditionValue) {
            conditionMet = true;
        } else if (conditionType === 'item' && node.getAttribute('data-item') === conditionValue.replace(' ', '-')) {
            conditionMet = true;
        } else if (conditionType === 'location' && node.getAttribute('data-location') === conditionValue) {
            conditionMet = true;
        }
        if (conditionMet) {
            node.classList.add('highlight');
            node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}