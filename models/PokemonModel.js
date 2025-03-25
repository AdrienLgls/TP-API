// models/PokemonModel.js
export async function getPokemonDetails(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = await response.json();
    return {
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        types: pokemon.types.map(t => t.type.name),
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        speciesUrl: pokemon.species.url
    };
}

export async function getPokemonDescription(speciesUrl) {
    const response = await fetch(speciesUrl);
    const species = await response.json();
    const description = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    return description ? description.flavor_text : 'Pas de description disponible.';
}

export async function getPokemonSuggestions(query) {
    if (query.length < 3) return [];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    const data = await response.json();
    return data.results.filter(p => p.name.startsWith(query.toLowerCase()));
}

export async function getEvolutionChain(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    const species = await response.json();
    const evolutionChainUrl = species.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionChainUrl);
    return await evolutionResponse.json();
}