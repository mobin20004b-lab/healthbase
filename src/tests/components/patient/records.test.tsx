import React from 'react';
import { describe, it, expect, afterEach } from 'bun:test';
import { render, cleanup } from '@testing-library/react';
import { HealthPassport } from '@/web/components/patient/records/HealthPassport';
import { LabResultsTable } from '@/web/components/patient/records/LabResultsTable';

describe('Medical Records Components', () => {
    afterEach(() => {
        cleanup();
    });

    describe('HealthPassport', () => {
        it('renders Health Passport title and blood type', () => {
            const { getByText } = render(<HealthPassport />);
            expect(getByText('Health Passport')).toBeTruthy();
            expect(getByText('Blood Type')).toBeTruthy();
            expect(getByText('O+')).toBeTruthy();
        });

        it('renders allergies', () => {
             const { getByText } = render(<HealthPassport />);
             expect(getByText('Allergies')).toBeTruthy();
             expect(getByText('Penicillin')).toBeTruthy();
             expect(getByText('Peanuts')).toBeTruthy();
        });
    });

    describe('LabResultsTable', () => {
        it('renders table headers', () => {
            const { getByText } = render(<LabResultsTable />);
            expect(getByText('Test Name')).toBeTruthy();
            expect(getByText('Result')).toBeTruthy();
            expect(getByText('Normal Range')).toBeTruthy();
        });

        it('renders mock data items', () => {
            const { getByText } = render(<LabResultsTable />);
            expect(getByText('Hemoglobin A1c')).toBeTruthy();
            expect(getByText('Cholesterol, Total')).toBeTruthy();
            expect(getByText('LDL Cholesterol')).toBeTruthy();
            expect(getByText('HDL Cholesterol')).toBeTruthy();
            expect(getByText('Triglycerides')).toBeTruthy();
        });
    });
});
