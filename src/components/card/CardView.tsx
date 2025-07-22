import type { CardViewProps } from '../../types/types';

export function CardView({ pokemon }: CardViewProps) {
  return (
    <div
      data-testid="card-item"
      className="w-50 flex flex-col items-start shadow hover:bg-amber-500/50 rounded-sm transition-colors duration-300 ease-in-out active:bg-amber-500 bg-white"
    >
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
          <span className="font-bold">abilities: </span>
          {pokemon.abilities}
        </span>
      </div>
    </div>
  );
}
