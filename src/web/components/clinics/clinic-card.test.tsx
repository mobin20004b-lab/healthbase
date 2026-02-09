import { describe, it, expect, mock } from "bun:test";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ClinicCard } from "./clinic-card";
import type { Clinic } from "@prisma/client";

// Mock @/routing
mock.module("@/routing", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Link: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

describe("ClinicCard", () => {
    const mockClinic: Clinic = {
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
        expect(getByText("Tehran Heart Center")).toBeTruthy();
        // Since city and country are in a span
        expect(document.body.innerHTML).toContain("Tehran, Iran");
        cleanup();
    });

    it("renders rating and review count", () => {
        render(<ClinicCard clinic={mockClinic} rating={4.5} reviewCount={120} />);
        expect(document.body.innerHTML).toContain("4.5");
        expect(document.body.innerHTML).toContain("(120)");
        cleanup();
    });

    it("renders verified badge when clinic is verified", () => {
        render(<ClinicCard clinic={mockClinic} />);
        expect(document.body.innerHTML).toContain("Verified");
        cleanup();
    });

    it("renders availability pill", () => {
        render(<ClinicCard clinic={mockClinic} nextAvailable="Tomorrow" />);
        expect(document.body.innerHTML).toContain("Available Tomorrow");
        cleanup();
    });
});
