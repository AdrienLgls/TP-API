/**
 * IndexController.js - Gestion de la page d'index
 */
import { getFavorites, removeFavorite } from '../models/FavoritesModel.js';
import { getPokemonDetails, getPokemonSuggestions } from '../models/PokemonModel.js';
import { IndexView } from '../views/IndexView.js';

export class IndexController {
    constructor() {
        this.initializeEventListeners();
    }

    /**
     * Charge et affiche les Pokémon favoris.
     */
    async loadFavorites() {
        try {
            const favoritesNames = getFavorites();
            const favorites = await Promise.all(favoritesNames.map(name => getPokemonDetails(name)));
            IndexView.renderFavorites(favorites, (pokemonName) => {
                removeFavorite(pokemonName);
                this.loadFavorites();
            });
        } catch (error) {
            console.error('Erreur lors du chargement des favoris :', error);
        }
    }

    /**
     * Charge et affiche les suggestions basées sur la requête.
     * @param {string} query - Requête de recherche.
     */
    async loadSuggestions(query) {
        try {
            const suggestions = await getPokemonSuggestions(query);
            IndexView.renderSuggestions(suggestions);
        } catch (error) {
            console.error('Erreur lors du chargement des suggestions :', error);
        }
    }

    /**
     * Initialise les écouteurs d'événements pour la recherche.
     */
    initializeEventListeners() {
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', (e) => this.loadSuggestions(e.target.value));
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const controller = new IndexController();
    controller.loadFavorites();
});