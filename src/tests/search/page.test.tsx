import { describe, it, expect, mock, beforeAll } from "bun:test";
import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchPage from '@/app/[locale]/(marketing)/search/page';

// Mock dependencies
const mockPush = mock(() => {});
const mockSearchParams = new URLSearchParams();

mock.module("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
  usePathname: () => "/en/search",
}));

mock.module("@/routing", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => "/en/search",
}));

// Mock simple translations
mock.module("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("SearchPage", () => {
    it("renders the page title", () => {
        render(<SearchPage />);
        expect(screen.getByText("Find Your Care")).toBeTruthy();
    });

    it("renders the filters sidebar", () => {
        render(<SearchPage />);
        // SearchFilters is in the sidebar
        // getAllByText returns an array, so checking truthiness of the result is correct if we want to ensure it exists
        // Use getAllByText for 'search' as it appears as label
        expect(screen.getAllByText("search").length).toBeGreaterThan(0);
    });

    it("renders clinic cards", () => {
        render(<SearchPage />);
        // Check for at least one mock clinic name
        // Use getAllByText because it might appear in the mobile filter preview or elsewhere if duplicated
        expect(screen.getAllByText("Tehran Heart Center").length).toBeGreaterThan(0);
    });
});
