import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../../context/ThemeProvider';
import { Flyout } from './Flyout';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useAppSelector, type AppState } from '../../store/store';
import { selectSelectedItems } from '../../store/slices/selectedItems.slice';
import { useTheme } from '../../hooks/useTheme';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({ theme: 'light' })),
}));

vi.mock('../../store/store', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useAppSelector: vi.fn(),
  };
});

const mockStore = configureMockStore<AppState>();

describe('Rendering test', () => {
  const mockSelectedItems = [
    { id: 1, name: 'Pikachu' },
    { id: 2, name: 'Charizard' },
  ];

  beforeEach(() => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === selectSelectedItems) {
        return mockSelectedItems;
      }
      return undefined;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('render right counts of files', () => {
    render(
      <Provider store={mockStore()}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.getByText(`Selected items: ${mockSelectedItems.length}`)
    ).toBeInTheDocument();
  });

  it('not render when no items selected', () => {
    vi.mocked(useAppSelector).mockReturnValue([]);

    const { container } = render(
      <Provider store={mockStore()}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('apply dark theme styles', () => {
    vi.mocked(useTheme).mockReturnValue({ theme: 'dark', setTheme: () => {} });

    render(
      <Provider store={mockStore()}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    const flyoutElement = screen.getByText(
      `Selected items: ${mockSelectedItems.length}`
    ).parentElement;
    expect(flyoutElement).toHaveClass('bg-[var(--accent-color-dark)]');
  });
});
