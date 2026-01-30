
import { describe, it, expect, mock, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import React from 'react';
import { CompareTable, ComparableClinic } from "@/web/components/clinics/CompareTable";

// Mock translations
mock.module("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock Link
mock.module("@/routing", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock lucide-react icons
mock.module("lucide-react", () => ({
    Star: () => <span data-testid="icon-star" />,
    MapPin: () => <span data-testid="icon-map-pin" />,
    Calendar: () => <span data-testid="icon-calendar" />,
    Wallet: () => <span data-testid="icon-wallet" />,
    Check: () => <span data-testid="icon-check" />,
    X: () => <span data-testid="icon-x" />,
    ArrowRight: () => <span data-testid="icon-arrow-right" />,
}));

afterEach(() => {
    cleanup();
});

describe("CompareTable", () => {
    const mockClinics: ComparableClinic[] = [
        {
            id: "c1",
            name: "Clinic One",
            city: "City A",
            country: "Country A",
            averageRating: 4.5,
            services: [
                { id: "s1", name: "Service 1", priceMin: 100, priceMax: 200, currency: "USD", clinicId: "c1", categoryId: null, description: null, createdAt: new Date(), updatedAt: new Date(), translations: [] }
            ],
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: null,
            address: null,
            province: null,
            phone: null,
            image: null,
            website: null,
            insurances: [],
            specialties: [],
            favoritedBy: [],
            reviews: [],
            translations: [],
            owners: [],
        } as unknown as ComparableClinic,
         {
            id: "c2",
            name: "Clinic Two",
            city: "City B",
            country: "Country B",
            averageRating: 3.8,
            services: [],
            isVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: null,
            address: null,
            province: null,
            phone: null,
            image: null,
            website: null,
            insurances: [],
            specialties: [],
            favoritedBy: [],
            reviews: [],
            translations: [],
            owners: [],
        } as unknown as ComparableClinic
    ];

    it("renders clinic names", () => {
        render(<CompareTable clinics={mockClinics} />);
        expect(screen.getByText("Clinic One")).toBeDefined();
        expect(screen.getByText("Clinic Two")).toBeDefined();
    });

    it("renders rating", () => {
        render(<CompareTable clinics={mockClinics} />);
        expect(screen.getByText("4.5")).toBeDefined();
        expect(screen.getByText("3.8")).toBeDefined();
    });

    it("renders availability (mocked)", () => {
        render(<CompareTable clinics={mockClinics} />);
        expect(screen.getByText("Tomorrow")).toBeDefined();
        expect(screen.getByText("In 3 days")).toBeDefined();
    });

    it("renders cost range", () => {
        render(<CompareTable clinics={mockClinics} />);
        expect(screen.getByText("$100 - $200")).toBeDefined();
        expect(screen.getByText("Contact for pricing")).toBeDefined();
    });

    it("renders services", () => {
        render(<CompareTable clinics={mockClinics} />);
        expect(screen.getByText("Service 1")).toBeDefined();
        expect(screen.getByText("No services listed")).toBeDefined();
    });
});
