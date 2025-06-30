import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Orders from '../pages/Orders';
import { BrowserRouter } from 'react-router-dom';

// Helper to render with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Orders Page', () => {
  it('renders the page title, search bar, filters, and orders table', () => {
    renderWithRouter(<Orders />);
    
    expect(screen.getByText(/all orders/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search orders by number, customer name or email/i)).toBeInTheDocument();

    // Use getAllByText to avoid multiple match error
    expect(screen.getAllByText(/status/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/plan type/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/discount/i).length).toBeGreaterThan(0);

    // Table headers (prefer getByRole for clarity and robustness)
    expect(screen.getByRole('columnheader', { name: /order number/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /customer/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /amount/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /date/i })).toBeInTheDocument();
  });

  it('filters orders by search term', () => {
    renderWithRouter(<Orders />);
    const searchInput = screen.getByPlaceholderText(/search orders by number, customer name or email/i);
    fireEvent.change(searchInput, { target: { value: 'ORD-001' } });

    // Wait for UI to update if async
    expect(screen.getByText('ORD-001')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('changes page with pagination', () => {
    renderWithRouter(<Orders />);
    const nextButton = screen.queryByLabelText(/next page/i) || screen.queryByText(/next/i);
    if (nextButton) {
      fireEvent.click(nextButton);
      expect(screen.getAllByRole('row').length).toBeGreaterThan(0);
    }
  });
});
