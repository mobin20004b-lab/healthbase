import { describe, it, expect, mock, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Checkbox } from '@/web/components/ui/checkbox';
import React from 'react';

// Mock Lucide icons
mock.module('lucide-react', () => ({
  Check: () => <span data-testid="check-icon" />,
}));

afterEach(() => {
  cleanup();
});

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox).toBeTruthy();
    expect(checkbox.checked).toBe(false);
  });

  it('toggles state when clicked', () => {
    const handleChange = mock();
    render(<Checkbox data-testid="checkbox" onCheckedChange={handleChange} />);
    const checkbox = screen.getByTestId('checkbox');

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  it('respects checked prop (controlled)', () => {
    const handleChange = mock();
    render(<Checkbox checked={true} onCheckedChange={handleChange} readOnly />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('is disabled when disabled prop is passed', () => {
      render(<Checkbox disabled data-testid="checkbox" />);
      const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
  });
});
