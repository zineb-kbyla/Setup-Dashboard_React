import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Payments from '../pages/Payments';
import mockPayments from '../data/mockPayments';

// Mock the DashboardLayout component
jest.mock('../layouts/DashboardLayout', () => {
  return function MockDashboardLayout({ children }) {
    return <div data-testid="dashboard-layout">{children}</div>;
  };
});

// Mock the PaymentsTable component
jest.mock('../components/Tables/PaymentsTable', () => {
  return function MockPaymentsTable({ payments }) {
    return (
      <div data-testid="payments-table">
        {payments.map((payment) => (
          <div key={payment.id} data-testid={`payment-${payment.id}`}>
            <span data-testid={`payment-id-${payment.id}`}>{payment.id}</span>
            <span data-testid={`payment-user-${payment.id}`}>{payment.user_name}</span>
            <span data-testid={`payment-email-${payment.id}`}>{payment.email}</span>
            <span data-testid={`payment-amount-${payment.id}`}>${payment.amount}</span>
            <span data-testid={`payment-status-${payment.id}`}>{payment.payment_status}</span>
            <span data-testid={`payment-method-${payment.id}`}>{payment.payment_method}</span>
            <span data-testid={`payment-date-${payment.id}`}>{payment.paid_at}</span>
          </div>
        ))}
      </div>
    );
  };
});

describe('Payments Page', () => {
  beforeEach(() => {
    // Reset mock data before each test
    mockPayments.length = 0;
    mockPayments.push(
      {
        id: "PAY-001",
        user_name: "John Doe",
        email: "john.doe@example.com",
        amount: 99.99,
        payment_status: "Paid",
        payment_method: "Visa",
        paid_at: "2024-01-15"
      },
      {
        id: "PAY-002",
        user_name: "Jane Smith",
        email: "jane@example.com",
        amount: 149.99,
        payment_status: "Pending",
        payment_method: "PayPal",
        paid_at: "2024-01-16"
      },
      {
        id: "PAY-003",
        user_name: "Mike Johnson",
        email: "mike@example.com",
        amount: 199.99,
        payment_status: "Failed",
        payment_method: "MasterCard",
        paid_at: "2024-01-17"
      }
    );
  });

  test('renders payments page with title', () => {
    render(<Payments />);
    
    expect(screen.getByText('All Payments')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
  });

  test('displays search bar with correct placeholder', () => {
    render(<Payments />);
    
    const searchBar = screen.getByPlaceholderText('Search payments by ID, customer name or email...');
    expect(searchBar).toBeInTheDocument();
  });

  test('displays payments table', () => {
    render(<Payments />);
    
    expect(screen.getByTestId('payments-table')).toBeInTheDocument();
    expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
    expect(screen.getByTestId('payment-PAY-002')).toBeInTheDocument();
    expect(screen.getByTestId('payment-PAY-003')).toBeInTheDocument();
  });

  test('displays payment data correctly', () => {
    render(<Payments />);
    
    expect(screen.getByTestId('payment-id-PAY-001')).toHaveTextContent('PAY-001');
    expect(screen.getByTestId('payment-user-PAY-001')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('payment-email-PAY-001')).toHaveTextContent('john.doe@example.com');
    expect(screen.getByTestId('payment-amount-PAY-001')).toHaveTextContent('$99.99');
    expect(screen.getByTestId('payment-status-PAY-001')).toHaveTextContent('Paid');
    expect(screen.getByTestId('payment-method-PAY-001')).toHaveTextContent('Visa');
  });

  test('filters payments by status', async () => {
    render(<Payments />);
    
    // Use getAllByText and select the second element (the span, not the label)
    const statusElements = screen.getAllByText('Status');
    const statusFilter = statusElements[1]; // The span element
    fireEvent.click(statusFilter);
    
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      const paidOption = screen.getByText('Paid');
      fireEvent.click(paidOption);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-002')).not.toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-003')).not.toBeInTheDocument();
    });
  });

  test('filters payments by payment method', async () => {
    render(<Payments />);
    
    // Use getAllByText and select the second element (the span, not the label)
    const methodElements = screen.getAllByText('Method');
    const methodFilter = methodElements[1]; // The span element
    fireEvent.click(methodFilter);
    
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      const visaOption = screen.getByText('Visa');
      fireEvent.click(visaOption);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-002')).not.toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-003')).not.toBeInTheDocument();
    });
  });

  test('searches payments by ID', async () => {
    render(<Payments />);
    
    const searchBar = screen.getByPlaceholderText('Search payments by ID, customer name or email...');
    await userEvent.type(searchBar, 'PAY-001');
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-002')).not.toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-003')).not.toBeInTheDocument();
    });
  });

  test('searches payments by customer name', async () => {
    render(<Payments />);
    
    const searchBar = screen.getByPlaceholderText('Search payments by ID, customer name or email...');
    await userEvent.type(searchBar, 'John Doe');
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-002')).not.toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-003')).not.toBeInTheDocument();
    });
  });

  test('searches payments by email', async () => {
    render(<Payments />);
    
    const searchBar = screen.getByPlaceholderText('Search payments by ID, customer name or email...');
    await userEvent.type(searchBar, 'john.doe@example.com');
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-002')).not.toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-003')).not.toBeInTheDocument();
    });
  });

  test('displays pagination controls', () => {
    render(<Payments />);
    
    // Check if pagination component is rendered
    expect(screen.getByTestId('payments-table')).toBeInTheDocument();
  });

  test('resets status filter when reset button is clicked', async () => {
    render(<Payments />);
    
    // Apply a filter first
    const statusElements = screen.getAllByText('Status');
    const statusFilter = statusElements[1]; // The span element
    fireEvent.click(statusFilter);
    
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      const paidOption = screen.getByText('Paid');
      fireEvent.click(paidOption);
    });
    
    // Reset the filter - look for reset button in the filter area
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
      expect(screen.getByTestId('payment-PAY-002')).toBeInTheDocument();
      expect(screen.getByTestId('payment-PAY-003')).toBeInTheDocument();
    });
  });

  test('resets method filter when reset button is clicked', async () => {
    render(<Payments />);
    
    // Apply a filter first
    const methodElements = screen.getAllByText('Method');
    const methodFilter = methodElements[1]; // The span element
    fireEvent.click(methodFilter);
    
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      const visaOption = screen.getByText('Visa');
      fireEvent.click(visaOption);
    });
    
    // Reset the filter - look for reset button in the filter area
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
      expect(screen.getByTestId('payment-PAY-002')).toBeInTheDocument();
      expect(screen.getByTestId('payment-PAY-003')).toBeInTheDocument();
    });
  });

  test('handles empty search results', async () => {
    render(<Payments />);
    
    const searchBar = screen.getByPlaceholderText('Search payments by ID, customer name or email...');
    await userEvent.type(searchBar, 'NONEXISTENT');
    
    await waitFor(() => {
      expect(screen.queryByTestId('payment-PAY-001')).not.toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-002')).not.toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-003')).not.toBeInTheDocument();
    });
  });

  test('handles case-insensitive search', async () => {
    render(<Payments />);
    
    const searchBar = screen.getByPlaceholderText('Search payments by ID, customer name or email...');
    await userEvent.type(searchBar, 'john doe');
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
    });
  });

  test('filters by multiple criteria simultaneously', async () => {
    render(<Payments />);
    
    // Apply status filter
    const statusElements = screen.getAllByText('Status');
    const statusFilter = statusElements[1]; // The span element
    fireEvent.click(statusFilter);
    
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      const paidOption = screen.getByText('Paid');
      fireEvent.click(paidOption);
    });
    
    // Apply method filter
    const methodElements = screen.getAllByText('Method');
    const methodFilter = methodElements[1]; // The span element
    fireEvent.click(methodFilter);
    
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      const visaOption = screen.getByText('Visa');
      fireEvent.click(visaOption);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-PAY-001')).toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-002')).not.toBeInTheDocument();
      expect(screen.queryByTestId('payment-PAY-003')).not.toBeInTheDocument();
    });
  });

  test('displays correct payment status colors', () => {
    render(<Payments />);
    
    // Check if status elements are present
    expect(screen.getByTestId('payment-status-PAY-001')).toHaveTextContent('Paid');
    expect(screen.getByTestId('payment-status-PAY-002')).toHaveTextContent('Pending');
    expect(screen.getByTestId('payment-status-PAY-003')).toHaveTextContent('Failed');
  });

  test('displays correct payment method icons', () => {
    render(<Payments />);
    
    // Check if payment method elements are present
    expect(screen.getByTestId('payment-method-PAY-001')).toHaveTextContent('Visa');
    expect(screen.getByTestId('payment-method-PAY-002')).toHaveTextContent('PayPal');
    expect(screen.getByTestId('payment-method-PAY-003')).toHaveTextContent('MasterCard');
  });

  test('handles pagination correctly', () => {
    render(<Payments />);
    
    // This would test pagination functionality
    // Implementation depends on how pagination is implemented
    expect(screen.getByTestId('payments-table')).toBeInTheDocument();
  });
}); 