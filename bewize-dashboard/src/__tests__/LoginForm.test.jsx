import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/Forms/LoginForm';

// Helper to render with required props
const setup = (props = {}) => {
  const defaultProps = {
    onSubmit: jest.fn(),
    loading: false,
    showPassword: false,
    togglePassword: jest.fn(),
  };
  return render(<LoginForm {...defaultProps} {...props} />);
};

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    setup();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty and form is submitted', async () => {
    setup();
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data when valid', async () => {
    const onSubmit = jest.fn();
    setup({ onSubmit });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'password123' },
        expect.anything()
      );
    });
  });

  it('shows loading spinner when loading is true', () => {
    setup({ loading: true });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('toggles password visibility when icon is clicked', () => {
    const togglePassword = jest.fn();
    setup({ togglePassword });
    const toggleIcon = screen.getByTestId('toggle-password');
    fireEvent.click(toggleIcon);
    expect(togglePassword).toHaveBeenCalled();
  });
}); 