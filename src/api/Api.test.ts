import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getPokemons } from './Api';
import { SERVER_URL } from '../utils/contstants';

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
            order: 1,
            base_experience: 64,
            held_items: [],
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
        order: 1,
        base_experience: 64,
        held_items: [],
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
    const result = await getPokemons('', 0);

    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'bulbasaur' })])
    );
  });

  it('calls API with search term parameter', async () => {
    const params = 'bulbasaur';
    const result = await getPokemons(params, 0);

    expect(result).toEqual(
      expect.objectContaining({
        name: 'bulbasaur',
        avatar: 'image-url',
        abilities: 'overgrow ',
        height: 7,
        weight: 69,
        order: 1,
        baseExperience: 64,
        heldItems: '',
      })
    );
  });

  it('handle 404 error responses', async () => {
    server.use(
      http.get(`${SERVER_URL}/undefined`, () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    await expect(getPokemons('undefined', 0)).rejects.toThrow(/Not Found/);
  });

  it('handle 500 Internal Server Error', async () => {
    server.use(
      http.get(SERVER_URL, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(getPokemons('', 0)).rejects.toThrow(/Internal Server Error/);
  });
});
