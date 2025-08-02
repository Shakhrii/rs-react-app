import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';
import type { Pokemon } from '../types/types';
import * as api from '../api/Api';
import { store } from '../store/store';
import { Provider } from 'react-redux';

describe('User interaction test', () => {
  it('saves search term to localStorage when search button is clicked', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = screen.getByRole('textbox');
    const button = screen.getByText('Search');
    const SEARCH_TERM_KEY = 'search_term';

    await userEvent.clear(input);
    await userEvent.type(input, 'test');
    await userEvent.click(button);
    expect(localStorage.getItem(SEARCH_TERM_KEY)).toBe('test');
  });
});

describe('Local Storage integration', () => {
  it('retrieves saved search term on component mount', async () => {
    const searchTerm = 'value';
    const SEARCH_TERM_KEY = 'search_term';
    localStorage.setItem(SEARCH_TERM_KEY, searchTerm);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = screen.getByRole('textbox');
    expect(localStorage.getItem(SEARCH_TERM_KEY)).toBe(searchTerm);
    expect(input).toHaveValue(searchTerm);
  });
});

describe('Rendering tests', () => {
  beforeEach(() => {
    const testPokemons: Pokemon[] = [];

    for (let i = 0; i < 10; i++) {
      const pokemon = {
        id: i,
        name: `name${i}`,
        avatar: `avatar${i}`,
        weight: i,
        height: i,
        order: i * 10,
        baseExperience: i,
        heldItems: `heldItems${i}`,
        abilities: `abilities${i}`,
      };
      testPokemons.push(pokemon);
    }

    vi.spyOn(api, 'getPokemons').mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(testPokemons), 500))
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('show loading state while fetching data', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const button = screen.getByText('Search');
    await userEvent.click(button);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole('status')).toBeNull();
      },
      { timeout: 3000 }
    );
  });
});
