import { describe, it, expect, mock, afterEach } from 'bun:test';
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { InquiryDialog } from '@/web/components/clinic/InquiryDialog';

// Mock next-intl
mock.module('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock lucid-react icons
mock.module('lucide-react', () => ({
  MessageSquarePlus: () => <span data-testid="icon-message-square-plus" />,
  Send: () => <span data-testid="icon-send" />,
  CheckCircle2: () => <span data-testid="icon-check-circle" />,
  X: () => <span data-testid="icon-x" />,
}));

// Mock the server action module fully to prevent trying to load Prisma client or NextAuth
mock.module('@/app/actions/inquiry', () => ({
  submitInquiry: mock(() => Promise.resolve({ success: true })),
}));

// Mock useActionState since it requires Next.js React experimental bundle in real env
mock.module('react', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const actual = require('react');
  return {
    ...actual,
    useActionState: mock((action, initialState) => {
      return [initialState, () => {}, false];
    }),
  };
});

describe('InquiryDialog and InquiryForm', () => {
  afterEach(() => {
    cleanup();
    mock.restore();
  });

  it('renders the trigger button correctly', () => {
    render(<InquiryDialog clinicId="123" clinicName="Test Clinic" />);

    // Fallback trigger text is 'Request Info' but our mock translation returns the key
    const button = screen.getByRole('button', { name: /trigger/i });
    expect(button).toBeTruthy();
    expect(screen.getByTestId('icon-message-square-plus')).toBeTruthy();
  });

  it('opens dialog on trigger click and displays form', async () => {
    render(<InquiryDialog clinicId="123" clinicName="Test Clinic" />);

    const triggerBtn = screen.getByRole('button', { name: /trigger/i });
    fireEvent.click(triggerBtn);

    // Dialog should open
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeTruthy();

    // Verify dialog header
    expect(screen.getByText('title')).toBeTruthy();
    expect(screen.getByText('Test Clinic')).toBeTruthy();

    // Verify form fields
    expect(screen.getByPlaceholderText('serviceInterestPlaceholder')).toBeTruthy();
    expect(screen.getByPlaceholderText('messagePlaceholder')).toBeTruthy();

    // Contact methods
    expect(screen.getByText('phone')).toBeTruthy();
    expect(screen.getByText('whatsapp')).toBeTruthy();
  });

  it('displays success state when useActionState returns success', async () => {
    // Override useActionState mock for this specific test
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useActionState } = require('react');
    useActionState.mockImplementation(() => [{ success: true }, () => {}, false]);

    render(<InquiryDialog clinicId="123" clinicName="Test Clinic" />);

    // Open dialog
    fireEvent.click(screen.getByRole('button', { name: /trigger/i }));

    await screen.findByRole('dialog');

    // Should display success message instead of form
    expect(screen.getByText('successTitle')).toBeTruthy();
    expect(screen.getByText('successMessage')).toBeTruthy();
    expect(screen.getByTestId('icon-check-circle')).toBeTruthy();
    expect(screen.getAllByRole('button', { name: /close/i })[0]).toBeTruthy();
  });

  it('displays pending state properly', async () => {
    // Override useActionState mock for this specific test
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useActionState } = require('react');
    useActionState.mockImplementation(() => [{ success: undefined }, () => {}, true]); // isPending = true

    render(<InquiryDialog clinicId="123" clinicName="Test Clinic" />);

    // Open dialog
    fireEvent.click(screen.getByRole('button', { name: /trigger/i }));

    await screen.findByRole('dialog');

    // Submit button should show 'submitting'
    expect(screen.getByRole('button', { name: /submitting/i })).toBeTruthy();
  });
});