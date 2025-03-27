// controllers/IndexController.js
import { getFavorites, removeFavorite } from '../models/modelFavorites.js';
import { getPokemonDetails, getPokemonSuggestions } from '../models/modelPokemon.js';
import { IndexView } from '../views/viewIndex.js';

export class IndexController {
    constructor() {
        this.searchInput = document.getElementById('search');
        this.init();
    }

    init() {
        this.loadFavorites();
        this.setupEventListeners();
    }

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

    async loadSuggestions(query) {
        try {
            const suggestions = await getPokemonSuggestions(query);
            IndexView.renderSuggestions(suggestions);
        } catch (error) {
            console.error('Erreur lors du chargement des suggestions :', error);
        }
    }

    setupEventListeners() {
        console.log('setupEventListeners');
        this.searchInput.addEventListener('input', (e) => this.loadSuggestions(e.target.value));
    }
}
