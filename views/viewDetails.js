/**
 * DetailsView.js - Affichage des détails d'un Pokémon
 */
export const DetailsView = {
    /**
     * Affiche les détails d'un Pokémon dans le DOM.
     * @param {Object} pokemon - Détails du Pokémon (nom, image, types, description, stats).
     */
    renderPokemonDetails(pokemon) {
        document.getElementById('pokemon-name').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        document.getElementById('pokemon-image').src = pokemon.image;
        document.getElementById('pokemon-type').textContent = pokemon.types.join(', ');
        document.getElementById('pokemon-description').textContent = pokemon.description || 'Aucune description disponible.';
        document.getElementById('hp').value = pokemon.hp;
        document.getElementById('attack').value = pokemon.attack;
        document.getElementById("hpValue").textContent = pokemon.hp + " / 255";
        document.getElementById("attackValue").textContent = pokemon.attack + " / 190";
    }
};