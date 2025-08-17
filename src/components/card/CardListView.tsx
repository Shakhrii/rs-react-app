import { getPokemons } from '../../../api/Api';
import type { Pokemon } from '../../types/types';
import { LIMIT } from '../../utils/contstants';
import { CardView } from './CardView';

export async function CardListView({
  search,
  currentPage,
}: {
  search: string;
  currentPage: number;
}) {
  let pokemons = new Array<Pokemon>();
  const offset = (currentPage - 1) * LIMIT;
  const result = await getPokemons(search, offset);
  if (result) {
    pokemons = Array.isArray(result) ? result : [result];
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 relative">
      {pokemons?.map((pokemon) => (
        <CardView pokemon={pokemon} key={pokemon.name} />
      ))}
    </div>
  );
}
