'use client';

import type { CardDetailViewProps, Pokemon } from '../../types/types';
import { useTheme } from '../../hooks/useTheme';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPokemon as fetchData } from '../../../api/Api';
import { useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '../../utils/contstants';
import { ErrorView } from '../error/ErrorView';
import SpinnerView from '../spinner/SpinnerView';

export function CardDetailView({ id }: CardDetailViewProps) {
  const { theme } = useTheme();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  
  async function getPokemon() {
    setLoading(true);
    setError(false);

    try {
      const pokemon = await fetchData(id);
      setPokemon(pokemon);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPokemon();
  }, [id]);

  if (isLoading) {
      return <SpinnerView />;
    }
  
    if (error) {
      return (
        <ErrorView
          message={'Not results'}
          buttonText={''}
        />
      );
    }

  return (
    <div className="w-100 flex justify-center relative">
      <div
        data-testid="card-item"
        className={`w-100 flex flex-col items-start shadow rounded-sm
        transition-colors duration-300 ease-in-out relative ${theme === 'dark' ? 'bg-[var(--bg-card-color-dark)]' : 'bg-white'}`}
      >
        {pokemon?.avatar ? (
          <Image
          className="w-full h-2/3"
          width={400}
          height={386}
          src={pokemon.avatar}
          alt="pokemon avatar"
        />
        ) : null}
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
  );
}
