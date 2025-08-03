import type { CardListViewProps } from '../../types/types';
import { CardView } from './CardView';

export function CardListView({ pokemons }: CardListViewProps) {
  return (
    <div className="flex flex-wrap justify-center gap-5 relative">
      {pokemons?.map((pokemon) => (
        <CardView pokemon={pokemon} key={pokemon.name} />
      ))}
    </div>
  );
}
