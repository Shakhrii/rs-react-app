import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardListView } from './CardListView';

describe('Rendering Tests', () => {
  it('render correct number of items when data is provided', async () => {
    const testPokemons = [];
    for (let i = 0; i < 10; i++) {
      const pokemon = {
        id: i,
        name: `name${i}`,
        avatar: `avatar${i}`,
        weight: i,
        height: i,
        abilities: `abilities${i}`,
      };
      testPokemons.push(pokemon);
    }

    render(<CardListView pokemons={testPokemons} />);
    const items = screen.queryAllByTestId('card-item');
    expect(items).toHaveLength(testPokemons.length);
  });
});
