import { describe, expect, it, vi } from 'vitest';
import { useTheme } from '../../../hooks/useTheme';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ThemeProvider } from '../../../context/ThemeProvider';

describe('Renders tests', () => {
  vi.mock('../../../hooks/useTheme', () => ({
    useTheme: vi.fn(() => ({ theme: 'light' })),
  }));

  it('apply dark theme', () => {
    vi.mocked(useTheme).mockReturnValue({ theme: 'dark', setTheme: () => {} });

    render(
      <ThemeProvider>
        <Button onClick={() => {}}>100</Button>
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[var(--accent-color-dark)]');
  });
});
