'use client';

import type { CardDetailViewProps, Pokemon } from '../../types/types';
import { SpinnerView } from '../spinner/SpinnerView';
import { ErrorView } from '../error/ErrorView';
import { CloseButton } from './close-button/CloseButton';
import { useTheme } from '../../hooks/useTheme';
// import { useGetPokemonByNameQuery } from '../../store/slices/api/pokemonApi';
import { RefetchButton } from '../refetch/RefetchButton';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPokemon as fetchData } from '../../../api/Api';

export function CardDetailView({ id }: CardDetailViewProps) {
  const { theme } = useTheme();
  const [pokemon, setPokemon] = useState<Pokemon>();
    async function getPokemon() {
    // setLoading(true);
    // setError(false);

    try {
      const pokemon = await fetchData(id);
      setPokemon(pokemon);
    } catch {
      // setError(true);
    } finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    getPokemon();
  }, [id]);

  return (
    <div className="w-100 flex justify-center relative">
      {/* {isFetching ? (
        <SpinnerView />
      ) : error ? (
        <ErrorView message="Something went wrong :(" buttonText={''} />
      ) : (
        <div className="flex flex-col items-center">
          <RefetchButton refetchHandler={refetch} /> */}
          <div
            data-testid="card-item"
            className={`w-100 flex flex-col items-start shadow rounded-sm
           transition-colors duration-300 ease-in-out relative ${theme === 'dark' ? 'bg-[var(--bg-card-color-dark)]' : 'bg-white'}`}
          >
            <Image
              className="w-full h-2/3"
              width={400}
              height={386}
              src={pokemon?.avatar || ''}
              alt="pokemon avatar"
            />
            <div className="flex flex-col items-start p-5">
              <span data-testid="card-name" className="text-sm">
                <span className="font-bold">name: </span>
                {pokemon?.name}
              </span>
              <span className="text-sm">
                <span className="font-bold">height: </span>
                {pokemon?.height}
              </span>
              <span className="text-sm">
                <span className="font-bold">weight: </span>
                {pokemon?.weight}
              </span>
              <span className="text-sm flex">
                <span className="font-bold">order: </span>
                {pokemon?.order}
              </span>
              <span className="text-sm flex">
                <span className="font-bold">base experience: </span>
                {pokemon?.baseExperience}
              </span>
              <span className="text-sm flex">
                <span className="font-bold">abilities: </span>
                {pokemon?.abilities}
              </span>
              <span className="text-sm flex">
                <span className="font-bold">held items: </span>
                {pokemon?.heldItems || 'None'}
              </span>
            </div>
          </div>
        </div>
      // )}
    // </div>
  );
}
