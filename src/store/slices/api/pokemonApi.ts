import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../../utils/contstants';
import type {
  Pokemon,
  Pokemons,
  PokemonDetailResponse,
  PokemonListResult,
} from '../../../types/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  tagTypes: ['Pokemon', 'PokemonList'],
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => `${name}`,
      providesTags: ['Pokemon'],
      transformResponse: (response: PokemonDetailResponse) => {
        return {
          id: response.id,
          name: response.name,
          height: response.height,
          weight: response.weight,
          order: response.order,
          avatar: response.sprites.front_default,
          baseExperience: response.base_experience,
          abilities: response.abilities.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.ability.name + ' ',
            ''
          ),
          heldItems:
            response.held_items.length > 0
              ? response.held_items.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.item.name + ' ',
                  ''
                )
              : '',
        } as Pokemon;
      },
    }),
    getPokemons: build.query<
      Pokemons,
      { limit: number; offset: number; refetch: boolean }
    >({
      async queryFn({ limit, offset, refetch }, { dispatch }, _, fetchWithBQ) {
        const pokemonResult = await fetchWithBQ(
          `?limit=${limit}&offset=${offset}`
        );
        if (pokemonResult.error) {
          return { error: pokemonResult.error };
        } else {
          const results = (pokemonResult.data as PokemonListResult).results;
          const count = (pokemonResult.data as { count: number }).count;

          const detailPromises: Array<Promise<Pokemon>> = results.map(
            async (pokemon) => {
              const res = await dispatch(
                pokemonApi.endpoints.getPokemonByName.initiate(pokemon.name, {
                  forceRefetch: refetch,
                })
              );
              return res.data as Pokemon;
            }
          );

          const detailResults = await Promise.all(detailPromises);

          return { data: { pokemons: detailResults, count: count } };
        }
      },
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useLazyGetPokemonByNameQuery,
  useGetPokemonsQuery,
  useLazyGetPokemonsQuery,
} = pokemonApi;
