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
        render(<Checkbox checked={false} onChange={() => {}} />);
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes[0]).toBeDefined();
    });

    it('renders checked state', () => {
        render(<Checkbox checked={true} onChange={() => {}} />);
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
        expect(checkboxes[0].checked).toBe(true);
        expect(screen.getByTestId('check-icon')).toBeDefined();
    });

    it('calls onChange when clicked', () => {
        let checked = false;
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            checked = e.target.checked;
        };
        render(<Checkbox checked={checked} onChange={onChange} />);

        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);
        expect(checked).toBe(true);
    });
});
