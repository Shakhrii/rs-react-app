import { useEffect, useState } from 'react';
import { getPokemon as fetchdata } from '../../api/Api';
import type { CardDetailViewProps, Pokemon } from '../../types/types';
import { SpinnerView } from '../spinner/SpinnerView';
import { ErrorView } from '../error/ErrorView';
import { CloseButton } from './close-button/CloseButton';

export function CardDetailView({ id }: CardDetailViewProps) {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getPokemon() {
    setLoading(true);
    setError(false);

    try {
      const pokemon = await fetchdata(id);
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

  return (
    <div className="w-100 h-full flex justify-center">
      {isLoading ? (
        <SpinnerView />
      ) : error ? (
        <ErrorView message="Something went wrong :(" buttonText={''} />
      ) : (
        <div
          data-testid="card-item"
          className="w-100 flex flex-col items-start shadow rounded-sm transition-colors duration-300 ease-in-out bg-white relative"
        >
          <CloseButton />
          <img
            className="w-full h-2/3"
            src={pokemon.avatar}
            alt="pokemon avatar"
          ></img>
          <div className="flex flex-col items-start p-5">
            <span data-testid="card-name" className="text-sm">
              <span className="font-bold">name: </span>
              {pokemon.name}
            </span>
            <span className="text-sm">
              <span className="font-bold">height: </span>
              {pokemon.height}
            </span>
            <span className="text-sm">
              <span className="font-bold">weight: </span>
              {pokemon.weight}
            </span>
            <span className="text-sm flex">
              <span className="font-bold">order: </span>
              {pokemon.order}
            </span>
            <span className="text-sm flex">
              <span className="font-bold">base experience: </span>
              {pokemon.baseExperience}
            </span>
            <span className="text-sm flex">
              <span className="font-bold">abilities: </span>
              {pokemon.abilities}
            </span>
            <span className="text-sm flex">
              <span className="font-bold">held items: </span>
              {pokemon.heldItems || 'None'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
