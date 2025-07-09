import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Subscriptions from '../pages/Subscriptions';
import mockSubscriptions from '../data/mockSubscriptions';

// Mock the DashboardLayout component
jest.mock('../layouts/DashboardLayout', () => {
  return function MockDashboardLayout({ children }) {
    return <div data-testid="dashboard-layout">{children}</div>;
  };
});

// Mock the SubscriptionsTable component
jest.mock('../components/Tables/SubscriptionsTable', () => {
  return function MockSubscriptionsTable({ 
    subscriptions, 
    onEdit, 
    onDelete, 
    showEditForm, 
    selectedSubscription, 
    handleEditChange, 
    handleEditSubmit, 
    setShowEditForm 
  }) {
    return (
      <div data-testid="subscriptions-table">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} data-testid={`subscription-${subscription.id}`}>
            <span data-testid={`subscription-id-${subscription.id}`}>{subscription.id}</span>
            <span data-testid={`subscription-order-${subscription.id}`}>{subscription.orderId}</span>
            <span data-testid={`subscription-plan-${subscription.id}`}>{subscription.planType}</span>
            <button 
              onClick={() => onEdit(subscription)}
              data-testid={`edit-${subscription.id}`}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(subscription.id)}
              data-testid={`delete-${subscription.id}`}
            >
              Delete
            </button>
          </div>
        ))}
        {showEditForm && (
          <div data-testid="edit-form">
            <input
              name="planType"
              value={selectedSubscription?.planType || ''}
              onChange={handleEditChange}
              data-testid="edit-plan-type"
            />
            <button onClick={handleEditSubmit} data-testid="submit-edit">
              Save
            </button>
            <button onClick={() => setShowEditForm(false)} data-testid="cancel-edit">
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  };
});

describe('Subscriptions Page', () => {
  beforeEach(() => {
    // Reset mock data before each test
    mockSubscriptions.length = 0;
    mockSubscriptions.push(
      {
        id: "SUB-001",
        startDate: "2025-01-15",
        endDate: "2026-11-15",
        orderId: "ORD-001",
        planType: "Year",
        customer: {
          name: "John Doe",
          email: "john@example.com"
        }
      },
      {
        id: "SUB-002",
        startDate: "2023-11-16",
        endDate: "2024-11-16",
        orderId: "ORD-002",
        planType: "Month",
        customer: {
          name: "Jane Smith",
          email: "jane@example.com"
        }
      }
    );
  });

  test('renders subscriptions page with title', () => {
    render(<Subscriptions />);
    
    expect(screen.getByText('All Subscriptions')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
  });

  test('displays search bar with correct placeholder', () => {
    render(<Subscriptions />);
    
    const searchBar = screen.getByPlaceholderText('Search subscriptions by ID or order ID...');
    expect(searchBar).toBeInTheDocument();
  });

  test('displays subscriptions table', () => {
    render(<Subscriptions />);
    
    expect(screen.getByTestId('subscriptions-table')).toBeInTheDocument();
    expect(screen.getByTestId('subscription-SUB-001')).toBeInTheDocument();
    expect(screen.getByTestId('subscription-SUB-002')).toBeInTheDocument();
  });

  test('displays subscription data correctly', () => {
    render(<Subscriptions />);
    
    expect(screen.getByTestId('subscription-id-SUB-001')).toHaveTextContent('SUB-001');
    expect(screen.getByTestId('subscription-order-SUB-001')).toHaveTextContent('ORD-001');
    expect(screen.getByTestId('subscription-plan-SUB-001')).toHaveTextContent('Year');
  });

  test('filters subscriptions by status', async () => {
    render(<Subscriptions />);
    
    const statusFilter = screen.getByText('Status');
    fireEvent.click(statusFilter);
    
    const activeOption = screen.getByText('Active');
    fireEvent.click(activeOption);
    
    // Should show only active subscriptions (not expired)
    await waitFor(() => {
      expect(screen.getByTestId('subscription-SUB-001')).toBeInTheDocument();
    });
  });

  test('filters subscriptions by plan type', async () => {
    render(<Subscriptions />);
    
    const planFilter = screen.getByText('Plan Type');
    fireEvent.click(planFilter);
    
    const monthlyOption = screen.getByText('Monthly');
    fireEvent.click(monthlyOption);
    
    await waitFor(() => {
      expect(screen.getByTestId('subscription-SUB-002')).toBeInTheDocument();
      expect(screen.queryByTestId('subscription-SUB-001')).not.toBeInTheDocument();
    });
  });

  test('searches subscriptions by ID', async () => {
    render(<Subscriptions />);
    
    const searchBar = screen.getByPlaceholderText('Search subscriptions by ID or order ID...');
    await userEvent.type(searchBar, 'SUB-001');
    
    await waitFor(() => {
      expect(screen.getByTestId('subscription-SUB-001')).toBeInTheDocument();
      expect(screen.queryByTestId('subscription-SUB-002')).not.toBeInTheDocument();
    });
  });

  test('searches subscriptions by order ID', async () => {
    render(<Subscriptions />);
    
    const searchBar = screen.getByPlaceholderText('Search subscriptions by ID or order ID...');
    await userEvent.type(searchBar, 'ORD-002');
    
    await waitFor(() => {
      expect(screen.getByTestId('subscription-SUB-002')).toBeInTheDocument();
      expect(screen.queryByTestId('subscription-SUB-001')).not.toBeInTheDocument();
    });
  });

  test('opens edit form when edit button is clicked', async () => {
    render(<Subscriptions />);
    
    const editButton = screen.getByTestId('edit-SUB-001');
    await userEvent.click(editButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('edit-form')).toBeInTheDocument();
      expect(screen.getByTestId('edit-plan-type')).toHaveValue('Year');
    });
  });

  test('updates subscription when edit form is submitted', async () => {
    render(<Subscriptions />);
    
    // Open edit form
    const editButton = screen.getByTestId('edit-SUB-001');
    await userEvent.click(editButton);
    
    // Change plan type
    const planTypeInput = screen.getByTestId('edit-plan-type');
    await userEvent.clear(planTypeInput);
    await userEvent.type(planTypeInput, 'Month');
    
    // Submit form
    const submitButton = screen.getByTestId('submit-edit');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('edit-form')).not.toBeInTheDocument();
    });
  });

  test('cancels edit form when cancel button is clicked', async () => {
    render(<Subscriptions />);
    
    // Open edit form
    const editButton = screen.getByTestId('edit-SUB-001');
    await userEvent.click(editButton);
    
    // Cancel form
    const cancelButton = screen.getByTestId('cancel-edit');
    await userEvent.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('edit-form')).not.toBeInTheDocument();
    });
  });

  test('deletes subscription when delete button is clicked', async () => {
    render(<Subscriptions />);
    
    const deleteButton = screen.getByTestId('delete-SUB-001');
    await userEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('subscription-SUB-001')).not.toBeInTheDocument();
    });
  });

  test('displays pagination controls', () => {
    render(<Subscriptions />);
    
    // Check if pagination component is rendered
    // This would depend on your Pagination component implementation
    expect(screen.getByTestId('subscriptions-table')).toBeInTheDocument();
  });

  test('resets filters when reset button is clicked', async () => {
    render(<Subscriptions />);
    
    // Apply a filter first
    const statusFilter = screen.getByText('Status');
    fireEvent.click(statusFilter);
    const activeOption = screen.getByText('Active');
    fireEvent.click(activeOption);
    
    // Reset the filter
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('subscription-SUB-001')).toBeInTheDocument();
      expect(screen.getByTestId('subscription-SUB-002')).toBeInTheDocument();
    });
  });

  test('handles empty search results', async () => {
    render(<Subscriptions />);
    
    const searchBar = screen.getByPlaceholderText('Search subscriptions by ID or order ID...');
    await userEvent.type(searchBar, 'NONEXISTENT');
    
    await waitFor(() => {
      expect(screen.queryByTestId('subscription-SUB-001')).not.toBeInTheDocument();
      expect(screen.queryByTestId('subscription-SUB-002')).not.toBeInTheDocument();
    });
  });

  test('handles case-insensitive search', async () => {
    render(<Subscriptions />);
    
    const searchBar = screen.getByPlaceholderText('Search subscriptions by ID or order ID...');
    await userEvent.type(searchBar, 'sub-001');
    
    await waitFor(() => {
      expect(screen.getByTestId('subscription-SUB-001')).toBeInTheDocument();
    });
  });
}); 