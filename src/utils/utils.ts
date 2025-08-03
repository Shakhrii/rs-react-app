import type { Pokemon } from '../types/types';

export function saveToLS(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getFromLS(key: string): string {
  const value = localStorage.getItem(key) || '';
  return value;
}

export function convertToCSV(pokemons: Pokemon[]): string {
  const titles = Object.keys(pokemons[0]);
  const rows = pokemons.map((pokemon) => Object.values(pokemon).join(','));
  const textFile = [titles.join(','), ...rows].join('\n');

  return textFile;
}
