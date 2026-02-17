
import { describe, it, expect, mock, beforeEach } from "bun:test";
import { getClinics, getClinicById } from "@/services/clinics";

// Explicitly type the mock return to match expected structure loosely or use any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFindMany = mock(async () => [] as any[]);
const mockCount = mock(async () => 0);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFindUnique = mock(async () => null as any);

// Mocking @/lib/prisma
mock.module("@/lib/prisma", () => ({
    default: {
        clinic: {
            findMany: mockFindMany,
            count: mockCount,
            findUnique: mockFindUnique,
        }
    }
}));

describe("getClinics", () => {
    beforeEach(() => {
        mockFindMany.mockClear();
        mockCount.mockClear();
    });

    it("should call findMany with correct pagination", async () => {
        await getClinics({ page: '2', limit: '10' });
        expect(mockFindMany).toHaveBeenCalled();
        // Use manual access or cast to avoid strict TS tuple errors in test
        const calls = mockFindMany.mock.calls;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const callArgs = (calls[0] as any[])[0];
        expect(callArgs.skip).toBe(10);
        expect(callArgs.take).toBe(10);
    });

    it("should apply city filter", async () => {
        await getClinics({ city: 'Tehran' });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const callArgs = (mockFindMany.mock.calls[0] as any[])[0];
        const where = callArgs.where;
        expect(where.AND).toBeDefined();
        // Check structure roughly
        const json = JSON.stringify(where);
        expect(json).toContain('Tehran');
        expect(json).toContain('city');
    });

    it("should apply specialty filter to both specialties and services", async () => {
        await getClinics({ specialty: 'Dentistry' });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const callArgs = (mockFindMany.mock.calls[0] as any[])[0];
        const where = callArgs.where;
        const json = JSON.stringify(where);
        expect(json).toContain('Dentistry');
        expect(json).toContain('specialties');
        expect(json).toContain('services');
    });

    it("should return formatted data", async () => {
        // Setup mock return
        const mockClinics = [{
            id: '1',
            name: 'Clinic A',
            translations: [],
            services: [],
            reviews: [{ rating: 5 }, { rating: 4 }],
            favoritedBy: []
        }];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockFindMany.mockImplementation(async () => mockClinics as any[]);
        mockCount.mockImplementation(async () => 1);

        const result = await getClinics({});

        expect(result.data[0].averageRating).toBe(4.5);
        expect(result.data[0].reviewCount).toBe(2);
        expect(result.meta.total).toBe(1);
    });

    it("should apply multi-select specialty filter", async () => {
        await getClinics({ specialty: ['Dentistry', 'Cardiology'] });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const callArgs = (mockFindMany.mock.calls[0] as any[])[0];
        const where = callArgs.where;
        const json = JSON.stringify(where);
        expect(json).toContain('Dentistry');
        expect(json).toContain('Cardiology');
        // Check for OR logic within the specialty filter block
        // The exact structure depends on implementation, but it should be present
        expect(json).toContain('OR');
    });
});

describe("getClinicById", () => {
    beforeEach(() => {
        mockFindUnique.mockClear();
    });

    it("should return null if clinic not found", async () => {
        mockFindUnique.mockResolvedValue(null);
        const result = await getClinicById("non-existent");
        expect(result).toBeNull();
    });

    it("should return formatted clinic detail with relations", async () => {
        const mockClinic = {
            id: "1",
            name: "Clinic Detail",
            translations: [],
            services: [{
                id: "s1",
                name: "Service 1",
                translations: []
            }],
            reviews: [
                { id: "r1", rating: 5, comment: "Great", user: { name: "User" } },
                { id: "r2", rating: 4, comment: "Good", user: { name: "User 2" } }
            ],
            insurances: [{
                id: "i1",
                name: "Insurance 1",
                translations: []
            }],
            favoritedBy: []
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockFindUnique.mockResolvedValue(mockClinic as any);

        const result = await getClinicById("1");

        expect(result).not.toBeNull();
        expect(result?.name).toBe("Clinic Detail");
        expect(result?.averageRating).toBe(4.5);
        expect(result?.reviewCount).toBe(2);
        expect(result?.services).toHaveLength(1);
        expect(result?.insurances).toHaveLength(1);
        expect(result?.insurances[0].name).toBe("Insurance 1");
    });

    it("should apply translation fallbacks", async () => {
        const mockClinic = {
            id: "1",
            name: "Clinic EN",
            translations: [{ locale: "fa", name: "Clinic FA" }],
            services: [{
                id: "s1",
                name: "Service EN",
                translations: [{ locale: "fa", name: "Service FA" }]
            }],
            reviews: [],
            insurances: [],
            favoritedBy: []
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockFindUnique.mockResolvedValue(mockClinic as any);

        // Simulate behavior where Prisma returns translations based on query
        // But here we are mocking the return value directly.
        // The service logic picks translations[0].

        const result = await getClinicById("1", "fa");

        expect(result?.name).toBe("Clinic FA");
        expect(result?.services[0].name).toBe("Service FA");
    });
});
