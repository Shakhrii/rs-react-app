import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', async () => {
    await delay(150);

    return HttpResponse.json(
      {
        count: 1302,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        ],
      },
      {
        status: 200,
      }
    );
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', async () => {
    await delay(150);

    return HttpResponse.json(
      {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'image-url' },
        abilities: [{ ability: { name: 'overgrow' } }],
        height: 7,
        weight: 69,
        order: 1,
        base_experience: 64,
        held_items: [],
      },

      {
        status: 200,
      }
    );
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/0', async () => {
    await delay(150);

    return HttpResponse.json('Not Found', {
      status: 404,
    });
  }),
];
