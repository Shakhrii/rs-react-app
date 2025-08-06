import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../../utils/contstants';
import type {
  Pokemon,
  PokemonDetailResponse,
  PokemonListResult,
} from '../../../types/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  tagTypes: ['Pokemon'],
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
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
    getPokemons: build.query<Pokemon[], { limit: number; offset: number }>({
      async queryFn(
        { limit, offset },
        { dispatch },
        extraOptions,
        fetchWithBQ
      ) {
        const pokemonResult = await fetchWithBQ(
          `?limit=${limit}&offset=${offset}`
        );
        if (pokemonResult.error) {
          return { error: pokemonResult.error as FetchBaseQueryError };
        } else {
          const results = (pokemonResult.data as PokemonListResult).results;
          const detailPromises: Array<Promise<Pokemon>> = results.map(
            (pokemon) => {
              return dispatch(
                pokemonApi.endpoints.getPokemonByName.initiate(pokemon.name)
              ).then((res) => res.data as Pokemon);
            }
          );

          const detailResults = await Promise.all(detailPromises);

          return { data: detailResults };
        }
      },
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
