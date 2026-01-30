
import { describe, it, expect, mock, beforeEach } from "bun:test";

// Mock auth
mock.module("@/auth", () => ({
  auth: () => Promise.resolve({ user: { id: "user1" } }),
}));

// Mock prisma
const mockFindMany = mock();
const mockCount = mock();

mock.module("@/lib/prisma", () => ({
  default: {
    clinic: {
      findMany: mockFindMany,
      count: mockCount,
    },
  },
}));

import { GET } from "@/app/api/clinics/route";

describe("GET /api/clinics", () => {
  beforeEach(() => {
    mockFindMany.mockClear();
    mockCount.mockClear();

    // Default mock implementation
    mockFindMany.mockImplementation(() => Promise.resolve([
        {
            id: "c1",
            name: "C1",
            services: [],
            reviews: [],
            translations: [],
            favoritedBy: []
        },
        {
            id: "c3",
            name: "C3",
            services: [],
            reviews: [],
            translations: [],
            favoritedBy: []
        }
    ]));
    mockCount.mockImplementation(() => Promise.resolve(2));
  });

  it("should filter by ids when ids param is provided", async () => {
    const req = new Request("http://localhost/api/clinics?ids=c1,c3");
    const res = await GET(req);
    // consume body
    await res.json();

    expect(mockFindMany).toHaveBeenCalled();
    const callArgs = mockFindMany.mock.calls[0];
    const where = callArgs[0].where;

    // Verify logic: should contain { id: { in: ['c1', 'c3'] } }
    // The implementation pushes to AND array
    const andConditions = where.AND;
    expect(andConditions).toBeDefined();

    const idCondition = andConditions.find((c: any) => c.id && c.id.in);
    expect(idCondition).toBeDefined();
    expect(idCondition.id.in).toEqual(["c1", "c3"]);
  });

  it("should not filter by ids when ids param is missing", async () => {
    const req = new Request("http://localhost/api/clinics");
    const res = await GET(req);
    await res.json();

    expect(mockFindMany).toHaveBeenCalled();
    const callArgs = mockFindMany.mock.calls[0];
    const where = callArgs[0].where;

    // If no filters, where should be {} or { AND: [] } depending on implementation
    // My implementation: const where = andConditions.length > 0 ? { AND: andConditions } : {};
    if (where && where.AND) {
       const idCondition = where.AND.find((c: any) => c.id && c.id.in);
       expect(idCondition).toBeUndefined();
    } else {
        // empty object is fine
        expect(where).toEqual({});
    }
  });
});
