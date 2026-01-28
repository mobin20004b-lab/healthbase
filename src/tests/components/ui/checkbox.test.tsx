import { expect, test, describe, afterEach, mock } from "bun:test";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Checkbox } from "@/web/components/ui/checkbox";
import React from "react";

// Mock @/lib/utils
mock.module("@/lib/utils", () => ({
  cn: (...inputs: any[]) => inputs.join(" "),
}));

// Mock lucide-react
mock.module("lucide-react", () => ({
  Check: () => <div data-testid="check-icon" />,
}));

describe("Checkbox", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders correctly", () => {
    render(<Checkbox data-testid="test-checkbox" />);
    expect(screen.getByTestId("test-checkbox")).toBeTruthy();
  });

  test("toggles checked state", () => {
    render(<Checkbox data-testid="test-checkbox" />);
    const checkbox = screen.getByTestId("test-checkbox") as HTMLInputElement;

    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
