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
  onSeacrhClick: (value: string) => void;
};
