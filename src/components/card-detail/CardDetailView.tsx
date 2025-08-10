import type { CardDetailViewProps } from '../../types/types';
import { SpinnerView } from '../spinner/SpinnerView';
import { ErrorView } from '../error/ErrorView';
import { CloseButton } from './close-button/CloseButton';
import { useTheme } from '../../hooks/useTheme';
import { useGetPokemonByNameQuery } from '../../store/slices/api/pokemonApi';
import { RefetchButton } from '../refetch/RefetchButton';

export function CardDetailView({ id }: CardDetailViewProps) {
  const { theme } = useTheme();
  const { data, isFetching, error, refetch } = useGetPokemonByNameQuery(id);

  return (
    <div className="w-100 flex justify-center relative">
      <CloseButton />
      {isFetching ? (
        <SpinnerView />
      ) : error ? (
        <ErrorView message="Something went wrong :(" buttonText={''} />
      ) : (
        <div className="flex flex-col items-center">
          <RefetchButton refetchHandler={refetch} />
          <div
            data-testid="card-item"
            className={`w-100 flex flex-col items-start shadow rounded-sm
           transition-colors duration-300 ease-in-out relative ${theme === 'dark' ? 'bg-[var(--bg-card-color-dark)]' : 'bg-white'}`}
          >
            <img
              className="w-full h-2/3"
              src={data?.avatar}
              alt="pokemon avatar"
            ></img>
            <div className="flex flex-col items-start p-5">
              <span data-testid="card-name" className="text-sm">
                <span className="font-bold">name: </span>
                {data?.name}
              </span>
              <span className="text-sm">
                <span className="font-bold">height: </span>
                {data?.height}
              </span>
              <span className="text-sm">
                <span className="font-bold">weight: </span>
                {data?.weight}
              </span>
              <span className="text-sm flex">
                <span className="font-bold">order: </span>
                {data?.order}
              </span>
              <span className="text-sm flex">
                <span className="font-bold">base experience: </span>
                {data?.baseExperience}
              </span>
              <span className="text-sm flex">
                <span className="font-bold">abilities: </span>
                {data?.abilities}
              </span>
              <span className="text-sm flex">
                <span className="font-bold">held items: </span>
                {data?.heldItems || 'None'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
