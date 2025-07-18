import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchView } from './SearchView';

describe('Render component', () => {
  it('render search input', () => {
    render(<SearchView value={''} onSeacrhClick={() => {}} />);
    const result = screen.getByRole('textbox');
    expect(result).toBeInTheDocument();
  });

  it('render search button', () => {
    render(<SearchView value={''} onSeacrhClick={() => {}} />);
    const result = screen.getByRole('button');
    expect(result).toBeInTheDocument();
  });
});
