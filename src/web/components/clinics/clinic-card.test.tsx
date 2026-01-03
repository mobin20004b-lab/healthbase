import { describe, it, expect, beforeAll } from "bun:test";
import React from "react";
import { render } from "@testing-library/react";
import { ClinicCard } from "./clinic-card";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Initialize happy-dom for testing React components
GlobalRegistrator.register();

describe("ClinicCard", () => {
    // Mock Clinic object
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

    it("renders clinic name and location", () => {
        const { getByText } = render(<ClinicCard clinic={mockClinic} />);
        expect(document.body.innerHTML).toContain("Tehran Heart Center");
        expect(document.body.innerHTML).toContain("Tehran, Iran");
    });

    it("renders rating and review count", () => {
        const { getByText } = render(<ClinicCard clinic={mockClinic} rating={4.5} reviewCount={120} />);
        expect(document.body.innerHTML).toContain("4.5");
        expect(document.body.innerHTML).toContain("(120)");
    });

    it("renders verified badge when clinic is verified", () => {
        const { getByText } = render(<ClinicCard clinic={mockClinic} />);
        expect(document.body.innerHTML).toContain("Verified");
    });

    it("renders availability pill", () => {
        const { getByText } = render(<ClinicCard clinic={mockClinic} nextAvailable="Tomorrow" />);
        expect(document.body.innerHTML).toContain("Available Tomorrow");
    });
});
