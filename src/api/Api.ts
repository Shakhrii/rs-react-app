import type {
  Pokemon,
  PokemonDetailResponse,
  PokemonsResponse,
} from '../types/types';
import { COUNT_KEY, LIMIT, SERVER_URL } from '../utils/contstants';
import { saveToLS } from '../utils/utils';

export async function getPokemons(
  searchTerm: string,
  offset: number
): Promise<Pokemon[] | Pokemon> {
  if (searchTerm) {
    saveToLS(COUNT_KEY, '1');
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

export async function getPokemon(searchTerm: string) {
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
  const { sprites, abilities, held_items, base_experience, ...rest } =
    pokemonsDetailResponse;
  return {
    ...rest,
    avatar: sprites.front_default,
    baseExperience: base_experience,
    abilities: abilities.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.ability.name + ' ',
      ''
    ),
    heldItems:
      held_items.length > 0
        ? held_items.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.item.name + ' ',
            ''
          )
        : '',
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
