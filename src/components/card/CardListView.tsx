'use client';

import { useEffect, useState } from 'react';
import { getPokemons } from '../../../api/Api';
import type { Pokemon } from '../../types/types';
import { COUNT_KEY, LIMIT } from '../../utils/contstants';
import { CardView } from './CardView';
import { setCookieAction } from '../../../actions/set-cookie';
import { ErrorView } from '../error/ErrorView';
import SpinnerView from '../spinner/SpinnerView';
import { useRouter } from 'next/navigation';

export function CardListView({
  search,
  currentPage,
}: {
  search: string;
  currentPage: number;
}) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setError(false);
    setLoading(true);
    try {
      const fetchData = async () => {
        const offset = (currentPage - 1) * LIMIT;
        const result = await getPokemons(search, offset);

        if (result.count) {
          setCookieAction(COUNT_KEY, result.count.toString());
        }

        if (result.pokemons) {
          setPokemons(
            Array.isArray(result.pokemons) ? result.pokemons : [result.pokemons]
          );
        }
      };

      fetchData().catch(() => {
        setError(true);
        setLoading(false);
        setCookieAction(COUNT_KEY, '0');
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage]);

  if (isLoading) {
    return <SpinnerView />;
  }

  if (error) {
    return (
      <ErrorView
        message={'No Results'}
        buttonText={'Reset pokemons'}
        clickHandler={() => {
          router.replace('/');
        }}
      />
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 relative">
      {pokemons.map((pokemon) => (
        <CardView pokemon={pokemon} key={pokemon.name} />
      ))}
    </div>
  );
}
