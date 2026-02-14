
import { describe, it, expect, afterEach, mock } from 'bun:test';
import { render, screen, cleanup } from '@testing-library/react';
import CompareTable from './CompareTable';
import type { ClinicWithRelations } from '@/services/clinics';

// Mock dependencies
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MockIcon = ({ className }: { className?: string }) => <span className={className} data-testid="lucide-icon" />;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MockImage = (props: any) => <img {...props} alt={props.alt} />;

mock.module("lucide-react", () => ({
    Star: MockIcon,
    MapPin: MockIcon,
    Calendar: MockIcon,
    Wallet: MockIcon,
}));

mock.module("next/image", () => ({
    default: MockImage,
    __esModule: true,
}));

// Mock Prisma to prevent DB connection during component tests
mock.module("@/lib/prisma", () => ({
    default: {},
}));

// Setup mock data
const mockClinics: ClinicWithRelations[] = [
    {
        id: '1',
        name: 'Clinic A',
        city: 'City A',
        averageRating: 4.5,
        reviewCount: 10,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        services: [{ id: 's1', name: 'Service 1', createdAt: new Date(), updatedAt: new Date(), categoryId: 'c1', description: 'desc', clinicId: '1' }] as any,
        image: '/img1.jpg',
        description: 'Description A',
        address: 'Address A',
        province: 'Province A',
        country: 'Country A',
        phone: '123',
        website: 'web.com',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        reviews: [],
        favoritedBy: []
    } as unknown as ClinicWithRelations,
    {
        id: '2',
        name: 'Clinic B',
        city: 'City B',
        averageRating: 3.0,
        reviewCount: 5,
        services: [],
        image: null,
        description: 'Description B',
        address: 'Address B',
        province: 'Province B',
        country: 'Country B',
        phone: '456',
        website: 'web.com',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        reviews: [],
        favoritedBy: []
    } as unknown as ClinicWithRelations
];

describe('CompareTable', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders "No clinics selected" when empty', () => {
        render(<CompareTable clinics={[]} />);
        expect(screen.getByText('No clinics selected for comparison.')).toBeTruthy();
    });

    it('renders clinic names and cities', () => {
        render(<CompareTable clinics={mockClinics} />);
        expect(screen.getByText('Clinic A')).toBeTruthy();
        expect(screen.getByText('City A')).toBeTruthy();
        expect(screen.getByText('Clinic B')).toBeTruthy();
        expect(screen.getByText('City B')).toBeTruthy();
    });

    it('renders visualizer sections', () => {
        render(<CompareTable clinics={mockClinics} />);
        expect(screen.getByText('Rating & Wait')).toBeTruthy();
        expect(screen.getByText('Next Available')).toBeTruthy();
        expect(screen.getByText('Estimated Cost')).toBeTruthy();
    });

    it('renders rating visualizer content', () => {
        render(<CompareTable clinics={mockClinics} />);
        // RatingVisualizer renders rating with fixed(1)
        expect(screen.getByText('4.5')).toBeTruthy();
        expect(screen.getByText('3.0')).toBeTruthy();
        // It also renders "Avg. Wait"
        expect(screen.getAllByText('Avg. Wait').length).toBe(2);
    });

    it('renders cost visualizer content', () => {
        render(<CompareTable clinics={mockClinics} />);
        // Cost visualizer renders mock cost range like $50 - $100.
        // The text is split by elements (icon + text), so we search for text content.
        // However, CostVisualizer puts text inside the same div as icon.
        // We can check if any element contains '$'.
        // Since getByText checks textContent, it should work if the text is direct child or we use regex.
        const dollars = screen.getAllByText(/\$/);
        expect(dollars.length).toBeGreaterThan(0);
    });
});
