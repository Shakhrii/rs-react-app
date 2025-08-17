import {
  Pokemon,
  PokemonDetailResponse,
  PokemonsResponse,
} from '../src/types/types';
import { SERVER_URL, LIMIT } from '../src/utils/contstants';
let count = 0;

export async function getPokemons(
  searchTerm: string,
  offset: number
): Promise<
  { pokemons: Pokemon[]; count: number } | { pokemons: Pokemon; count: number }
> {
  if (searchTerm) {
    count = 1;
    const pokemon = await getPokemon(searchTerm);
    return { pokemons: pokemon, count };
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
  console.log(res);
  return parsePokemon(res);
}

function parsePokemons(pokemonResponses: PokemonDetailResponse[]): {
  pokemons: Pokemon[];
  count: number;
} {
  const pokemons: Pokemon[] = pokemonResponses.map((item) =>
    parsePokemon(item)
  );
  return { pokemons, count };
}

function parsePokemon(pokemonsDetailResponse: PokemonDetailResponse): Pokemon {
  const {
    id,
    name,
    height,
    weight,
    order,
    sprites,
    abilities,
    held_items,
    base_experience,
  } = pokemonsDetailResponse;
  return {
    id,
    name,
    height,
    weight,
    order,
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
    count = resultResponse.count || 1;
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
