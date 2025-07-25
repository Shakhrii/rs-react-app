import type {
  Pokemon,
  PokemonDetailResponse,
  PokemonsResponse,
} from '../types/types';
import { COUNT_KEY, LIMIT, saveToLS, SERVER_URL } from '../utils/utils';

export async function getPokemons(
  searchTerm: string,
  offset: number
): Promise<Pokemon[] | Pokemon> {
  if (searchTerm) {
    return getPokemon(searchTerm);
  } else {
    const pokemonResponse = await fetchPokemons(SERVER_URL, offset);
    const pokemonsDetailResponse = await Promise.all(
      pokemonResponse.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const resDetail = (await res.json()) as PokemonDetailResponse;
        return resDetail;
      })
    );

    return parsePokemons(pokemonsDetailResponse);
  }
}

async function getPokemon(searchTerm: string) {
  const res = (await fetchPokemon(
    `${SERVER_URL}/${searchTerm}`
  )) as PokemonDetailResponse;
  return parsePokemon(res);
}

function parsePokemons(pokemonResponses: PokemonDetailResponse[]): Pokemon[] {
  const pokemons: Pokemon[] = pokemonResponses.map((item) =>
    parsePokemon(item)
  );
  return pokemons;
}

function parsePokemon(pokemonsDetailResponse: PokemonDetailResponse): Pokemon {
  const { sprites, abilities, ...rest } = pokemonsDetailResponse;
  return {
    ...rest,
    avatar: sprites.front_default,
    abilities: abilities.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.ability.name + ' ',
      ''
    ),
  };
}

async function fetchPokemons(
  url: string,
  offset: number
): Promise<PokemonsResponse[]> {
  const response = await fetch(`${url}?limit=${LIMIT}&offset=${offset}`);
  if (response.ok) {
    const resultResponse = await response.json();
    saveToLS(COUNT_KEY, resultResponse.count);
    return resultResponse.results;
  } else {
    throw Error(response.statusText);
  }
}

async function fetchPokemon(url: string): Promise<PokemonDetailResponse> {
  const response = await fetch(url);
  if (response.ok) {
    const resultResponse = await response.json();
    return resultResponse;
  } else {
    throw Error(response.statusText);
  }
}
