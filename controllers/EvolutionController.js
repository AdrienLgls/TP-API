// controllers/EvolutionController.js
import { getEvolutionChain } from '../models/PokemonModel.js';
import { getPokemonDetails } from '../models/PokemonModel.js'; // Ajout pour récupérer les images
import { renderEvolutionChain, highlightEvolutions } from '../views/EvolutionView.js';

const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');
const conditionTypeSelect = document.getElementById('condition-type');
const conditionValueInput = document.getElementById('condition-value');
const applyConditionButton = document.getElementById('apply-condition');

async function loadEvolutionChain() {
    // Update the displayed Pokémon name
    document.getElementById('pokemon-name').textContent = pokemonName;
    const evolutionChain = await getEvolutionChain(pokemonName);
    const evolutions = await parseEvolutionChain(evolutionChain.chain);
    renderEvolutionChain(evolutions);
}

async function parseEvolutionChain(chain) {
    const evolutions = [];
    async function traverseChain(currentChain) {
        const pokemonName = currentChain.species.name;
        const pokemonDetails = await getPokemonDetails(pokemonName);
		// Fix: check that evolution_details exists and has items before using it.
        const evoDetails = (currentChain.evolution_details && currentChain.evolution_details.length) ? currentChain.evolution_details[0] : {};
        evolutions.push({
            name: pokemonName,
            image: pokemonDetails.image,
            level: evoDetails.min_level || null,
            item: evoDetails.item ? evoDetails.item.name : null,
            location: evoDetails.location ? evoDetails.location.name : null
        });
        for (const next of currentChain.evolves_to) {
            await traverseChain(next);
        }
    }
    await traverseChain(chain);
    return evolutions;
}

applyConditionButton.addEventListener('click', () => {
    const conditionType = conditionTypeSelect.value;
    const conditionValue = conditionValueInput.value.toLowerCase();
    highlightEvolutions(conditionType, conditionValue);
});

document.addEventListener('DOMContentLoaded', loadEvolutionChain);