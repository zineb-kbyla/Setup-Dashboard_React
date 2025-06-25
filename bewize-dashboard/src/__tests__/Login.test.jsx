jest.mock('lottie-react');

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper to render with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Login Page', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders login form and related components', () => {
    renderWithRouter(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('shows error for incorrect credentials', async () => {
    localStorage.setItem('test@example.com', JSON.stringify({ email: 'test@example.com', password: 'correctpass' }));
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByText(/login/i));
    expect(await screen.findByText(/incorrect email or password/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('logs in and navigates on correct credentials', async () => {
    localStorage.setItem('test@example.com', JSON.stringify({ email: 'test@example.com', password: 'correctpass' }));
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'correctpass' } });
    fireEvent.click(screen.getByText(/login/i));
    expect(await screen.findByText(/you are successfully logged in/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    }, { timeout: 1000 });
  });

  it('shows validation errors if fields are empty', async () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByText(/login/i));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });
});
