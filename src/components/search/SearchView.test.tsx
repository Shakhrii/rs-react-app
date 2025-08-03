import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SearchView } from './SearchView';
import { ThemeProvider } from '../../context/ThemeProvider';

describe('Render component', () => {
  it('render search input', () => {
    render(
      <ThemeProvider>
        <SearchView value={''} onSearchClick={() => {}} />
      </ThemeProvider>
    );
    const result = screen.getByRole('textbox');
    expect(result).toBeInTheDocument();
  });

  it('render search button', () => {
    render(
      <ThemeProvider>
        <SearchView value={''} onSearchClick={() => {}} />
      </ThemeProvider>
    );
    const result = screen.getByRole('button');
    expect(result).toBeInTheDocument();
  });
});

describe('Searching user interaction', () => {
  it('update input value when user types', async () => {
    render(
      <ThemeProvider>
        <SearchView value={''} onSearchClick={() => {}} />
      </ThemeProvider>
    );
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'test-data');
    expect(input).toHaveValue('test-data');
  });

  it('triggers search callback with correct parameter', async () => {
    const handleSearchClick = vi.fn();
    const value = 'test value';

    render(
      <ThemeProvider>
        <SearchView value={value} onSearchClick={handleSearchClick} />
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(handleSearchClick).toHaveBeenCalledWith(value);
  });

  it('trims whitespace from search input before saving', async () => {
    const handleSearchClick = vi.fn();
    const values = ['     value', 'value     '];

    render(
      <ThemeProvider>
        <SearchView value={''} onSearchClick={handleSearchClick} />
      </ThemeProvider>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    for (const value of values) {
      await userEvent.clear(input);
      await userEvent.type(input, value);
      await userEvent.click(button);
      const res = value.trim();
      expect(handleSearchClick).toHaveBeenCalledWith(res);
    }
  });
});
