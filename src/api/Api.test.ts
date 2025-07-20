import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getPokemons } from './Api';
const SERVER_URL = 'https://pokeapi.co/api/v2/pokemon';

describe('API Integration Tests', () => {
  const restHandlers = [
    http.get(SERVER_URL, () => {
      return HttpResponse.json({
        results: [
          {
            name: 'bulbasaur',
            url: `${SERVER_URL}/1/`,
            sprites: { front_default: 'image-url' },
            abilities: [{ ability: { name: 'overgrow' } }],
            height: 7,
            weight: 69,
          },
        ],
      });
    }),

    http.get(`${SERVER_URL}/:name`, () => {
      return HttpResponse.json({
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        sprites: { front_default: 'image-url' },
        abilities: [{ ability: { name: 'overgrow' } }],
      });
    }),
  ];

  const server = setupServer(...restHandlers);

  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

  afterAll(() => server.close());

  afterEach(() => server.resetHandlers());

  it('calls API with empty parameters', async () => {
    const result = await getPokemons('');

    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'bulbasaur' })])
    );
  });

  it('calls API with correct parameters', async () => {
    const params = 'bulbasaur';
    const result = await getPokemons(params);

    expect(result).toEqual(
      expect.objectContaining({
        name: 'bulbasaur',
        avatar: 'image-url',
        abilities: 'overgrow ',
        height: 7,
        weight: 69,
      })
    );
  });
});
