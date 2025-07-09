import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// Mock the child components
jest.mock('../components/Navbar', () => {
  return function MockNavbar({ onToggleSidebar }) {
    return (
      <nav data-testid="navbar">
        <button onClick={onToggleSidebar} data-testid="toggle-sidebar-btn">
          Toggle Sidebar
        </button>
      </nav>
    );
  };
});

jest.mock('../components/Sidebar', () => {
  return function MockSidebar({ isOpen }) {
    return (
      <aside data-testid="sidebar" data-is-open={isOpen}>
        Sidebar Content
      </aside>
    );
  };
});

// Helper to render with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('DashboardLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the layout structure correctly', () => {
      renderWithRouter(
        <DashboardLayout>
          <div data-testid="main-content">Main Content</div>
        </DashboardLayout>
      );

      // Check if main layout elements are present
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('main-content')).toBeInTheDocument();
    });

    it('renders children content in the main area', () => {
      const testContent = 'Test Dashboard Content';
      renderWithRouter(
        <DashboardLayout>
          <div>{testContent}</div>
        </DashboardLayout>
      );

      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('applies correct CSS classes to layout elements', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      // Check if the main container has the correct classes
      const mainContainer = screen.getByTestId('sidebar').parentElement;
      expect(mainContainer).toHaveClass('flex', 'h-screen', 'bg-gray-100');
    });
  });

  describe('Sidebar Toggle Functionality', () => {
    it('initializes with sidebar closed by default', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      const sidebar = screen.getByTestId('sidebar');
      expect(sidebar).toHaveAttribute('data-is-open', 'false');
    });

    it('toggles sidebar state when toggle button is clicked', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      const toggleButton = screen.getByTestId('toggle-sidebar-btn');
      const sidebar = screen.getByTestId('sidebar');

      // Initially closed
      expect(sidebar).toHaveAttribute('data-is-open', 'false');

      // Click to open
      fireEvent.click(toggleButton);
      expect(sidebar).toHaveAttribute('data-is-open', 'true');

      // Click to close
      fireEvent.click(toggleButton);
      expect(sidebar).toHaveAttribute('data-is-open', 'false');
    });

    it('maintains sidebar state across multiple toggles', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      const toggleButton = screen.getByTestId('toggle-sidebar-btn');
      const sidebar = screen.getByTestId('sidebar');

      // Multiple toggles
      fireEvent.click(toggleButton); // false -> true
      fireEvent.click(toggleButton); // true -> false
      fireEvent.click(toggleButton); // false -> true
      fireEvent.click(toggleButton); // true -> false

      expect(sidebar).toHaveAttribute('data-is-open', 'false');
    });
  });

  describe('Component Integration', () => {
    it('passes correct props to Navbar component', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      const navbar = screen.getByTestId('navbar');
      expect(navbar).toBeInTheDocument();
    });

    it('passes correct props to Sidebar component', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      const sidebar = screen.getByTestId('sidebar');
      expect(sidebar).toBeInTheDocument();
      expect(sidebar).toHaveAttribute('data-is-open');
    });

    it('renders main content area with correct styling', () => {
      renderWithRouter(
        <DashboardLayout>
          <div data-testid="main-content">Content</div>
        </DashboardLayout>
      );

      const mainContent = screen.getByTestId('main-content').parentElement;
      expect(mainContent).toHaveClass('flex-1', 'p-4', 'overflow-y-auto');
    });
  });

  describe('Layout Structure', () => {
    it('has proper flex layout structure', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      // The main container should have flex and h-screen
      const mainContainer = screen.getByTestId('sidebar').parentElement;
      expect(mainContainer).toHaveClass('flex', 'h-screen', 'bg-gray-100');

      // The content area should have flex-1 and flex
      const contentArea = screen.getByTestId('sidebar').nextElementSibling;
      expect(contentArea).toHaveClass('flex-1', 'flex', 'flex-col');
    });

    it('renders all required sections', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      // Check for main element
      const mainElement = screen.getByText('Content').parentElement;
      expect(mainElement.tagName).toBe('MAIN');
    });

    it('provides proper navigation structure', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      );

      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithRouter(<DashboardLayout />);

      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    it('handles multiple children correctly', () => {
      renderWithRouter(
        <DashboardLayout>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
        </DashboardLayout>
      );

      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
    });

    it('handles complex nested children', () => {
      renderWithRouter(
        <DashboardLayout>
          <div>
            <h1>Title</h1>
            <p>Paragraph</p>
            <button>Button</button>
          </div>
        </DashboardLayout>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });
}); 