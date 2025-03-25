// views/DetailsView.js
export function renderPokemonDetails(pokemon) {
    document.getElementById('pokemon-name').textContent = pokemon.name;
    document.getElementById('pokemon-image').src = pokemon.image;
    document.getElementById('pokemon-type').textContent = pokemon.types.join(', ');
    document.getElementById('pokemon-description').textContent = pokemon.description;
    document.getElementById('hp').value = pokemon.hp;
    document.getElementById('attack').value = pokemon.attack;
}
