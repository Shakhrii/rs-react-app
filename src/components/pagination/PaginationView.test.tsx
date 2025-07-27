import { describe, expect, it } from 'vitest';
import { PaginationView } from './PaginationView';
import { LIMIT } from '../../utils/contstants';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('Renders tests', () => {
  it('render correct page count', () => {
    const count = 1340;
    const pages = 224;
    render(
      <MemoryRouter>
        <PaginationView
          limit={LIMIT}
          count={count}
          onPageChanged={() => {}}
          isVisible={true}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(pages)).toBeInTheDocument();
  });
});
