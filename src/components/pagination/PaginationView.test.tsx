import { describe, expect, it } from 'vitest';
import { PaginationView } from './PaginationView';
import { LIMIT } from '../../utils/contstants';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';

describe('Renders tests', () => {
  it('render correct pages count', () => {
    const count = 1340;
    const pages = 224;
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
