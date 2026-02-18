import { describe, it, expect, mock, beforeEach } from "bun:test";
import { submitInquiry } from "@/app/actions/inquiry";

// Mock auth
const mockAuth = mock(() => Promise.resolve({ user: { id: "user-123" } }));
mock.module("@/auth", () => ({
  auth: mockAuth,
}));

// Mock prisma
const mockCreate = mock(() => Promise.resolve({ id: "inquiry-123" }));
mock.module("@/lib/prisma", () => ({
  default: {
    inquiry: {
      create: mockCreate,
    },
  },
}));

// Mock next/cache
mock.module("next/cache", () => ({
  revalidatePath: mock(() => {}),
}));

describe("submitInquiry", () => {
  beforeEach(() => {
    mockCreate.mockClear();
    mockAuth.mockClear();
    // Default auth behavior
    mockAuth.mockImplementation(() => Promise.resolve({ user: { id: "user-123" } }));
  });

  it("should return error if not logged in", async () => {
    // Override auth for this test
    mockAuth.mockImplementation(() => Promise.resolve(null));

    const formData = new FormData();
    formData.append("clinicId", "clinic-123");
    formData.append("message", "Test message");
    formData.append("contactMethod", "WHATSAPP");

    // Pass empty state as first arg
    const result = await submitInquiry({}, formData);
    expect(result.error).toBe("You must be logged in to submit an inquiry.");
  });

  it("should return validation errors for invalid data", async () => {
    const formData = new FormData();
    // Missing fields

    const result = await submitInquiry({}, formData);
    expect(result.error).toContain("Invalid form data");
    expect(result.fieldErrors).toBeDefined();
  });

  it("should create inquiry on success", async () => {
    const formData = new FormData();
    formData.append("clinicId", "clinic-123");
    formData.append("message", "This is a valid message longer than 10 chars");
    formData.append("contactMethod", "WHATSAPP");
    formData.append("serviceInterest", "Dental Checkup");

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(mockCreate).toHaveBeenCalled();
    const callArg = mockCreate.mock.calls[0][0];

    // Check data
    expect(callArg.data.clinicId).toBe("clinic-123");
    expect(callArg.data.userId).toBe("user-123");
    expect(callArg.data.serviceInterest).toBe("Dental Checkup");
    expect(callArg.data.message).toBe("This is a valid message longer than 10 chars");
    expect(callArg.data.contactMethod).toBe("WHATSAPP");
    expect(callArg.data.status).toBe("PENDING");
  });
});
