import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardDetailView } from './CardDetailView';
import type { Pokemon } from '../../types/types';
import * as api from '../../api/Api';
import { MemoryRouter } from 'react-router';

describe('Rendering tests', () => {
  const testPokemon: Pokemon = {
    id: 1,
    name: 'name1',
    height: 1,
    weight: 2,
    abilities: 'abilities1',
    avatar: '',
    order: 3,
    baseExperience: 64,
    heldItems: 'heldItem',
  };
  beforeEach(() => {
    vi.spyOn(api, 'getPokemon').mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(testPokemon), 500))
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('show loading state while fetching data', async () => {
    render(
      <MemoryRouter>
        <CardDetailView id="1" />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
        expect(screen.getByText(testPokemon.height)).toBeInTheDocument();
        expect(screen.getByText(testPokemon.weight)).toBeInTheDocument();
        expect(screen.getByText(testPokemon.abilities)).toBeInTheDocument();
        expect(screen.getByText(testPokemon.order)).toBeInTheDocument();
        expect(
          screen.getByText(testPokemon.baseExperience)
        ).toBeInTheDocument();
        expect(screen.getByText(testPokemon.heldItems)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
