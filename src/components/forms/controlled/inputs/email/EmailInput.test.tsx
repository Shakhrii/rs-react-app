import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import EmailInput from './EmailInput';

vi.mock('../../../error/ErrorMessage', () => ({
  default: ({ message }: { message: string }) => (
    <div data-testid="error-message">{message}</div>
  ),
}));

const formSchema = z.object({
  email: z
    .string()
    .email('This is not a valid email')
    .min(1, 'Email has to be filled')
    .trim(),
  password: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Wrapper = ({
  defaultValues = { email: '', password: '' },
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
      <EmailInput />
    </FormProvider>
  );
};

describe('EmailInput', () => {
  it('renders input with correct attributes', () => {
    render(<Wrapper />);

    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('placeholder', 'your@email.com');
  });

  it('shows error when email is invalid format', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Email');

    await user.type(input, 'invalid email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'This is not a valid email'
      );
    });
  });

  it('shows error when email missing @ symbol', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Email');

    await user.type(input, 'test.example.com');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'This is not a valid email'
      );
    });
  });

  it('shows error when email missing domain', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Email');

    await user.type(input, 'test@');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'This is not a valid email'
      );
    });
  });

  it('shows error when email missing username', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Email');

    await user.type(input, '@example.com');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'This is not a valid email'
      );
    });
  });

  it('does not show error when email is valid', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Email');

    await user.type(input, 'test@example.com');
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });

  it('accepts various valid email formats', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText('Email');

    const validEmails = [
      'user.name@example.com',
      'user.name+tag@example.com',
      'user-name@example.co.uk',
      'user123@example.io',
      'first.last@subdomain.example.com',
    ];

    for (const email of validEmails) {
      await user.clear(input);
      await user.type(input, email);
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
      });
    }
  });
});
