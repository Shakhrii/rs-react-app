import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NameInput from './NameInput';
import userEvent from '@testing-library/user-event';
import z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

vi.mock('../../../error/ErrorMessage', () => ({
  default: ({ message }: { message: string }) => (
    <div data-testid="error-message">{message}</div>
  ),
}));

const schema = z.object({
  name: z
    .string()
    .min(1, 'Name has to be filled')
    .regex(/^[A-Z]/, 'Name must start with uppercased letter')
    .regex(/^[A-Z][a-zA-Z]*$/, 'Name must contain only letters')
    .trim(),
});

type FormData = z.infer<typeof schema>;

const Wrapper = ({
  defaultValues = { name: '' },
}: {
  defaultValues?: Partial<FormData>;
}) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <NameInput />
    </FormProvider>
  );
};

describe('NameInput renders', () => {
  it('renders input with correct attributes', () => {
    render(<Wrapper />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'name');
    expect(input).toHaveAttribute('placeholder', 'Your name');
  });

  it('shows error when name does not start with uppercase letter', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'test');
    await user.tab();

    expect(
      screen.getByText('Name must start with uppercased letter')
    ).toBeInTheDocument();
  });

  it('shows error when name contains non-letter characters', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Name');

    await user.type(input, 'Test123');
    await user.tab();

    expect(
      screen.getByText('Name must contain only letters')
    ).toBeInTheDocument();
  });
});
