import { describe, test, expect, afterEach, mock } from 'bun:test';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CompareTable from '@/web/components/clinics/CompareTable';
import { ClinicWithRelations } from '@/services/clinics';

// Mock next/image
mock.module('next/image', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @next/next/no-img-element, jsx-a11y/alt-text
    default: (props: any) => <img {...props} />
}));

// Mock dependencies
const mockClinics: ClinicWithRelations[] = [
    {
        id: 'c1',
        name: 'Clinic One',
        description: 'Desc 1',
        address: 'Addr 1',
        city: 'City 1',
        province: 'Prov 1',
        country: 'Country 1',
        phone: '123',
        image: 'https://example.com/img1.jpg', // Use absolute URL to be safe
        website: 'web1',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        averageRating: 4.5,
        reviewCount: 10,
        services: [],
        translations: [],
        reviews: [],
        favoritedBy: [],
        isFavorited: false
    },
    {
        id: 'c2',
        name: 'Clinic Two',
        description: 'Desc 2',
        address: 'Addr 2',
        city: 'City 2',
        province: 'Prov 2',
        country: 'Country 2',
        phone: '456',
        image: null,
        website: 'web2',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        averageRating: 3.0,
        reviewCount: 5,
        services: [],
        translations: [],
        reviews: [],
        favoritedBy: [],
        isFavorited: false
    }
];

describe('CompareTable', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders no clinics message when empty', () => {
        render(<CompareTable clinics={[]} />);
        expect(screen.getByText('No clinics selected for comparison.')).toBeTruthy();
    });

    test('renders clinic names and rows when data provided', () => {
        render(<CompareTable clinics={mockClinics} />);

        // Check for clinic names
        expect(screen.getByText('Clinic One')).toBeTruthy();
        expect(screen.getByText('Clinic Two')).toBeTruthy();

        // Check for sticky headers/labels
        expect(screen.getByText('Patient Rating')).toBeTruthy();
        expect(screen.getByText('Next Available')).toBeTruthy();
        expect(screen.getByText('Estimated Cost')).toBeTruthy();
        expect(screen.getByText('Services')).toBeTruthy();
    });
});
