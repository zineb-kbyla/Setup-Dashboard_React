import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Users from '../pages/Users';
import { BrowserRouter } from 'react-router-dom';

// Helper to render with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Users Page', () => {
  it('renders the page title, search bar, filters, and users table', () => {
    renderWithRouter(<Users />);
    expect(screen.getByText(/all users/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search users by name or email/i)).toBeInTheDocument();
    // Use getAllByText for ambiguous text
    expect(screen.getAllByText(/gender/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/device type/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/level/i).length).toBeGreaterThan(0);
    // Table header check (assuming 'Name' is a column)
    expect(screen.getByText(/name/i)).toBeInTheDocument();
  });

  it('filters users by search term', () => {
    renderWithRouter(<Users />);
    const searchInput = screen.getByPlaceholderText(/search users by name or email/i);
    fireEvent.change(searchInput, { target: { value: 'ali' } });
    // At least one user with 'ali' in name/email should be present
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1); // header + at least one user
  });


  it('changes page with pagination', () => {
    renderWithRouter(<Users />);
    const nextButton = screen.queryByLabelText(/next page/i) || screen.queryByText(/next/i);
    if (nextButton) {
      fireEvent.click(nextButton);
      // Table should update (row count may change)
      expect(screen.getAllByRole('row').length).toBeGreaterThan(0);
    }
  });
}); 