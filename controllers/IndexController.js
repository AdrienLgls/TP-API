// controllers/IndexController.js
import { getFavorites, removeFavorite } from '../models/FavoritesModel.js';
import { getPokemonDetails, getPokemonSuggestions } from '../models/PokemonModel.js';
import { renderSuggestions, renderFavorites } from '../views/indexView.js';

const searchInput = document.getElementById('search');

async function loadFavorites() {
    const favoritesNames = getFavorites();
    const favorites = await Promise.all(favoritesNames.map(name => getPokemonDetails(name)));
    renderFavorites(favorites);
}

async function loadSuggestions(query) {
    const suggestions = await getPokemonSuggestions(query);
    renderSuggestions(suggestions);
}

searchInput.addEventListener('input', (e) => loadSuggestions(e.target.value));

window.addEventListener('removeFavorite', (e) => {
    removeFavorite(e.detail);
    loadFavorites();
});

document.addEventListener('DOMContentLoaded', loadFavorites);