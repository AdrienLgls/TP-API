// controllers/EvolutionController.js
import { getEvolutionChain, getEvolutionDetails } from '../models/modelPokemon.js';
import { EvolutionView } from '../views/viewEvolution.js';

export class EvolutionController {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.pokemonName = this.urlParams.get('name');
        this.init();
    }

    init() {
        this.loadEvolutionChain();
        this.setupEventListeners();
    }

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

    setupEventListeners() {
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
