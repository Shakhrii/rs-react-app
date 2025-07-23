import type { ReactNode } from 'react';

export type Pokemon = {
  id: number;
  name: string;
  avatar: string;
  weight: number;
  height: number;
  abilities: string;
};

export type SpritesResponse = {
  front_default: string;
};

export type AbilityResponse = {
  name: string;
};

export type AbilitiesResponse = {
  ability: AbilityResponse;
};

export type PokemonDetailResponse = {
  id: number;
  name: string;
  sprites: SpritesResponse;
  weight: number;
  height: number;
  abilities: AbilitiesResponse[];
};

export type PokemonsResponse = {
  name: string;
  url: string;
};

export type SearchViewProps = {
  value: string | undefined;
  onSearchClick: (value: string) => void;
};

export type ErrorViewProps = {
  message: string | undefined;
  buttonText: string;
  clickHandler?: () => void;
};

export type CardViewProps = {
  pokemon: Pokemon;
};

export type CardListViewProps = {
  pokemons: Pokemon[] | undefined;
};

export type HeaderViewProps = {
  children?: ReactNode;
};

export type MainViewProps = {
  children?: ReactNode;
};
