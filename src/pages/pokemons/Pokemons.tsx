import { useEffect, useState } from 'react';
import { CardListView } from '../../components/card/CardListView';
import ErrorBoundary from '../../components/error/ErrorBoundary';
import { ErrorView } from '../../components/error/ErrorView';
import MainView from '../../components/main/MainView';
import { SearchView } from '../../components/search/SearchView';
import { SpinnerView } from '../../components/spinner/SpinnerView';
import type { Pokemon } from '../../types/types';
import { PaginationView } from '../../components/pagination/PaginationView';
import { LIMIT, SEARCH_TERM_KEY } from '../../utils/contstants';
import { Outlet, useLocation } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Flyout } from '../../components/flyout/Flyout';
import {
  useLazyGetPokemonByNameQuery,
  useLazyGetPokemonsQuery,
} from '../../store/slices/api/pokemonApi';
import { RefetchButton } from '../../components/refetch/RefetchButton';
import './Pokemons.css';

export default function Pokemons() {
  const [pokemonList, setPokemonList] = useState<Pokemon[] | undefined>(
    undefined
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useLocalStorage('', SEARCH_TERM_KEY);
  const [isRefetch, setRefetch] = useState(false);
  const [triggerPokemons, { isFetching: isFetchPokemons }] =
    useLazyGetPokemonsQuery();
  const [triggerPokemon, { isFetching: isFetchPokemon }] =
    useLazyGetPokemonByNameQuery();
  const location = useLocation();

  useEffect(() => {
    const hasDetail = location.pathname.includes('/pokemons/');
    setIsDetailOpen(hasDetail);
  }, [location]);

  useEffect(() => {
    updatePokemons();
  }, [searchTerm, offset, isRefetch]);

  async function updatePokemons(): Promise<Pokemon[]> {
    skipError();

    let result: Pokemon[] = [];
    let count = 0;

    try {
      if (searchTerm) {
        await triggerPokemon(searchTerm, !isRefetch)
          .unwrap()
          .then((data) => {
            result = [data];
            count = 1;
          })
          .catch(() => {
            showError('No Results');
            result = [];
            count = 0;
          });
      } else {
        await triggerPokemons(
          { limit: LIMIT, offset, refetch: isRefetch },
          !isRefetch
        )
          .unwrap()
          .then((data) => {
            result = data.pokemons;
            count = data.count;
          })
          .catch(() => {
            showError('No Results');
            result = [];
            count = 0;
          });
      }
    } catch (error) {
      console.log(error);
      showError('No results...');
      return [];
    } finally {
      setPokemonList(result);
      setTotalCount(count);
      if (isRefetch) {
        setRefetch(false);
      }
    }
    return result;
  }

  function changeSearchTermHandler(value: string) {
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

  async function refetch() {
    setRefetch(true);
  }

  return (
    <>
      <div className="flex flex-col gap-15 items-center relative">
        <ErrorBoundary>
          <div className="flex flex-row gap-10 w-full items-center justify-center">
            <SearchView
              value={searchTerm}
              onSearchClick={(value) => {
                changeSearchTermHandler(value);
              }}
            />
          </div>
          <MainView>
            <div className="flex flex-col gap-10 items-center justify-center">
              <PaginationView
                isVisible={!(isFetchPokemon || isFetchPokemons) && !error}
                count={totalCount}
                limit={LIMIT}
                onPageChanged={(offset) => handlePaginationPageChanged(offset)}
              />
              {isFetchPokemon || isFetchPokemons ? (
                <SpinnerView />
              ) : error ? (
                <ErrorView
                  message={messageError}
                  buttonText="Reset Search"
                  clickHandler={() => resetSearch()}
                />
              ) : (
                <div className="flex flex-col items-center">
                  <RefetchButton refetchHandler={refetch} />
                  <div
                    className={`cards-container ${isDetailOpen ? 'shift-left' : ''}`}
                  >
                    <CardListView pokemons={pokemonList} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex">
              <div
                className={`detail-container ${isDetailOpen ? 'slide-in' : ''}`}
              >
                <Outlet />
              </div>
            </div>
            <Flyout />
          </MainView>
        </ErrorBoundary>
      </div>
    </>
  );
}
