/**
 * DetailsView.js - Affichage des détails d'un Pokémon
 */
export const DetailsView = {
    /**
     * Affiche les détails d'un Pokémon dans le DOM.
     * @param {Object} pokemon - Détails du Pokémon (nom, image, types, description, stats).
     */
    renderPokemonDetails(pokemon) {
        document.getElementById('pokemon-name').textContent = pokemon.name;
        document.getElementById('pokemon-image').src = pokemon.image;
        document.getElementById('pokemon-type').textContent = pokemon.types.join(', ');
        document.getElementById('pokemon-description').textContent = pokemon.description;
        document.getElementById('hp').value = pokemon.hp;
        document.getElementById('attack').value = pokemon.attack;
    }
};