import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardView } from './CardView';
import type { Pokemon } from '../../types/types';
import { MemoryRouter } from 'react-router';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeProvider';
import { useTheme } from '../../hooks/useTheme';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({ theme: 'light' })),
}));

describe('Rendering tests', () => {
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

  it('correctly displays item names and descriptions', async () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore()}>
          <ThemeProvider>
            <CardView pokemon={testPokemon} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
    expect(screen.getByText(testPokemon.height)).toBeInTheDocument();
    expect(screen.getByText(testPokemon.weight)).toBeInTheDocument();
  });
  it('apply dark theme styles', () => {
    vi.mocked(useTheme).mockReturnValue({ theme: 'dark', setTheme: () => {} });

    render(
      <MemoryRouter>
        <Provider store={setupStore()}>
          <ThemeProvider>
            <CardView pokemon={testPokemon} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    const cardItemElement = screen.getByTestId('card-item');
    expect(cardItemElement).toHaveClass('bg-[var(--bg-card-color-dark)]');
  });
});
