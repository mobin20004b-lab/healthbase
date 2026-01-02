
import { describe, expect, test, mock, beforeEach } from "bun:test";
import { POST } from "./route";

// Mock NextResponse
const jsonMock = mock(() => ({}));
const statusMock = mock(() => ({}));

// We need to mock 'next/server' before importing the route?
// Bun's module mocking is a bit different. Let's try to mock the globals or just the return value.
// The route returns NextResponse.json().

// Let's mock the prisma client
// The route imports prisma from '@/lib/prisma'.
// We need to mock that module.

mock.module("@/lib/prisma", () => {
  return {
    default: {
      user: {
        findUnique: mock(),
        create: mock(),
      },
    },
  };
});

import prisma from "@/lib/prisma";

describe("Registration Route", () => {
  beforeEach(() => {
    // Reset mocks
    (prisma.user.findUnique as any).mockClear();
    (prisma.user.create as any).mockClear();
  });

  test("should hash password before creating user", async () => {
    // Setup
    const plainPassword = "mySecretPassword123";
    const requestBody = {
      name: "Test User",
      email: "test@example.com",
      password: plainPassword,
    };

    const req = new Request("http://localhost/api/auth/register", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    // Mock existing user check -> null (user does not exist)
    (prisma.user.findUnique as any).mockResolvedValue(null);

    // Mock create user
    (prisma.user.create as any).mockImplementation((args: any) => {
      return Promise.resolve({
        id: "user-123",
        ...args.data,
      });
    });

    // Execute
    await POST(req);

    // Verify
    expect(prisma.user.create).toHaveBeenCalled();
    const createArgs = (prisma.user.create as any).mock.calls[0][0];
    const createdData = createArgs.data;

    expect(createdData.email).toBe(requestBody.email);
    expect(createdData.password).not.toBe(plainPassword);
    // Bcrypt hashes start with $2a$ or $2b$
    expect(createdData.password).toMatch(/^\$2[ab]\$10\$.+/);
  });
});
