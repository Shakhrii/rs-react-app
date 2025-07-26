import { useEffect, useState } from 'react';
import { CardListView } from '../../components/card/CardListView';
import ErrorBoundary from '../../components/error/ErrorBoundary';
import { ErrorView } from '../../components/error/ErrorView';
import MainView from '../../components/main/MainView';
import { SearchView } from '../../components/search/SearchView';
import { SpinnerView } from '../../components/spinner/SpinnerView';
import type { Pokemon } from '../../types/types';
import { getFromLS, saveToLS } from '../../utils/utils';
import { getPokemons as fetchData } from '../../api/Api';
import { PaginationView } from '../../components/pagination/PaginationView';
import { COUNT_KEY, LIMIT, SEARCH_TERM_KEY } from '../../utils/contstants';

export default function Pokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[] | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>(
    getFromLS(SEARCH_TERM_KEY)
  );
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getPokemons();
  }, [searchTerm, offset]);

  async function getPokemons(): Promise<Pokemon[]> {
    skipError();
    setLoading(true);

    let result: Pokemon[] = [];

    try {
      const res = await fetchData(searchTerm, offset);
      if (res && !Array.isArray(res)) {
        result = [res];
      } else {
        result = res;
      }
    } catch {
      showError('No results...');
      return [];
    } finally {
      setPokemons(result);
      setLoading(false);
      const count = Number(getFromLS(COUNT_KEY));
      setTotalCount(count);
    }
    return result;
  }

  function changeSearchTermHandler(value: string) {
    saveToLS(SEARCH_TERM_KEY, value);
    setSearchTerm(value);
  }

  function resetSearch() {
    changeSearchTermHandler('');
  }

  function handlePaginationPageChanged(offs: number) {
    setOffset(offs);
  }

  function showError(message: string) {
    setError(true);
    setMessageError(message);
  }

  function skipError() {
    setError(false);
    setMessageError('');
  }

  return (
    <>
      <div className="flex flex-col gap-15 items-center relative">
        <ErrorBoundary>
          <SearchView
            value={searchTerm}
            onSearchClick={(value) => {
              changeSearchTermHandler(value);
            }}
          />
          <MainView>
            <div className="flex flex-col gap-10 items-center justify-center">
              {isLoading ? (
                <SpinnerView />
              ) : error ? (
                <ErrorView
                  message={messageError}
                  buttonText="Reset Search"
                  clickHandler={() => resetSearch()}
                />
              ) : (
                <>
                  <CardListView pokemons={pokemons} />
                </>
              )}
              <PaginationView
                isVisible={!isLoading && !error}
                count={totalCount}
                limit={LIMIT}
                onPageChanged={(offset) => handlePaginationPageChanged(offset)}
              />
            </div>
          </MainView>
        </ErrorBoundary>
      </div>
    </>
  );
}
