import shuffle from 'lodash.shuffle';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_IMAGE_API = 'https://pokeres.bastionbot.org/images/pokemon/';

export let loading = false;

function createPokemonsList() {
  loading = true;
  let pokemonList = [];
  for (let i = 0; i < 32; i++) {
    const id = Math.round(Math.random() * 874);
    const name = getPokemonName(id);
    pokemonList.push({ id, name });
  }
  loading = false;
  return pokemonList;
}

async function getPokemonName(id) {
  const response = await fetch(`${POKEMON_API}${id}`);
  const data = await response.json();
  let name = data.name;
  return name;
}

export function getPokemonImage(pokemon) {
  return `${POKEMON_IMAGE_API}${pokemon}.png`;
}

export function getPokemons() {
  const pokemon = createPokemonsList();
  const doublePokemon = [...pokemon, ...pokemon];
  const pokemons = shuffle(doublePokemon);
  return pokemons;
}
