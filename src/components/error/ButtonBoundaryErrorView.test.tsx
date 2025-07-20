import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonBoundaryErrorView } from './ButtonBoundaryErrorView';

describe('Error Button Tests', async () => {
    const consoleErrorMock = vi.spyOn(console, 'error');

    beforeEach(() => {
        consoleErrorMock.mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorMock.mockRestore();
    })

    it('throws error when test button is clicked', async () => {
        expect(() => {
          const { getByRole } = render(<ButtonBoundaryErrorView />);
          const button = getByRole('button');
          fireEvent.click(button);
        }).toThrow('Render Error from ButtonBoundaryErrorView');
    });  
})