import { describe, it, expect, mock, beforeEach } from "bun:test";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import SearchPage from "@/app/[locale]/(marketing)/search/page";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { MOCK_MESSAGES } from "../steps/mock-data";

// Mock Next.js Navigation
const mockRouter = { push: mock(), replace: mock(), back: mock() };
let mockSearchParams = new URLSearchParams();

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

describe("SearchPage Integration", () => {
    beforeEach(() => {
        cleanup();
        mockRouter.push.mockClear();
        mockSearchParams = new URLSearchParams();
    });

  it("updates the URL when applying filters", async () => {
    renderSearchPage();

    // Simulate typing in search
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Heart" } });

    // Simulate clicking Apply Filters
    const applyButton = screen.getByText("Apply Filters");
    fireEvent.click(applyButton);

    await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalled();
        // Check if the URL contains the query parameter
        const calledUrl = mockRouter.push.mock.calls[0][0];
        expect(calledUrl).toContain("q=Heart");
    });
  });

  it("filters clinics based on search params", () => {
      // Setup mock params before render
      mockSearchParams.set('q', 'Heart');

      renderSearchPage();

      // Should show Heart Center
      expect(screen.getByText("Tehran Heart Center")).toBeTruthy();

      // Should NOT show something irrelevant (if mock data has it)
      // We know mock data has "Razavi Hospital", let's check it's NOT there if filtering is working correctly on client side.
      // Wait, the client side filtering logic is:
      // if (q && !clinic.name.toLowerCase().includes(q) ...)

      // "Tehran Heart Center" includes "Heart"
      // "Razavi Hospital" does not.

      expect(screen.queryByText("Razavi Hospital")).toBeNull();
  });

    it("clears filters when 'Clear All' is clicked", async () => {
        // Setup mock params to simulate active filters
        mockSearchParams.set('q', 'Heart');

        renderSearchPage();

        // Check if Clear All exists
        const clearButton = screen.getByText("Clear All");
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(mockRouter.push).toHaveBeenCalledWith("/clinics");
        });
    });
});
