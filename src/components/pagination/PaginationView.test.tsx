import { describe, expect, it, vi } from 'vitest';
import { PaginationView } from './PaginationView';
import { LIMIT } from '../../utils/contstants';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';
import { useTheme } from '../../hooks/useTheme';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({ theme: 'light' })),
}));

describe('Renders tests', () => {
  const count = 1340;
  const pages = 224;

  it('render correct pages count', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <PaginationView
            limit={LIMIT}
            count={count}
            onPageChanged={() => {}}
            isVisible={true}
          />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(pages)).toBeInTheDocument();
  });
  it('apply dark theme', () => {
    vi.mocked(useTheme).mockReturnValue({ theme: 'dark', setTheme: () => {} });

    render(
      <MemoryRouter>
        <ThemeProvider>
          <PaginationView
            limit={LIMIT}
            count={count}
            onPageChanged={() => {}}
            isVisible={true}
          />
        </ThemeProvider>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: `${pages}` });
    expect(button).toHaveClass('bg-[var(--accent-color-dark)]');
  });
});

describe('URL params handling', () => {
  it('check read page from URL', () => {
    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <ThemeProvider>
          <PaginationView
            count={100}
            limit={10}
            onPageChanged={() => {}}
            isVisible={true}
          />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
