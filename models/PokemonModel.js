/**
 * PokemonModel.js - Gestion des données Pokémon via l'API PokeAPI
 */

/**
 * Récupère les détails d'un Pokémon à partir de son nom.
 * @param {string} pokemonName - Nom du Pokémon.
 * @returns {Promise<Object>} - Détails du Pokémon (nom, image, types, stats, URL de l'espèce).
 */
export async function getPokemonDetails(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error('Pokémon non trouvé');
        const pokemon = await response.json();
        return {
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            types: pokemon.types.map(t => t.type.name),
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            speciesUrl: pokemon.species.url
        };
    } catch (error) {
        console.error(`Erreur lors de la récupération des détails de ${pokemonName} :`, error);
        throw error;
    }
}

/**
 * Récupère la description d'un Pokémon à partir de son URL d'espèce.
 * @param {string} speciesUrl - URL de l'espèce du Pokémon.
 * @returns {Promise<string>} - Description en anglais ou message par défaut.
 */
export async function getPokemonDescription(speciesUrl) {
    try {
        const response = await fetch(speciesUrl);
        if (!response.ok) throw new Error('Espèce non trouvée');
        const species = await response.json();
        const description = species.flavor_text_entries.find(entry => entry.language.name === 'en');
        return description ? description.flavor_text : 'No description available.';
    } catch (error) {
        console.error('Erreur lors de la récupération de la description :', error);
        throw error;
    }
}

/**
 * Récupère des suggestions de Pokémon basées sur une requête.
 * @param {string} query - Requête de recherche.
 * @returns {Promise<Array>} - Liste des Pokémon correspondant à la requête.
 */
export async function getPokemonSuggestions(query) {
    if (query.length < 2) return [];
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des suggestions');
        const data = await response.json();
        return data.results.filter(p => p.name.startsWith(query.toLowerCase()));
    } catch (error) {
        console.error('Erreur lors de la récupération des suggestions :', error);
        throw error;
    }
}

/**
 * Récupère la chaîne d'évolution d'un Pokémon.
 * @param {string} pokemonName - Nom du Pokémon.
 * @returns {Promise<Object>} - Données brutes de la chaîne d'évolution.
 */
export async function getEvolutionChain(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        if (!response.ok) throw new Error('Espèce non trouvée');
        const species = await response.json();
        const evolutionChainUrl = species.evolution_chain.url;
        const evolutionResponse = await fetch(evolutionChainUrl);
        if (!evolutionResponse.ok) throw new Error('Chaîne d’évolution non trouvée');
        return await evolutionResponse.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération de la chaîne d’évolution de ${pokemonName} :`, error);
        throw error;
    }
}

/**
 * Analyse la chaîne d'évolution et retourne une liste d'évolutions avec leurs détails.
 * @param {Object} chain - Chaîne d'évolution brute.
 * @returns {Promise<Array>} - Liste des évolutions avec nom, image, et conditions.
 */
export async function getEvolutionDetails(chain) {
    const evolutions = [];
    async function traverseChain(currentChain) {
        const pokemonName = currentChain.species.name;
        const pokemonDetails = await getPokemonDetails(pokemonName);
        const evoDetails = currentChain.evolution_details?.[0] || {};
        evolutions.push({
            name: pokemonName,
            image: pokemonDetails.image,
            level: evoDetails.min_level || null,
            item: evoDetails.item ? evoDetails.item.name : null,
            location: evoDetails.location ? evoDetails.location.name : null
        });
        for (const next of currentChain.evolves_to) {
            await traverseChain(next);
        }
    }
    await traverseChain(chain);
    return evolutions;
}