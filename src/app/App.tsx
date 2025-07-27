import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Pokemons from '../pages/pokemons/Pokemons';
import './App.css';
import { NotFound } from '../pages/not-found/NotFound';
import { About } from '../pages/about/About';
import HeaderView from '../components/header/HeaderView';
import { PAGE_ROUTES } from '../utils/contstants';
import { Pokemon } from '../pages/pokemon/Pokemon';

export default function App() {
  return (
    <BrowserRouter>
      <HeaderView />
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
    </BrowserRouter>
  );
}
