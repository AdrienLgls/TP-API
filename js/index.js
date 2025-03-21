const searchInput = document.getElementById('search');
const suggestionsDiv = document.getElementById('suggestions');
const popularPokemonSection = document.getElementById('popular-pokemon');

// Fonction pour obtenir les favoris depuis le LocalStorage
function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Fonction pour supprimer un favori
function removeFavorite(pokemonName) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav !== pokemonName);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}

// Fonction pour charger et afficher les favoris
async function loadFavorites() {
    const favorites = getFavorites();
    popularPokemonSection.innerHTML = ''; // Vide la section avant de la remplir

    // Si aucun favori n'est présent
    if (favorites.length === 0) {
        popularPokemonSection.innerHTML = '<p>Aucun favori enregistré.</p>';
        return;
    }

    // Pour chaque favori, créer une carte
    for (const name of favorites) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = await response.json();
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>${pokemon.name}</p>
            <button class="remove-favorite">Supprimer des favoris</button>
        `;

        // Rendre la carte cliquable pour rediriger vers evolution.html
        pokemonCard.addEventListener('click', (e) => {
            // Vérifier que le clic n'est pas sur le bouton de suppression
            if (e.target.className !== 'remove-favorite') {
                window.location.href = `/html/evolution.html?name=${pokemon.name}`;
            }
        });

        // Ajouter un événement pour supprimer le favori
        const removeButton = pokemonCard.querySelector('.remove-favorite');
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche la redirection lors du clic sur le bouton
            if (confirm(`Voulez-vous vraiment supprimer ${pokemon.name} des favoris ?`)) {
                removeFavorite(pokemon.name);
                loadFavorites(); // Recharge la liste après suppression
            }
        });

        popularPokemonSection.appendChild(pokemonCard);
    }
}

// Fonction pour charger les suggestions (inchangée)
async function loadSuggestions(query) {
    if (query.length < 3) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    const data = await response.json();
    const filteredPokemon = data.results.filter(p => p.name.startsWith(query.toLowerCase()));
    suggestionsDiv.innerHTML = '';
    filteredPokemon.forEach(p => {
        const suggestion = document.createElement('div');
        suggestion.textContent = p.name;
        suggestion.addEventListener('click', () => {
            searchInput.value = p.name;
            suggestionsDiv.style.display = 'none';
            window.location.href = `/html/evolution.html?name=${p.name}`;
        });
        suggestionsDiv.appendChild(suggestion);
    });
    suggestionsDiv.style.display = 'block';
}

// Écouteurs d'événements
searchInput.addEventListener('input', (e) => loadSuggestions(e.target.value));
document.addEventListener('DOMContentLoaded', loadFavorites); // Charge les favoris au lieu des populaires