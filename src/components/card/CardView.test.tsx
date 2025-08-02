import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardView } from './CardView';
import type { Pokemon } from '../../types/types';
import { MemoryRouter } from 'react-router';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

describe('Rendering tests', () => {
  it('correctly displays item names and descriptions', async () => {
    const testPokemon: Pokemon = {
      id: 1,
      name: 'name1',
      height: 1,
      weight: 2,
      abilities: 'abilities1',
      avatar: '',
      order: 1,
      baseExperience: 64,
      heldItems: 'heldItem',
    };

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardView pokemon={testPokemon} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
    expect(screen.getByText(testPokemon.height)).toBeInTheDocument();
    expect(screen.getByText(testPokemon.weight)).toBeInTheDocument();
  });
});
