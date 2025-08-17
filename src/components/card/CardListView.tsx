'use client';

import { useEffect, useState } from 'react';
import { getPokemons } from '../../../api/Api';
import type { Pokemon } from '../../types/types';
import { COUNT_KEY, LIMIT } from '../../utils/contstants';
import { CardView } from './CardView';
import { getCookieAction } from '../../../actions/get-cookie';
import { setCookieAction } from '../../../actions/set-cookie';

export function CardListView({
  search,
  currentPage,
}: {
  search: string;
  currentPage: number;
}) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const offset = (currentPage - 1) * LIMIT;
      const result = await getPokemons(search, offset);

      const oldCount = getCookieAction(COUNT_KEY);

      if (result.count && result.count !== Number(oldCount)) {
        setCookieAction(COUNT_KEY, result.count.toString());
      }

      if (result.pokemons) {
        setPokemons(
          Array.isArray(result.pokemons) ? result.pokemons : [result.pokemons]
        );
      }
    };

    fetchData();
  }, [search, currentPage]);

  return (
    <div className="flex flex-wrap justify-center gap-5 relative">
      {pokemons.map((pokemon) => (
        <CardView pokemon={pokemon} key={pokemon.name} />
      ))}
    </div>
  );
}
