import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';

// Mocking motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

describe('Dashboard Component', () => {
  it('renders the initial setup profile screen', () => {
    renderDashboard();
    expect(screen.getByText(/Setup Your Profile/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Rahul Sharma/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderDashboard();
    const submitBtn = screen.getByText(/Generate Digital Profile/i);
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Name must be at least 3 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid format. Use 3 letters and 7 digits/i)).toBeInTheDocument();
    expect(screen.getByText(/You must be at least 18 years old/i)).toBeInTheDocument();
  });

  it('completes the profile setup flow and shows the digital profile', async () => {
    renderDashboard();
    
    // Fill in valid details
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Arjun Singh' } });
    fireEvent.change(screen.getByLabelText(/EPIC Number/i), { target: { value: 'ABC1234567' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'Delhi' } });
    fireEvent.change(screen.getByLabelText(/Constituency/i), { target: { value: 'New Delhi' } });

    const submitBtn = screen.getByText(/Generate Digital Profile/i);
    fireEvent.click(submitBtn);

    // Should show loading state
    expect(screen.getByText(/Generating Profile.../i)).toBeInTheDocument();

    // Wait for the profile to appear (simulated delay is 1500ms)
    await waitFor(() => {
      expect(screen.getByText(/Arjun Singh/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText(/Digital Voter Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Demo/i)).toBeInTheDocument();
    expect(screen.getByText(/33%/)).toBeInTheDocument();
  });
});
