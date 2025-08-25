import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import PasswordInput from './PasswordInput';

vi.mock('../../../error/ErrorMessage', () => ({
  default: ({ message }: { message: string }) => (
    <div data-testid="error-message">{message}</div>
  ),
}));

const passwordSchema = z.string().superRefine((val, ctx) => {
  if (val.length < 8) {
    ctx.addIssue({
      code: 'too_small',
      minimum: 8,
      origin: 'string',
      message: 'Password must contain at least 8 symbols',
    });
  }

  if (!/[0-9]/.test(val)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Password must contain at least 1 number',
    });
  }

  if (!/[A-Z]/.test(val)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Password must contain at least 1 uppercase letter',
    });
  }

  if (!/[a-z]/.test(val)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Password must contain at least 1 lowercase letter',
    });
  }

  if (!/[^A-Za-z0-9]/.test(val)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Password must contain at least 1 special character',
    });
  }
});

const formSchema = z.object({
  password: passwordSchema,
  email: z.string().email('Invalid email'),
});

type FormData = z.infer<typeof formSchema>;

const Wrapper = ({
  defaultValues = { password: '', email: '' },
}: {
  defaultValues?: Partial<FormData>;
}) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <PasswordInput />
    </FormProvider>
  );
};

describe('PasswordInput', () => {
  it('renders input with correct attributes', () => {
    render(<Wrapper />);

    const input = screen.getByLabelText('Password');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('id', 'password');
    expect(input).toHaveAttribute('placeholder', 'Your password');
  });

  it('shows error when password is too short', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Password');

    await user.type(input, 'Short1');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Password must contain at least 8 symbols'
      );
    });
  });

  it('shows error when password has no numbers', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Password');

    await user.type(input, 'LongPassword!');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Password must contain at least 1 number'
      );
    });
  });

  it('shows error when password has no uppercase letters', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Password');

    await user.type(input, 'lowercase123!');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Password must contain at least 1 uppercase letter'
      );
    });
  });

  it('shows error when password has no lowercase letters', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Password');

    await user.type(input, 'UPPERCASE123!');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Password must contain at least 1 lowercase letter'
      );
    });
  });

  it('shows error when password has no special characters', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Password');

    await user.type(input, 'Password123');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Password must contain at least 1 special character'
      );
    });
  });

  it('does not show error when password is valid', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Password');

    await user.type(input, 'ValidPass123!');
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });

  it('handles complex valid password', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Password');

    await user.type(input, 'Very$ecureP@ssw0rd!');
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });
});
