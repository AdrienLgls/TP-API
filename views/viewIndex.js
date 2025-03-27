/**
 * IndexView.js - Affichage des suggestions et des favoris
 */
export const IndexView = {
    /**
     * Affiche les suggestions de Pokémon dans le DOM.
     * @param {Array} suggestions - Liste des suggestions à afficher.
     */
    renderSuggestions(suggestions) {
        const suggestionsDiv = document.getElementById('suggestions');
        suggestionsDiv.innerHTML = '';
        suggestions.forEach(p => {
            const suggestion = document.createElement('div');
            suggestion.textContent = p.name;
            suggestion.addEventListener('click', () => {
                document.getElementById('search').value = p.name;
                suggestionsDiv.style.display = 'none';
                window.location.href = `../pages/evolution.html?name=${p.name}`;
            });
            suggestionsDiv.appendChild(suggestion);
        });
        suggestionsDiv.style.display = suggestions.length > 0 ? 'block' : 'none';
    },

    /**
     * Affiche les Pokémon favoris dans le DOM.
     * @param {Array} favorites - Liste des Pokémon favoris.
     * @param {Function} onRemoveFavorite - Callback pour supprimer un favori.
     */
    renderFavorites(favorites, onRemoveFavorite) {
        const pokemonGrid = document.querySelector('.pokemon-grid');
        pokemonGrid.innerHTML = favorites.length === 0 ? '<p>No favorites saved.</p>' : '';
        favorites.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'pokemon-card';
            pokemonCard.innerHTML = `
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <p>${pokemon.name}</p>
                <button class="remove-favorite">Remove from favorites</button>
            `;
            pokemonCard.querySelector('.remove-favorite').addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Do you really want to remove ${pokemon.name} from favorites?`)) {
                    onRemoveFavorite(pokemon.name);
                }
            });
            pokemonCard.addEventListener('click', (e) => {
                if (e.target.className !== 'remove-favorite') {
                    window.location.href = `../pages/details.html?name=${pokemon.name}`;
                }
            });
            pokemonGrid.appendChild(pokemonCard);
        });
    }
};