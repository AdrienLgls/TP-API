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
    displayNextEvolutions(evolutionChain.chain, pokemonName);
}

// Fonction pour afficher la chaîne d'évolution
function displayNextEvolutions(chain, currentPokemon) {
    if (chain.species.name === currentPokemon) {
        for (let i = 0; i < chain.evolves_to.length; i++) {
            const evo = chain.evolves_to[i];

            // Récupération de l'ID du Pokémon évolué
            const pokemonId = evo.species.url.split("/").slice(-2, -1)[0];

            // Création d'une div pour chaque évolution
            const pokemonDiv = document.createElement("div");
            pokemonDiv.className = "evolution-node";

            // Ajout du contenu HTML
            pokemonDiv.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${evo.species.name}">
                <p>${evo.species.name}</p>
            `;

            // Ajout au conteneur principal
            evolutionTreeDiv.appendChild(pokemonDiv);
        }
        return; // On arrête la recherche une fois qu'on a trouvé le Pokémon
    }

    // Si ce n'est pas encore le Pokémon actuel, on continue la recherche dans les évolutions
    for (let i = 0; i < chain.evolves_to.length; i++) {
        displayNextEvolutions(chain.evolves_to[i], currentPokemon);
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