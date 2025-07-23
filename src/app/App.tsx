import { BrowserRouter, Route, Routes } from 'react-router';
import Pokemons from '../pages/pokemons/Pokemons';
import { PageRoutes } from '../utils/pages-routes';
import './App.css';
import { NotFound } from '../pages/not-found/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageRoutes.POKEMONS} element={<Pokemons />}></Route>
        <Route path={PageRoutes.NOT_FOUND} element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
