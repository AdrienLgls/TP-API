/**
 * EvolutionController.js - Gestion de la page d'évolution
 */
import { getEvolutionChain, getEvolutionDetails } from '../models/PokemonModel.js';
import { EvolutionView } from '../views/EvolutionView.js';

export class EvolutionController {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.pokemonName = this.urlParams.get('name');
        this.initializeEventListeners();
    }

    /**
     * Charge et affiche la chaîne d'évolution.
     */
    async loadEvolutionChain() {
        try {
            EvolutionView.updatePokemonName(this.pokemonName);
            const evolutionChain = await getEvolutionChain(this.pokemonName);
            const evolutions = await getEvolutionDetails(evolutionChain.chain);
            EvolutionView.renderEvolutionChain(evolutions);
        } catch (error) {
            console.error('Erreur lors du chargement de la chaîne d’évolution :', error);
        }
    }

    /**
     * Initialise les écouteurs d'événements pour les conditions d'évolution.
     */
    initializeEventListeners() {
        const conditionTypeSelect = document.getElementById('condition-type');
        const conditionValueInput = document.getElementById('condition-value');
        const applyConditionButton = document.getElementById('apply-condition');

        applyConditionButton.addEventListener('click', () => {
            const conditionType = conditionTypeSelect.value;
            const conditionValue = conditionValueInput.value.toLowerCase();
            EvolutionView.highlightEvolutions(conditionType, conditionValue);
        });
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const controller = new EvolutionController();
    controller.loadEvolutionChain();
});