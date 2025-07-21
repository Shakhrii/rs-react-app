import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardView } from './CardView';
import type { Pokemon } from '../../types/types';

describe('Rendering tests', () => {
  it('correctly displays item names and descriptions', async () => {
    const testPokemon: Pokemon = {
      id: 1,
      name: 'name1',
      height: 1,
      weight: 2,
      abilities: 'abilities1',
      avatar: '',
    };

    render(<CardView pokemon={testPokemon} />);
    // const nameEl = screen.getByTestId('card-name');
    // expect(nameEl).toHaveTextContent(testPokemon.name);
    expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
    expect(screen.getByText(testPokemon.height)).toBeInTheDocument();
    expect(screen.getByText(testPokemon.weight)).toBeInTheDocument();
    expect(screen.getByText(testPokemon.abilities)).toBeInTheDocument();
  });
});
