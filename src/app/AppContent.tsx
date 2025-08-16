import { Routes, Route, Navigate } from 'react-router';
import { About } from '../pages/about/About';
import { NotFound } from '../pages/not-found/NotFound';
import { Pokemon } from '../pages/pokemon/Pokemon';
import Pokemons from '../pages/pokemons/Pokemons';
import { PAGE_ROUTES } from '../utils/contstants';

export const AppContent = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={PAGE_ROUTES.POKEMONS} replace />}
        />
        <Route path={PAGE_ROUTES.POKEMONS} element={<Pokemons />}>
          <Route path={PAGE_ROUTES.POKEMON} element={<Pokemon />}></Route>
        </Route>
        <Route path={PAGE_ROUTES.ABOUT} element={<About />}></Route>
        <Route path={PAGE_ROUTES.NOT_FOUND} element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
