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
                window.location.href = `pages/evolution.html?name=${p.name}`;
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
        pokemonGrid.innerHTML = favorites.length === 0 ? '<p>Aucun favori enregistré.</p>' : '';
        favorites.forEach(pokemon => {
            const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'pokemon-card';
            pokemonCard.innerHTML = `
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <p>${pokemonName}</p>
                <button class="remove-favorite">Enlever des favoris</button>
            `;
            pokemonCard.querySelector('.remove-favorite').addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Voulez-vous vraiment supprimer ${pokemon.name} des favoris ?`)) {
                    onRemoveFavorite(pokemon.name);
                }
            });
            pokemonCard.addEventListener('click', (e) => {
                if (e.target.className !== 'remove-favorite') {
                    window.location.href = `pages/details.html?name=${pokemon.name}`;
                }
            });
            pokemonGrid.appendChild(pokemonCard);
        });
    }
};