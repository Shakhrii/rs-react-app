import { getCookieAction } from '../../../actions/get-cookie';
import { CardListView } from '../../components/card/CardListView';
import { Flyout } from '../../components/flyout/Flyout';
import MainView from '../../components/main/MainView';
import { PokemonModal } from '../../components/modal/PokemonModal';
import { PaginationView } from '../../components/pagination/PaginationView';
import { SearchView } from '../../components/search/SearchView';
import { COUNT_KEY, LIMIT } from '../../utils/contstants';

interface PokemonsPageProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

export default async function Pokemons({ searchParams }: PokemonsPageProps) {
  const sParams = await searchParams;
  const search = sParams?.search || '';
  const page = Number(sParams.page) || 1;
  const pages = await getCookieAction(COUNT_KEY);

  return (
    <>
      <div className="flex flex-col gap-15 items-center relative">
        <div className="flex flex-row gap-10 w-full items-center justify-center">
          <SearchView />
        </div>
        <MainView>
          <div className="flex flex-col gap-10 items-center justify-center flex-2/3">
            <div className="flex flex-col items-center">
              <CardListView search={search} currentPage={page} />
            </div>
            <PaginationView
              isVisible={true}
              count={Number(pages)}
              limit={LIMIT}
            />
            <Flyout />
            <PokemonModal />
          </div>
        </MainView>
      </div>
    </>
  );
}
