import { describe, it, expect, mock, afterEach } from "bun:test";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ClinicCard } from "./clinic-card";

// Mock @/routing Link
mock.module("@/routing", () => ({
    Link: ({ children, href, className, ...props }: any) => (
        <a href={href} className={className} {...props}>
            {children}
        </a>
    ),
}));

// Mock Lucide icons to avoid rendering SVG complexity
mock.module("lucide-react", () => ({
    MapPin: () => <div data-testid="icon-map-pin" />,
    Star: () => <div data-testid="icon-star" />,
    Calendar: () => <div data-testid="icon-calendar" />,
    Check: () => <div data-testid="icon-check" />,
    ArrowRight: () => <div data-testid="icon-arrow-right" />,
}));

describe("ClinicCard", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockClinic: any = {
        id: "c1",
        name: "Tehran Heart Center",
        city: "Tehran",
        country: "Iran",
        image: null,
        isVerified: true,
        description: "A specialized heart center.",
        address: "Kargar St",
        province: "Tehran",
        phone: "+982188029600",
        website: "http://thc.tums.ac.ir",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    afterEach(() => {
        cleanup();
    });

    it("renders clinic name and location", () => {
        const { getByText } = render(<ClinicCard clinic={mockClinic} />);
        expect(getByText("Tehran Heart Center")).toBeDefined();
        // The text might be split across elements, so check for partial match or specific container
        expect(document.body.innerHTML).toContain("Tehran");
        expect(document.body.innerHTML).toContain("Iran");
    });

    it("renders rating and review count", () => {
        const { getByText } = render(<ClinicCard clinic={mockClinic} rating={4.5} reviewCount={120} />);
        expect(getByText("4.5")).toBeDefined();
        expect(getByText("(120)")).toBeDefined();
    });

    it("renders verified badge when clinic is verified", () => {
        const { getByText } = render(<ClinicCard clinic={mockClinic} />);
        expect(getByText("Verified")).toBeDefined();
    });

    it("renders availability pill", () => {
        const { getByText } = render(<ClinicCard clinic={mockClinic} nextAvailable="Tomorrow" />);
        expect(getByText("Available Tomorrow")).toBeDefined();
    });
});
