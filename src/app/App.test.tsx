import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

import { renderWithProviders } from '../test/test-utils';

describe('User interaction test', () => {
  it('saves search term to localStorage when search button is clicked', async () => {
    renderWithProviders(<App />);
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

    renderWithProviders(<App />);
    const input = screen.getByRole('textbox');
    expect(localStorage.getItem(SEARCH_TERM_KEY)).toBe(searchTerm);
    expect(input).toHaveValue(searchTerm);
  });
});

describe('Rendering tests', () => {
  it('show loading state while fetching data', async () => {
    renderWithProviders(<App />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole('status')).toBeNull();
      },
      { timeout: 3000 }
    );
  });
});
