import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Pokemons from '../pages/pokemons/Pokemons';
import { PageRoutes } from '../utils/pages-routes';
import './App.css';
import { NotFound } from '../pages/not-found/NotFound';
import { About } from '../pages/about/About';
import HeaderView from '../components/header/HeaderView';

export default function App() {
  return (
    <BrowserRouter>
      <HeaderView />
      <Routes>
        <Route path="/" element={<Navigate to="/pokemons" replace />} />
        <Route path={PageRoutes.POKEMONS} element={<Pokemons />}></Route>
        <Route path={PageRoutes.ABOUT} element={<About />}></Route>
        <Route path={PageRoutes.NOT_FOUND} element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
