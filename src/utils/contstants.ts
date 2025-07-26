export const SERVER_URL = 'https://pokeapi.co/api/v2/pokemon';
export const LIMIT = 20;

export const COUNT_KEY = 'count';
export const SEARCH_TERM_KEY = 'search_term';

export const enum PAGE_ROUTES {
  POKEMONS = '/pokemons/',
  POKEMON = ':detailsId',
  ABOUT = '/about',
  NOT_FOUND = '*',
}

export const MENU_ITEMS = [
  { value: 'Pokemons', path: PAGE_ROUTES.POKEMONS },
  { value: 'About', path: PAGE_ROUTES.ABOUT },
];
