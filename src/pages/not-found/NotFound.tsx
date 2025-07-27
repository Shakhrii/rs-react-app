import { useNavigate } from 'react-router';
import { ErrorView } from '../../components/error/ErrorView';
import { PAGE_ROUTES } from '../../utils/contstants';

export function NotFound() {
  const navigate = useNavigate();

  function backToPokemons() {
    navigate(PAGE_ROUTES.POKEMONS);
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
