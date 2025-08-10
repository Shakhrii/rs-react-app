import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardDetailView } from './CardDetailView';
import type { Pokemon } from '../../types/types';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';
import { renderWithProviders } from '../../test/test-utils';

describe('Rendering tests', () => {
  const testPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    abilities: 'overgrow',
    avatar: 'image-url',
    order: 1,
    baseExperience: 64,
    heldItems: '',
  };

  it('show loading state while fetching data and show correct data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <CardDetailView id="bulbasaur" />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(
      () => {
        const nameElements = screen.queryAllByText(testPokemon.name);
        expect(nameElements[0]).toBeInTheDocument();
        const heightElements = screen.queryAllByText(testPokemon.height);
        expect(heightElements[0]).toBeInTheDocument();
        const weightElements = screen.queryAllByText(testPokemon.weight);
        expect(weightElements[0]).toBeInTheDocument();
        const abilitiesElements = screen.queryAllByText(testPokemon.abilities);
        expect(abilitiesElements[0]).toBeInTheDocument();
        const baseExpElements = screen.queryAllByText(
          testPokemon.baseExperience
        );
        expect(baseExpElements[0]).toBeInTheDocument();
        const heldElememnts = screen.queryAllByText(testPokemon.heldItems);
        expect(heldElememnts[0]).toBeInTheDocument();

        expect(screen.queryByRole('status')).toBeNull();
      },
      { timeout: 3000 }
    );
  });

  it('show error with wrong request', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <CardDetailView id="0" />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText('Something went wrong :('));
        expect(screen.queryByRole('status')).toBeNull();
      },
      { timeout: 3000 }
    );
  });
});
