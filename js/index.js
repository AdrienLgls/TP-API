// script.js

const searchInput = document.getElementById('search');
const suggestionsDiv = document.getElementById('suggestions');
const popularPokemonSection = document.getElementById('popular-pokemon');

// Fonction pour charger les Pokémon populaires
async function loadPopularPokemon() {
    const popularPokemon = ['pikachu', 'eevee', 'charizard', 'bulbasaur', 'squirtle'];
    popularPokemonSection.innerHTML = '';
    for (const name of popularPokemon) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = await response.json();
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>${pokemon.name}</p>
        `;
        popularPokemonSection.appendChild(pokemonCard);
    }
}

// Fonction pour charger les suggestions
async function loadSuggestions(query) {
    if (query.length < 3) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    const data = await response.json();
    const filteredPokemon = data.results.filter(p => p.name.startsWith(query.toLowerCase()));
    suggestionsDiv.innerHTML = '';
    filteredPokemon.forEach(p => {
        const suggestion = document.createElement('div');
        suggestion.textContent = p.name;
        suggestion.addEventListener('click', () => {
            searchInput.value = p.name;
            suggestionsDiv.style.display = 'none';
            window.location.href = `/html/evolution.html?name=${p.name}`;
        });
        suggestionsDiv.appendChild(suggestion);
    });
    suggestionsDiv.style.display = 'block';
}

// Écouteurs d'événements
searchInput.addEventListener('input', (e) => loadSuggestions(e.target.value));
document.addEventListener('DOMContentLoaded', loadPopularPokemon);