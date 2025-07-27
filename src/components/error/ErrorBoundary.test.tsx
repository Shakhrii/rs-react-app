import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

describe('Renders child', () => {
  it('render child without error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Children</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('show ui fallback when error', () => {
    vi.mock('./ErrorView', () => ({
      ErrorView: vi.fn(() => <div>Render error</div>),
    }));

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const ThrowErrorComponent = () => {
      throw new Error('Test error');
      return null;
    };

    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Render error')).toBeInTheDocument();

    consoleErrorMock.mockRestore();
    vi.clearAllMocks();
  });
});
