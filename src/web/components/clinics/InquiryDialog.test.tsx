import { describe, it, expect, mock, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import { InquiryDialog } from "./InquiryDialog";
import * as React from "react";

// Mock submitInquiry action
mock.module("@/app/actions/inquiry", () => ({
  submitInquiry: mock(() => Promise.resolve({ success: true })),
}));

// Mock useDialog hook and components from UI library
const mockSetOpen = mock(() => {});
mock.module("@/web/components/ui/dialog", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Dialog: ({ children }: any) => <div>{children}</div>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DialogTitle: ({ children }: any) => <h1>{children}</h1>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DialogDescription: ({ children }: any) => <p>{children}</p>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DialogTrigger: ({ children, asChild }: any) => (
    asChild ? children : <button data-testid="dialog-trigger">{children}</button>
  ),
  useDialog: () => ({ setOpen: mockSetOpen }),
}));

// Mock sonner
mock.module("sonner", () => ({
  toast: {
    success: mock(),
    error: mock(),
  },
}));

describe("InquiryDialog", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders trigger button", () => {
    render(<InquiryDialog clinicId="123" services={[]} />);
    // Since asChild is true, it renders Button directly.
    expect(screen.getByRole("button", { name: "Request Info" })).toBeTruthy();
  });

  it("renders form inside dialog", () => {
    render(<InquiryDialog clinicId="123" services={[{ id: "s1", name: "Service 1" }]} />);
    // Since we mocked Dialog to just render children, content is visible immediately in this mock setup
    expect(screen.getByText("Contact Clinic")).toBeTruthy();
    expect(screen.getByLabelText("Message")).toBeTruthy();
    expect(screen.getByText("Service 1")).toBeTruthy();
  });
});
