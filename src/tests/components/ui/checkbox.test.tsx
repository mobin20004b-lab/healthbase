import { describe, it, expect, afterEach } from 'bun:test';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '@/web/components/ui/checkbox';
import React from 'react';

// Mock lucide-react
import { mock } from 'bun:test';
mock.module("lucide-react", () => ({
    Check: () => <span data-testid="check-icon" />
}));

describe('Checkbox', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders checkbox', () => {
        const { container } = render(<Checkbox checked={false} onChange={() => {}} />);
        const checkbox = container.querySelector('input[type="checkbox"]');
        expect(checkbox).toBeDefined();
    });

    it('renders checked state', () => {
        const { container } = render(<Checkbox checked={true} onChange={() => {}} />);
        const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
        expect(screen.getByTestId('check-icon')).toBeDefined();
    });

    it('calls onChange when clicked', () => {
        let checked = false;
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            checked = e.target.checked;
        };
        const { container } = render(<Checkbox checked={checked} onChange={onChange} />);

        const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
        fireEvent.click(checkbox);
        expect(checked).toBe(true);
    });
});
