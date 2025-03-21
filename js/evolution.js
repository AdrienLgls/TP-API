const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');
const pokemonNameTitle = document.getElementById('pokemon-name');
const evolutionTreeDiv = document.getElementById('evolution-tree');
const conditionTypeSelect = document.getElementById('condition-type');
const conditionValueInput = document.getElementById('condition-value');
const applyConditionButton = document.getElementById('apply-condition');



// Fonction pour charger la chaîne d'évolution
async function loadEvolutionChain() {
    pokemonNameTitle.textContent = pokemonName;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    const species = await response.json();
    const evolutionChainUrl = species.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionChainUrl);
    const evolutionChain = await evolutionResponse.json();
    displayNextEvolutions(evolutionChain.chain, pokemonName);
}

// Fonction pour afficher la chaîne d'évolution
function displayNextEvolutions(chain, currentPokemon) {
    if (chain.species.name === currentPokemon) {
        for (let i = 0; i < chain.evolves_to.length; i++) {
            const evo = chain.evolves_to[i];
            const pokemonId = evo.species.url.split("/").slice(-2, -1)[0];
            const pokemonDiv = document.createElement("div");
            pokemonDiv.className = "evolution-node";
            pokemonDiv.setAttribute('data-pokemon', evo.species.name);

            if (evo.evolution_details.length > 0) {
                const details = evo.evolution_details[0];
                if (details.min_level) {
                    pokemonDiv.setAttribute('data-level', details.min_level);
                }
                if (details.item) {
                    pokemonDiv.setAttribute('data-item', details.item.name);
                }
                if (details.location) {
                    pokemonDiv.setAttribute('data-location', details.location.name);
                }
            }

            pokemonDiv.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${evo.species.name}">
                <p>${evo.species.name}</p>
            `;

            pokemonDiv.addEventListener('click', () => {
                window.location.href = `details.html?name=${evo.species.name}`;
            });

            evolutionTreeDiv.appendChild(pokemonDiv);
        }
        return;
    }

    for (let i = 0; i < chain.evolves_to.length; i++) {
        displayNextEvolutions(chain.evolves_to[i], currentPokemon);
    }
}

// Fonction pour appliquer les conditions d'évolution
applyConditionButton.addEventListener('click', () => {
    const conditionType = conditionTypeSelect.value; // ex : "item"
    const conditionValue = conditionValueInput.value.toLowerCase(); // ex : "water stone"

    const evolutionNodes = document.querySelectorAll('.evolution-node');
    evolutionNodes.forEach(node => {
        node.classList.remove('highlight');
    });

    evolutionNodes.forEach(node => {
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
});

// Chargement initial
document.addEventListener('DOMContentLoaded', loadEvolutionChain);