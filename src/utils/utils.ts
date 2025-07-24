export const SERVER_URL = 'https://pokeapi.co/api/v2/pokemon';
export const LIMIT = 20;

export const COUNT_KEY = 'count';
export const SEARCH_TERM_KEY = 'search_term';

export function saveToLS(key: string, value: string) {
  console.log('TO LS value = ' + value);
  localStorage.setItem(key, value);
}

export function getFromLS(key: string): string {
  console.log('FROM LS value = ' + localStorage.getItem(key) || '');
  const value = localStorage.getItem(key) || '';
  return value;
}
