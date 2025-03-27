/**
 * EvolutionView.js - Affichage et mise en évidence de la chaîne d'évolution
 */
export const EvolutionView = {
    /**
     * Affiche la chaîne d'évolution dans le DOM.
     * @param {Array} evolutions - Liste des évolutions à afficher.
     */
    renderEvolutionChain(evolutions) {
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
                window.location.href = `../pages/details.html?name=${evo.name}`;
            });
            evolutionTreeDiv.appendChild(pokemonDiv);
        });
    },

    /**
     * Met en évidence les évolutions selon une condition.
     * @param {string} conditionType - Type de condition (level, item, location).
     * @param {string} conditionValue - Valeur de la condition.
     */
    highlightEvolutions(conditionType, conditionValue) {
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
    },

    /**
     * Met à jour le nom du Pokémon affiché.
     * @param {string} pokemonName - Nom du Pokémon.
     */
    updatePokemonName(pokemonName) {
        document.getElementById('pokemon-name').textContent = pokemonName;
    }
};