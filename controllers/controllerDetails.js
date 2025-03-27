// controllers/DetailsController.js
import { getPokemonDetails, getPokemonDescription } from '../models/modelPokemon.js';
import { addFavorite } from '../models/modelFavorites.js';
import { DetailsView } from '../views/viewDetails.js';

export class DetailsController {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.pokemonName = this.urlParams.get('name');
        this.init();
    }

    init() {
        this.loadPokemonDetails();
        this.setupEventListeners();
    }

    async loadPokemonDetails() {
        try {
            const pokemon = await getPokemonDetails(this.pokemonName);
            const description = await getPokemonDescription(pokemon.speciesUrl);
            pokemon.description = description;
            DetailsView.renderPokemonDetails(pokemon);
        } catch (error) {
            console.error('Erreur lors du chargement des détails :', error);
        }
    }

    setupEventListeners() {
        document.getElementById('add-to-favorites').addEventListener('click', () => {
            addFavorite(this.pokemonName);
        });
    }
}

