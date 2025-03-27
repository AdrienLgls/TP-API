// main.js
import { EvolutionController } from '../controllers/controllerEvolution.js';
import { DetailsController } from '../controllers/controllerDetails.js';
import { IndexController } from '../controllers/controllerIndex.js';

// Fonction pour choisir le bon contrôleur selon la page
function initializeController() {
    const path = window.location.pathname;
    if (path.includes('evolution.html')) {
        new EvolutionController();
    } else if (path.includes('details.html')) {
        new DetailsController();
    } else {
        new IndexController();
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', initializeController);