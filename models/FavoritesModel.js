// models/FavoritesModel.js
export function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(pokemonName) {
    const favorites = getFavorites();
    if (!favorites.includes(pokemonName)) {
        favorites.push(pokemonName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

export function removeFavorite(pokemonName) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav !== pokemonName);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return updatedFavorites;
}