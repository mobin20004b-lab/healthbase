
import { describe, it, expect, afterEach } from 'bun:test';
import { render, screen, cleanup } from '@testing-library/react';
import { getClinicComparisonDetails } from './mock-data';
import { AvailabilityVisualizer } from './AvailabilityVisualizer';
import { RatingVisualizer } from './RatingVisualizer';
import { CostVisualizer } from './CostVisualizer';

describe('Clinic Comparison Visualizers', () => {
    afterEach(() => {
        cleanup();
    });

    describe('getClinicComparisonDetails', () => {
        it('should return deterministic data for a given clinicId', () => {
            const id = 'test-clinic-1';
            const result1 = getClinicComparisonDetails(id);
            const result2 = getClinicComparisonDetails(id);
            expect(result1).toEqual(result2);
        });

        it('should return different data for different clinicIds (likely)', () => {
            const result1 = getClinicComparisonDetails('clinic-a');
            const result2 = getClinicComparisonDetails('clinic-b');
            // This might fail if hash collision, but unlikely for these inputs with this simple hash
            expect(result1).not.toEqual(result2);
        });
    });

    describe('AvailabilityVisualizer', () => {
        it('should render "Tomorrow" with green style', () => {
            render(<AvailabilityVisualizer availability="Tomorrow" />);
            const element = screen.getByText('Tomorrow');
            expect(element).toBeTruthy();
            // Check for a class that indicates green style (part of the class string)
            expect(element.className).toContain('text-green-700');
        });

        it('should render "Next Week" with amber style', () => {
            render(<AvailabilityVisualizer availability="Next Week" />);
            const element = screen.getByText('Next Week');
            expect(element).toBeTruthy();
            expect(element.className).toContain('text-amber-700');
        });
    });

    describe('RatingVisualizer', () => {
        it('should render rating and wait time', () => {
            render(<RatingVisualizer rating={4.5} reviewCount={10} waitTime={15} />);
            expect(screen.getByText('4.5')).toBeTruthy();
            expect(screen.getByText('(10 reviews)')).toBeTruthy();
            expect(screen.getByText('Avg Wait: 15 min')).toBeTruthy();
        });
    });

    describe('CostVisualizer', () => {
        it('should render cost level', () => {
             // We can check if it renders without crashing.
            const { container } = render(<CostVisualizer cost="$$" />);
            expect(container.firstChild).toBeTruthy();
        });
    });
});
