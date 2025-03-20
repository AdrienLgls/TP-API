const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');
const evolutionTreeDiv = document.getElementById('evolution-tree');
const conditionTypeSelect = document.getElementById('condition-type');
const conditionValueInput = document.getElementById('condition-value');
const applyConditionButton = document.getElementById('apply-condition');

// Fonction pour charger la chaîne d'évolution
async function loadEvolutionChain() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    const species = await response.json();
    const evolutionChainUrl = species.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionChainUrl);
    const evolutionChain = await evolutionResponse.json();
    displayEvolutionChain(evolutionChain.chain);
}

// Fonction pour afficher la chaîne d'évolution
function displayEvolutionChain(chain) {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.className = 'evolution-node';
    pokemonDiv.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url.split('/')[6]}.png" alt="${chain.species.name}">
        <p>${chain.species.name}</p>
    `;
    evolutionTreeDiv.appendChild(pokemonDiv);
    if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach(evolves_to => displayEvolutionChain(evolves_to));
    }
}

// Fonction pour appliquer les conditions d'évolution
applyConditionButton.addEventListener('click', () => {
    const conditionType = conditionTypeSelect.value;
    const conditionValue = conditionValueInput.value;
    console.log(`Condition appliquée: ${conditionType} = ${conditionValue}`);
    // À développer : filtrer l'arbre selon les conditions
});

// Chargement initial
document.addEventListener('DOMContentLoaded', loadEvolutionChain);