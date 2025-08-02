import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardListView } from './CardListView';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Rendering Tests', () => {
  it('render correct number of items when data is provided', () => {
    const testPokemons = [];
    for (let i = 0; i < 10; i++) {
      const pokemon = {
        id: i,
        name: `name${i}`,
        avatar: `avatar${i}`,
        weight: i,
        height: i,
        abilities: `abilities${i}`,
        order: i,
        baseExperience: i,
        heldItems: `heldItem${i}`,
      };
      testPokemons.push(pokemon);
    }

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardListView pokemons={testPokemons} />
        </Provider>
      </MemoryRouter>
    );
    const items = screen.queryAllByTestId('card-item');
    expect(items).toHaveLength(testPokemons.length);
  });
});

describe('Data Display Tests', () => {
  it('correctly displays item names and descriptions', () => {
    const testPokemons = [];
    for (let i = 0; i < 10; i++) {
      const pokemon = {
        id: i,
        name: `name${i}`,
        avatar: `avatar${i}`,
        weight: i,
        height: i,
        abilities: `abilities${i}`,
        order: i,
        baseExperience: i,
        heldItems: `heldItem${i}`,
      };
      testPokemons.push(pokemon);
    }

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardListView pokemons={testPokemons} />
        </Provider>
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId('card-item');

    testPokemons.forEach((pokemon, index) => {
      const card = cards[index];
      expect(card).toHaveTextContent(pokemon.name);
      expect(card).toHaveTextContent(pokemon.height.toString());
      expect(card).toHaveTextContent(pokemon.weight.toString());
    });
  });
});
