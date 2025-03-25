// controllers/DetailsController.js
import { getPokemonDetails, getPokemonDescription } from '../models/PokemonModel.js';
import { addFavorite } from '../models/FavoritesModel.js';
import { renderPokemonDetails } from '../views/DetailsView.js';

const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');

async function loadPokemonDetails() {
    const pokemon = await getPokemonDetails(pokemonName);
    const description = await getPokemonDescription(pokemon.speciesUrl);
    pokemon.description = description;
    renderPokemonDetails(pokemon);
}

document.getElementById('add-to-favorites').addEventListener('click', () => addFavorite(pokemonName));
document.addEventListener('DOMContentLoaded', loadPokemonDetails);