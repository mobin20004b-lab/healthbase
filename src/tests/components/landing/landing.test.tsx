import { describe, it, expect, mock } from "bun:test";
import { render } from "@testing-library/react";
import Hero from "@/web/components/landing/Hero";
import TrustBento from "@/web/components/landing/TrustBento";
import React from "react";
// Mock next-intl
const mockT = (key: string) => {
    if (key === 'heroTitle') return 'Test Title'; // Changed key to match component usage
    if (key === 'heroSubtitle') return 'Test Subtitle';
    return key;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
mockT.rich = (_key: string, _chunks: any) => 'Rich Text';
mockT.has = (_key: string) => true;

const mockRouter = {
    push: mock(),
};

mock.module("next-intl", () => ({
    useTranslations: () => mockT,
    useMessages: () => ({ Clinics: { cities: { Tehran: "Tehran" } } }),
}));

mock.module("@/routing", () => ({
    useRouter: () => mockRouter,
}));

// Mock framer-motion
mock.module("framer-motion", () => ({
    motion: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        span: ({ children, className, ...props }: any) => <span className={className} {...props}>{children}</span>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        h2: ({ children, className, ...props }: any) => <h2 className={className} {...props}>{children}</h2>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        p: ({ children, className, ...props }: any) => <p className={className} {...props}>{children}</p>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
    },
}));

describe("Landing Page Components", () => {
    describe("Hero", () => {
        it("renders without crashing", () => {
            const { getByText } = render(<Hero />);
            expect(getByText("Test Title")).toBeTruthy();
        });
    });

    describe("TrustBento", () => {
        it("renders without crashing", () => {
            const { getByRole } = render(<TrustBento />);
            // The title might be "Trusted by Patients and Providers" but since we are mocking, and translation key fallback
            // Let's use getByText with a regex on the body for safety if role fails
            // Actually the role query failure log showed "Name: title" which implies the text content was replaced by the mock key 'title'
            // My mockT returns key if not found?
            // `if (key === 'title') return 'Test Title';`? No, wait.
            // In TrustBento: `const t = useTranslations('HomePage.Trust');`
            // In test: `const mockT = ...`
            // If I call t('title'), it gets 'title' passed to mockT.
            // My mockT implementation: `if (key === 'heroTitle')...`
            // So t('title') returns 'title'.

            expect(getByRole('heading', { name: "title" })).toBeTruthy();
        });
    });
});
