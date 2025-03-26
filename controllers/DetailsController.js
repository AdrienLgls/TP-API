/**
 * DetailsController.js - Gestion de la page de détails
 */
import { getPokemonDetails, getPokemonDescription } from '../models/PokemonModel.js';
import { addFavorite } from '../models/FavoritesModel.js';
import { DetailsView } from '../views/DetailsView.js';

export class DetailsController {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.pokemonName = this.urlParams.get('name');
        this.initializeEventListeners();
    }

    /**
     * Charge et affiche les détails du Pokémon.
     */
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

    /**
     * Initialise les écouteurs d'événements pour ajouter aux favoris.
     */
    initializeEventListeners() {
        document.getElementById('add-to-favorites').addEventListener('click', () => {
            addFavorite(this.pokemonName);
        });
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const controller = new DetailsController();
    controller.loadPokemonDetails();
});