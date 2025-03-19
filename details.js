// details.js
const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');
const pokemonNameTitle = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonType = document.getElementById('pokemon-type');
const pokemonDescription = document.getElementById('pokemon-description');
const hpProgress = document.getElementById('hp');
const attackProgress = document.getElementById('attack');

// Fonction pour charger les détails du Pokémon
async function loadPokemonDetails() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = await response.json();
    pokemonNameTitle.textContent = pokemon.name;
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonType.textContent = pokemon.types.map(t => t.type.name).join(', ');
    hpProgress.value = pokemon.stats[0].base_stat;
    attackProgress.value = pokemon.stats[1].base_stat;
    // Charger la description
    const speciesResponse = await fetch(pokemon.species.url);
    const species = await speciesResponse.json();
    const description = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    pokemonDescription.textContent = description ? description.flavor_text : 'Pas de description disponible.';
}

// Chargement initial
document.addEventListener('DOMContentLoaded', loadPokemonDetails);