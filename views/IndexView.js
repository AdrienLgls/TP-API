// views/IndexView.js
export function renderSuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    suggestions.forEach(p => {
        const suggestion = document.createElement('div');
        suggestion.textContent = p.name;
        suggestion.addEventListener('click', () => {
            document.getElementById('search').value = p.name;
            suggestionsDiv.style.display = 'none';
            window.location.href = `/pages/evolution.html?name=${p.name}`;
        });
        suggestionsDiv.appendChild(suggestion);
    });
    suggestionsDiv.style.display = suggestions.length > 0 ? 'block' : 'none';
}

export function renderFavorites(favorites) {
    const pokemonGrid = document.querySelector('.pokemon-grid');
    pokemonGrid.innerHTML = favorites.length === 0 ? '<p>Aucun favori enregistré.</p>' : '';
    favorites.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p>${pokemon.name}</p>
            <button class="remove-favorite">Supprimer des favoris</button>
        `;
        pokemonCard.querySelector('.remove-favorite').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Voulez-vous vraiment supprimer ${pokemon.name} des favoris ?`)) {
                window.dispatchEvent(new CustomEvent('removeFavorite', { detail: pokemon.name }));
            }
        });
        pokemonCard.addEventListener('click', (e) => {
            if (e.target.className !== 'remove-favorite') {
                window.location.href = `/pages/details.html?name=${pokemon.name}`;
            }
        });
        pokemonGrid.appendChild(pokemonCard);
    });
}