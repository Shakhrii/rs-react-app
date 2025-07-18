import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Updates input value', () => {
  it('update input value when user types', async () => {
    render(<SearchView value={''} onSeacrhClick={() => {}} />);
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'test-data');
    expect(input).toHaveValue('test-data');
  });
});
