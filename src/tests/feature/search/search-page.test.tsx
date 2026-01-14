import { describe, it, expect, mock, beforeEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import SearchPage from "@/app/[locale]/(marketing)/search/page";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { MOCK_MESSAGES } from "./steps/mock-data";

// Mock Next.js Navigation
const mockRouter = { push: mock(), replace: mock(), back: mock() };
const mockSearchParams = new URLSearchParams();

mock.module("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
  usePathname: () => "/search",
}));

mock.module("@/routing", () => ({
  useRouter: () => mockRouter,
  usePathname: () => "/search",
}));

// Mock Lucide Icons
mock.module("lucide-react", () => ({
    Search: () => <svg data-testid="icon-search" />,
    ChevronDown: () => <svg data-testid="icon-chevron-down" />,
    Map: () => <svg data-testid="icon-map" />,
    List: () => <svg data-testid="icon-list" />,
    MapPin: () => <svg data-testid="icon-map-pin" />,
    Star: () => <svg data-testid="icon-star" />,
    Calendar: () => <svg data-testid="icon-calendar" />,
    Check: () => <svg data-testid="icon-check" />,
    ArrowRight: () => <svg data-testid="icon-arrow-right" />,
}));

// Setup Component Wrapper
const renderSearchPage = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={MOCK_MESSAGES}>
      <SearchPage />
    </NextIntlClientProvider>
  );
};

describe("SearchPage Feature", () => {
    beforeEach(() => {
        cleanup();
        mockRouter.push.mockClear();
    });

  it("renders the search page structure", () => {
    renderSearchPage();
    // Check for Main Filters in Sidebar
    expect(screen.getAllByText("Filters")[0]).toBeTruthy(); // Sidebar title

    // Check for Search Input
    expect(screen.getByPlaceholderText("Search...")).toBeTruthy();

    // Check for Clinic Cards (assuming mock data has at least one)
    expect(screen.getByText("Tehran Heart Center")).toBeTruthy();
  });

  it("toggles map view on mobile (button click)", () => {
      // Mock window.innerWidth if needed, but we can just check if the button exists and works logic-wise
      renderSearchPage();
      const toggleButton = screen.getByText("Show Map");
      fireEvent.click(toggleButton);

      expect(screen.getByText("Show List")).toBeTruthy();
      expect(screen.getByText("Interactive Map")).toBeTruthy();
  });
});
