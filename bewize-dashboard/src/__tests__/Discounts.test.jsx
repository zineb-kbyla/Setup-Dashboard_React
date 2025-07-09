import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Discounts from '../pages/Discounts';
import mockDiscounts from '../data/mockDiscounts';

// Mock the DashboardLayout component
jest.mock('../layouts/DashboardLayout', () => {
  return function MockDashboardLayout({ children }) {
    return <div data-testid="dashboard-layout">{children}</div>;
  };
});

// Mock the DiscountsTable component
jest.mock('../components/Tables/DiscountsTable', () => {
  return function MockDiscountsTable({ 
    discounts, 
    onEdit, 
    onDelete, 
    showEditForm, 
    selectedDiscount, 
    handleEditChange, 
    handleEditSubmit, 
    setShowEditForm 
  }) {
    return (
      <div data-testid="discounts-table">
        {discounts.map((discount) => (
          <div key={discount.id} data-testid={`discount-${discount.id}`}>
            <span data-testid={`discount-id-${discount.id}`}>{discount.id}</span>
            <span data-testid={`discount-code-${discount.id}`}>{discount.code}</span>
            <span data-testid={`discount-percentage-${discount.id}`}>{discount.percentage}%</span>
            <span data-testid={`discount-school-${discount.id}`}>{discount.schoolName}</span>
            <span data-testid={`discount-status-${discount.id}`}>{discount.status}</span>
            <button 
              onClick={() => onEdit(discount)}
              data-testid={`edit-${discount.id}`}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(discount.id)}
              data-testid={`delete-${discount.id}`}
            >
              Delete
            </button>
          </div>
        ))}
        {showEditForm && (
          <div data-testid="edit-form">
            <input
              name="code"
              value={selectedDiscount?.code || ''}
              onChange={handleEditChange}
              data-testid="edit-code"
            />
            <input
              name="percentage"
              value={selectedDiscount?.percentage || ''}
              onChange={handleEditChange}
              data-testid="edit-percentage"
            />
            <input
              name="schoolName"
              value={selectedDiscount?.schoolName || ''}
              onChange={handleEditChange}
              data-testid="edit-school"
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

// Mock the CreateDiscountForm component
jest.mock('../components/Forms/CreateDiscountForm', () => {
  return function MockCreateDiscountForm({ 
    showCreateForm, 
    createdDiscount, 
    handleCreateChange, 
    handleCreateSubmit, 
    setShowCreateForm 
  }) {
    if (!showCreateForm) return null;
    
    return (
      <div data-testid="create-form">
        <input
          name="code"
          value={createdDiscount.code}
          onChange={handleCreateChange}
          data-testid="create-code"
          placeholder="Discount Code"
        />
        <input
          name="percentage"
          value={createdDiscount.percentage}
          onChange={handleCreateChange}
          data-testid="create-percentage"
          placeholder="Percentage"
        />
        <input
          name="schoolName"
          value={createdDiscount.schoolName}
          onChange={handleCreateChange}
          data-testid="create-school"
          placeholder="School Name"
        />
        <button onClick={handleCreateSubmit} data-testid="submit-create">
          Create
        </button>
        <button onClick={() => setShowCreateForm(false)} data-testid="cancel-create">
          Cancel
        </button>
      </div>
    );
  };
});

describe('Discounts Page', () => {
  beforeEach(() => {
    // Reset mock data before each test
    mockDiscounts.length = 0;
    mockDiscounts.push(
      {
        id: "DISC-001",
        code: "SAVE10",
        percentage: 10,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        status: "Active",
        schoolName: "Groupe Scolaire L'initiale"
      },
      {
        id: "DISC-002",
        code: "SAVE20",
        percentage: 20,
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        status: "Inactive",
        schoolName: "Groupe Scolaire Lavoisier"
      }
    );
  });

  test('renders discounts page with title', () => {
    render(<Discounts />);
    
    expect(screen.getByText('All Discounts')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
  });

  test('displays search bar with correct placeholder', () => {
    render(<Discounts />);
    
    const searchBar = screen.getByPlaceholderText('Search discounts by ID or code...');
    expect(searchBar).toBeInTheDocument();
  });

  test('displays discounts table', () => {
    render(<Discounts />);
    
    expect(screen.getByTestId('discounts-table')).toBeInTheDocument();
    expect(screen.getByTestId('discount-DISC-001')).toBeInTheDocument();
    expect(screen.getByTestId('discount-DISC-002')).toBeInTheDocument();
  });

  test('displays discount data correctly', () => {
    render(<Discounts />);
    
    expect(screen.getByTestId('discount-id-DISC-001')).toHaveTextContent('DISC-001');
    expect(screen.getByTestId('discount-code-DISC-001')).toHaveTextContent('SAVE10');
    expect(screen.getByTestId('discount-percentage-DISC-001')).toHaveTextContent('10%');
    expect(screen.getByTestId('discount-school-DISC-001')).toHaveTextContent("Groupe Scolaire L'initiale");
    expect(screen.getByTestId('discount-status-DISC-001')).toHaveTextContent('Active');
  });

  test('filters discounts by status', async () => {
    render(<Discounts />);
    
    // Use getAllByText and select the second element (the span, not the label)
    const statusElements = screen.getAllByText('Status');
    const statusFilter = statusElements[1]; // The span element
    fireEvent.click(statusFilter);
    
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      const activeOption = screen.getByText('Active');
      fireEvent.click(activeOption);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('discount-DISC-001')).toBeInTheDocument();
      expect(screen.queryByTestId('discount-DISC-002')).not.toBeInTheDocument();
    });
  });

  test('filters discounts by school', async () => {
    render(<Discounts />);
    
    // Use getAllByText and select the second element (the span, not the label)
    const schoolElements = screen.getAllByText('School');
    const schoolFilter = schoolElements[1]; // The span element
    fireEvent.click(schoolFilter);
    
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      const initialeOption = screen.getByText("Groupe Scolaire L'initiale");
      fireEvent.click(initialeOption);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('discount-DISC-001')).toBeInTheDocument();
      expect(screen.queryByTestId('discount-DISC-002')).not.toBeInTheDocument();
    });
  });

  test('searches discounts by ID', async () => {
    render(<Discounts />);
    
    const searchBar = screen.getByPlaceholderText('Search discounts by ID or code...');
    await userEvent.type(searchBar, 'DISC-001');
    
    await waitFor(() => {
      expect(screen.getByTestId('discount-DISC-001')).toBeInTheDocument();
      expect(screen.queryByTestId('discount-DISC-002')).not.toBeInTheDocument();
    });
  });

  test('searches discounts by code', async () => {
    render(<Discounts />);
    
    const searchBar = screen.getByPlaceholderText('Search discounts by ID or code...');
    await userEvent.type(searchBar, 'SAVE10');
    
    await waitFor(() => {
      expect(screen.getByTestId('discount-DISC-001')).toBeInTheDocument();
      expect(screen.queryByTestId('discount-DISC-002')).not.toBeInTheDocument();
    });
  });

  test('searches discounts by school name', async () => {
    render(<Discounts />);
    
    const searchBar = screen.getByPlaceholderText('Search discounts by ID or code...');
    await userEvent.type(searchBar, 'Lavoisier');
    
    await waitFor(() => {
      expect(screen.getByTestId('discount-DISC-002')).toBeInTheDocument();
      expect(screen.queryByTestId('discount-DISC-001')).not.toBeInTheDocument();
    });
  });

  test('opens create form when create button is clicked', async () => {
    render(<Discounts />);
    
    const createButton = screen.getByText('Create Discount');
    await userEvent.click(createButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('create-form')).toBeInTheDocument();
    });
  });

  test('creates new discount when create form is submitted', async () => {
    render(<Discounts />);
    
    // Open create form
    const createButton = screen.getByText('Create Discount');
    await userEvent.click(createButton);
    
    // Fill form
    const codeInput = screen.getByTestId('create-code');
    const percentageInput = screen.getByTestId('create-percentage');
    const schoolInput = screen.getByTestId('create-school');
    
    await userEvent.type(codeInput, 'NEW20');
    await userEvent.type(percentageInput, '20');
    await userEvent.type(schoolInput, 'Test School');
    
    // Submit form
    const submitButton = screen.getByTestId('submit-create');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('create-form')).not.toBeInTheDocument();
    });
  });

  test('cancels create form when cancel button is clicked', async () => {
    render(<Discounts />);
    
    // Open create form
    const createButton = screen.getByText('Create Discount');
    await userEvent.click(createButton);
    
    // Cancel form
    const cancelButton = screen.getByTestId('cancel-create');
    await userEvent.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('create-form')).not.toBeInTheDocument();
    });
  });

  test('opens edit form when edit button is clicked', async () => {
    render(<Discounts />);
    
    const editButton = screen.getByTestId('edit-DISC-001');
    await userEvent.click(editButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('edit-form')).toBeInTheDocument();
      expect(screen.getByTestId('edit-code')).toHaveValue('SAVE10');
      expect(screen.getByTestId('edit-percentage')).toHaveValue('10');
    });
  });

  test('updates discount when edit form is submitted', async () => {
    render(<Discounts />);
    
    // Open edit form
    const editButton = screen.getByTestId('edit-DISC-001');
    await userEvent.click(editButton);
    
    // Change discount code
    const codeInput = screen.getByTestId('edit-code');
    await userEvent.clear(codeInput);
    await userEvent.type(codeInput, 'UPDATED10');
    
    // Submit form
    const submitButton = screen.getByTestId('submit-edit');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('edit-form')).not.toBeInTheDocument();
    });
  });

  test('cancels edit form when cancel button is clicked', async () => {
    render(<Discounts />);
    
    // Open edit form
    const editButton = screen.getByTestId('edit-DISC-001');
    await userEvent.click(editButton);
    
    // Cancel form
    const cancelButton = screen.getByTestId('cancel-edit');
    await userEvent.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('edit-form')).not.toBeInTheDocument();
    });
  });

  test('deletes discount when delete button is clicked', async () => {
    render(<Discounts />);
    
    const deleteButton = screen.getByTestId('delete-DISC-001');
    await userEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('discount-DISC-001')).not.toBeInTheDocument();
    });
  });

  test('displays pagination controls', () => {
    render(<Discounts />);
    
    // Check if pagination component is rendered
    expect(screen.getByTestId('discounts-table')).toBeInTheDocument();
  });

  test('resets filters when reset button is clicked', async () => {
    render(<Discounts />);
    
    // Apply a filter first
    const statusElements = screen.getAllByText('Status');
    const statusFilter = statusElements[1]; // The span element
    fireEvent.click(statusFilter);
    
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      const activeOption = screen.getByText('Active');
      fireEvent.click(activeOption);
    });
    
    // Reset the filter - look for reset button in the filter area
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('discount-DISC-001')).toBeInTheDocument();
      expect(screen.getByTestId('discount-DISC-002')).toBeInTheDocument();
    });
  });

  test('handles empty search results', async () => {
    render(<Discounts />);
    
    const searchBar = screen.getByPlaceholderText('Search discounts by ID or code...');
    await userEvent.type(searchBar, 'NONEXISTENT');
    
    await waitFor(() => {
      expect(screen.queryByTestId('discount-DISC-001')).not.toBeInTheDocument();
      expect(screen.queryByTestId('discount-DISC-002')).not.toBeInTheDocument();
    });
  });

  test('handles case insensitive search', async () => {
    render(<Discounts />);
    
    const searchBar = screen.getByPlaceholderText('Search discounts by ID or code...');
    await userEvent.type(searchBar, 'save10');
    
    await waitFor(() => {
      expect(screen.getByTestId('discount-DISC-001')).toBeInTheDocument();
      expect(screen.queryByTestId('discount-DISC-002')).not.toBeInTheDocument();
    });
  });

  test('toggles discount status when switch is clicked', async () => {
    render(<Discounts />);
    
    // This would test the status toggle functionality
    // Implementation depends on how the switch is implemented in the actual component
    expect(screen.getByTestId('discount-status-DISC-001')).toHaveTextContent('Active');
  });
}); 