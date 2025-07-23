import { useNavigate } from 'react-router';
import { ErrorView } from '../../components/error/ErrorView';
import { PageRoutes } from '../../utils/pages-routes';

export function NotFound() {
  const navigate = useNavigate();

  function backToPokemons() {
    navigate(PageRoutes.POKEMONS);
  }
  return (
    <div className="flex items-center justify-center">
      <ErrorView
        message="Page not found :("
        buttonText="Back to Pokemons"
        clickHandler={() => backToPokemons()}
      />
    </div>
  );
}
