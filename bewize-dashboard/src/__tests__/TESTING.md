# Testing Documentation

## Overview
This document describes the testing approach and implementation for the Bewize Dashboard React application. The project uses Jest and React Testing Library for comprehensive testing of components, pages, and user interactions.

## Testing Stack
- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing
- **@testing-library/user-event**: User interaction simulation

## Test Structure

### Test Files Location
All test files are located in `src/__tests__/` directory and follow the naming convention `ComponentName.test.jsx`.

### Current Test Coverage

#### 1. **DashboardLayout.test.jsx**
- Tests the main dashboard layout component
- Verifies sidebar navigation functionality
- Tests responsive behavior
- Ensures proper rendering of child components

#### 2. **Login.test.jsx**
- Tests the login page component
- Verifies form validation
- Tests authentication flow
- Ensures proper error handling

#### 3. **LoginForm.test.jsx**
- Tests the login form component specifically
- Verifies input field behavior
- Tests form submission
- Ensures validation messages display correctly

#### 4. **Orders.test.jsx**
- Tests the orders page component
- Verifies data display and filtering
- Tests pagination functionality
- Ensures proper table rendering

#### 5. **User.test.jsx**
- Tests individual user page component
- Verifies user data display
- Tests user-specific functionality
- Ensures proper navigation

#### 6. **Users.test.jsx**
- Tests the users listing page
- Verifies user table functionality
- Tests search and filtering
- Ensures proper data rendering

#### 7. **Subscriptions.test.jsx**
- Tests the subscriptions page component
- Verifies search by ID and order ID
- Tests filtering by status and plan type
- Tests pagination functionality
- Ensures editing and deleting subscriptions works
- Handles empty and case-insensitive search

#### 8. **Discounts.test.jsx**
- Tests the discounts page component
- Verifies search by ID, code, and school
- Tests filtering by status and school
- Tests pagination functionality
- Ensures creating, editing, and deleting discounts works
- Handles empty and case-insensitive search

#### 9. **Payments.test.jsx**
- Tests the payments page component
- Verifies search by ID, customer name, and email
- Tests filtering by status and payment method
- Tests pagination functionality
- Ensures correct display of payment status and method
- Handles empty and case-insensitive search

## Testing Approach

### 1. **Component Testing**
- Each component is tested in isolation
- Tests focus on user interactions and behavior
- Mock data is used to simulate real-world scenarios
- Accessibility considerations are included

### 2. **Integration Testing**
- Tests verify how components work together
- Navigation between pages is tested
- Data flow between components is validated

### 3. **User-Centric Testing**
- Tests are written from a user's perspective
- Focus on what users see and interact with
- Avoid testing implementation details

## Testing Best Practices Implemented

### 1. **Arrange-Act-Assert Pattern**
```javascript
// Arrange
const mockData = {...};
render(<Component data={mockData} />);

// Act
userEvent.click(screen.getByRole('button'));

// Assert
expect(screen.getByText('Expected Result')).toBeInTheDocument();
```

### 2. **Accessibility Testing**
- Tests use semantic queries (getByRole, getByLabelText)
- Keyboard navigation is tested
- Screen reader compatibility is considered

### 3. **Mock Data Management**
- Centralized mock data in `src/data/` directory
- Consistent data structure across tests
- Realistic test scenarios

### 4. **Error Handling**
- Tests cover error states
- Network failures are simulated
- User feedback is verified

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Configured for React testing
- Includes path mapping for imports
- Set up for ES6 modules
- Configured for CSS and image imports

### Mock Setup
- Lottie animations are mocked (`__mocks__/lottie-react.js`)
- External dependencies are properly mocked
- Consistent mock behavior across tests

## Running Tests

### Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ComponentName.test.jsx
```

## Future Testing Improvements

### 1. **E2E Testing**
- Implement Cypress or Playwright for end-to-end testing
- Test complete user workflows
- Cross-browser testing

### 2. **Performance Testing**
- Add performance benchmarks
- Test component rendering times
- Monitor bundle size impact

### 3. **Visual Regression Testing**
- Implement visual regression testing
- Test UI consistency across changes
- Automated screenshot comparison

### 4. **API Testing**
- Test API integration points
- Mock API responses
- Test error handling

## Common Testing Patterns

### 1. **Testing Async Operations**
```javascript
test('should handle async data loading', async () => {
  render(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument();
  });
});
```

### 2. **Testing User Interactions**
```javascript
test('should handle form submission', async () => {
  const mockSubmit = jest.fn();
  render(<Form onSubmit={mockSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(mockSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
});
```

### 3. **Testing Conditional Rendering**
```javascript
test('should show loading state', () => {
  render(<Component isLoading={true} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('should show content when loaded', () => {
  render(<Component isLoading={false} />);
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

## Conclusion
This testing approach ensures the reliability and maintainability of the Bewize Dashboard application. By following these testing practices, we can confidently make changes and additions to the codebase while maintaining high quality standards.