import { describe, it, expect, mock, beforeEach, afterEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import SearchFilters from "@/web/components/clinics/SearchFilters";

// Mock @/routing
const mockRouterPush = mock(() => {});
mock.module("@/routing", () => ({
  useRouter: () => ({ push: mockRouterPush }),
  usePathname: () => "/search",
}));

// Mock next/navigation
const mockSearchParams = new URLSearchParams();
mock.module("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
}));

// Mock next-intl
mock.module("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("SearchFilters", () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders checkboxes for specialties", () => {
    render(<SearchFilters />);
    // Use getAllByText if label text logic is simple, or getByLabelText if association works
    // Since useTranslations returns key, we look for 'specialties.Cardiology'
    expect(screen.getByLabelText("specialties.Cardiology")).toBeTruthy();
    expect(screen.getByLabelText("specialties.Dentistry")).toBeTruthy();
  });

  it("updates state and calls router.push with correct params when applied", () => {
    render(<SearchFilters />);

    // Click Cardiology
    const cardCheckbox = screen.getByLabelText("specialties.Cardiology");
    fireEvent.click(cardCheckbox);

    // Click Insurance Salamat
    const salamatCheckbox = screen.getByLabelText("insurances.Salamat");
    fireEvent.click(salamatCheckbox);

    // Click Apply
    const applyBtn = screen.getByText("applyFilters");
    fireEvent.click(applyBtn);

    // Check router push
    expect(mockRouterPush).toHaveBeenCalled();
    const calledUrl = mockRouterPush.mock.calls[0][0];

    // Check for params
    // URLSearchParams might order keys differently, but we check containment
    expect(calledUrl).toContain("specialty=Cardiology");
    expect(calledUrl).toContain("insurance=Salamat");
  });
});
