export type Pokemon = {
  id: number;
  name: string;
  avatar: string;
};

export type SpritesResponse = {
  front_default: string;
};

export type PokemonDetailResponse = {
  id: number;
  name: string;
  sprites: SpritesResponse;
};

export type PokemonsResponse = {
  name: string;
  url: string;
};
