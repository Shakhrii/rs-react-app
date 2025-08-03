import { render, screen } from '@testing-library/react';
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { ButtonDownload } from './ButtonDownload';
import userEvent from '@testing-library/user-event';
import { convertToCSV } from '../../utils/utils';
import { useAppSelector } from '../../store/store';

describe('user interactions test', () => {
  const mockSelectedItems = [
    { id: 1, name: 'Pikachu' },
    { id: 2, name: 'Charizard' },
  ];

  vi.mock('../../store/store');
  vi.mock('../../utils/utils');

  const mockCreateObjectURL = vi.fn();
  const mockRevokeObjectURL = vi.fn();

  beforeAll(() => {
    globalThis.URL.createObjectURL = mockCreateObjectURL;
    globalThis.URL.revokeObjectURL = mockRevokeObjectURL;
  });

  beforeEach(() => {
    vi.mocked(useAppSelector).mockReturnValue(mockSelectedItems);
    vi.mocked(convertToCSV).mockReturnValue('csv,data');
    mockCreateObjectURL.mockReturnValue('mock-url');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('after click call convertToCSV with rights data', async () => {
    render(<ButtonDownload />);

    const button = screen.getByText('Download all');
    await userEvent.click(button);

    expect(convertToCSV).toHaveBeenCalledTimes(1);
    expect(convertToCSV).toHaveBeenCalledWith(mockSelectedItems);
  });
});
