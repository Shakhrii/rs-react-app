import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SpinnerView } from './SpinnerView';

describe('Rendering tests', () => {
  it('Renders loading indicator', async () => {
    render(<SpinnerView />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
