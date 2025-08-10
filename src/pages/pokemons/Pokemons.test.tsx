import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';
import { renderWithProviders } from '../../test/test-utils';
import Pokemons from './Pokemons';
import userEvent from '@testing-library/user-event';

describe('Cache behavior tests', () => {
  it('cache data when return back on pagination', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <Pokemons />
        </ThemeProvider>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText('217'));
        expect(screen.queryByRole('status')).toBeNull();

        const buttonLast = screen.getByRole('button', { name: '217' });
        const buttonFirst = screen.getByRole('button', { name: '1' });

        userEvent.click(buttonLast);
        userEvent.click(buttonFirst);

        expect(screen.queryByRole('status')).toBeNull();
      },
      { timeout: 3000 }
    );
  });
});

describe('Rendering tests', () => {
  const count = 217;
  const names = ['bulbasaur', 'ivysaur', 'venusaur'];
  const failSearchTerm = 'qwerty';
  const rightSearchTerm = '1';

  it('show loading state while fetching data and show correct data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <Pokemons />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(
      () => {
        names.forEach((name) => {
          const nameElements = screen.queryAllByText(name);
          expect(nameElements[0]).toBeInTheDocument();
        });

        const pageCount = screen.queryAllByText(count);
        expect(pageCount[0]).toBeInTheDocument();

        expect(screen.queryByRole('status')).toBeNull();
      },
      { timeout: 3000 }
    );
  });

  it('loading state and show data with search term', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <Pokemons />
        </ThemeProvider>
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByText('Search');

    await userEvent.type(input, rightSearchTerm);
    await userEvent.click(button);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText('bulbasaur'));
        expect(screen.getByText('1'));
        expect(screen.queryByRole('status')).toBeNull();
      },
      { timeout: 3000 }
    );
  });

  it('loading state and show error with wrong search term', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <Pokemons />
        </ThemeProvider>
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByText('Search');

    await userEvent.type(input, failSearchTerm);
    await userEvent.click(button);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText('No Results'));
        expect(screen.queryByRole('status')).toBeNull();
      },
      { timeout: 3000 }
    );
  });
});
