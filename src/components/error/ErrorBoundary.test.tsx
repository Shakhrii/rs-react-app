import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';
import { ButtonBoundaryErrorView } from './ButtonBoundaryErrorView';
import userEvent from '@testing-library/user-event';

describe('Error Catching Tests', () => {
  const consoleErrorMock = vi.spyOn(console, 'error');

  beforeEach(() => {
    consoleErrorMock.mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });
  it('displays fallback UI when error occurs', async () => {
    render(
      <ErrorBoundary>
        <ButtonBoundaryErrorView />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(screen.getByText('Render Error')).toBeInTheDocument();
  });
});
