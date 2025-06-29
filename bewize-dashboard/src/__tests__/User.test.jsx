import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import User from '../pages/User';
import mockUsers from '../data/mockUsers';

// Helper to render with router and user state
const renderWithUser = (user) => {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/user',
          state: { user }
        }
      ]}
    >
      <User />
    </MemoryRouter>
  );
};

// Helper to render with router but no user state
const renderWithoutUser = () => {
  return render(
    <MemoryRouter initialEntries={['/user']}>
      <User />
    </MemoryRouter>
  );
};

describe('User Details Page', () => {
  const testUser = mockUsers[0]; // Use first user from mock data

  it('renders user details when user data is provided', () => {
    renderWithUser(testUser);
    
    // Check page title
    expect(screen.getByText(/user details/i)).toBeInTheDocument();
    
    // Check user profile section
    expect(screen.getByText(testUser.name)).toBeInTheDocument();
    expect(screen.getByText(testUser.email)).toBeInTheDocument();
    expect(screen.getByAltText(`${testUser.name}'s profile`)).toBeInTheDocument();
    
    // Check user information section
    expect(screen.getByText(/user information/i)).toBeInTheDocument();
  });

  it('displays user information fields correctly', () => {
    renderWithUser(testUser);
    
    // Check form labels
    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText(/birthday/i)).toBeInTheDocument();
    expect(screen.getByText(/country/i)).toBeInTheDocument();
    expect(screen.getByText(/device type/i)).toBeInTheDocument();
    
    // Check input values
    expect(screen.getByDisplayValue(testUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testUser.gender)).toBeInTheDocument();
  });

  it('displays order history section', () => {
    renderWithUser(testUser);
    const orderSection = screen.getByText(/order history/i).closest('div');
    expect(orderSection).toBeDefined();
    expect(within(orderSection).getByRole('table')).toBeInTheDocument();
  });

  it('displays subscriptions section', () => {
    renderWithUser(testUser);
    const subscriptionSection = screen.getAllByText(/subscriptions/i)
      .find(el => el.tagName === 'H2' || el.tagName === 'h2');
    expect(subscriptionSection).toBeDefined();
    const subscriptionDiv = subscriptionSection.closest('div');
    expect(within(subscriptionDiv).getByRole('table')).toBeInTheDocument();
  });

  it('shows no user data message when no user is provided', () => {
    renderWithoutUser();
    
    expect(screen.getByText(/no user data available/i)).toBeInTheDocument();
  });

  it('displays device type with appropriate styling', () => {
    renderWithUser(testUser);
    
    // Check device type is displayed
    expect(screen.getByText(testUser.device_type || 'N/A')).toBeInTheDocument();
  });
}); 