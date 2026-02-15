import { describe, it, expect, afterEach } from "bun:test";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import CompareTable from "./CompareTable";

describe("CompareTable", () => {
    afterEach(() => {
        cleanup();
    });

    // Mock Clinic object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockClinics: any[] = [
        {
            id: "c1",
            name: "Clinic One",
            city: "City A",
            averageRating: 4.5,
            reviewCount: 10,
            services: [{ id: 's1', name: 'Service 1' }],
            image: null,
        },
        {
            id: "c2",
            name: "Clinic Two",
            city: "City B",
            averageRating: 3.0,
            reviewCount: 5,
            services: [],
            image: null,
        }
    ];

    it("renders empty state", () => {
        const { getByText } = render(<CompareTable clinics={[]} />);
        expect(getByText("No clinics selected for comparison.")).toBeTruthy();
    });

    it("renders clinic names", () => {
        const { getByText } = render(<CompareTable clinics={mockClinics} />);
        expect(getByText("Clinic One")).toBeTruthy();
        expect(getByText("Clinic Two")).toBeTruthy();
    });

    it("renders rating visualizer content", () => {
         const { getByText } = render(<CompareTable clinics={mockClinics} />);
         expect(getByText("4.5")).toBeTruthy();
         expect(getByText("(10)")).toBeTruthy();
    });
});
