/**
 * FavoritesModel.js - Gestion des Pokémon favoris dans le stockage local
 */

/**
 * Récupère la liste des Pokémon favoris.
 * @returns {Array<string>} - Liste des noms des Pokémon favoris.
 */
export function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

/**
 * Ajoute un Pokémon aux favoris s'il n'est pas déjà présent.
 * @param {string} pokemonName - Nom du Pokémon à ajouter.
 */
export function addFavorite(pokemonName) {
    const favorites = getFavorites();
    if (!favorites.includes(pokemonName)) {
        favorites.push(pokemonName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

/**
 * Supprime un Pokémon des favoris.
 * @param {string} pokemonName - Nom du Pokémon à supprimer.
 * @returns {Array<string>} - Liste mise à jour des favoris.
 */
export function removeFavorite(pokemonName) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav !== pokemonName);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return updatedFavorites;
}