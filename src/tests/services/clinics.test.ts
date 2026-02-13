
import { describe, it, expect, mock, beforeEach } from "bun:test";
import { getClinics, getClinicById } from "@/services/clinics";

// Explicitly type the mock return to match expected structure loosely or use any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFindMany = mock(async () => [] as any[]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFindUnique = mock(async () => null as any);
const mockCount = mock(async () => 0);

// Mocking @/lib/prisma
mock.module("@/lib/prisma", () => ({
    default: {
        clinic: {
            findMany: mockFindMany,
            findUnique: mockFindUnique,
            count: mockCount,
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
        expect(json).toContain('OR');
    });
});

describe("getClinicById", () => {
    beforeEach(() => {
        mockFindUnique.mockClear();
    });

    it("should fetch clinic by id and flatten relations", async () => {
        const mockClinic = {
            id: '1',
            name: 'Clinic A',
            description: 'Desc',
            translations: [{ locale: 'fa', name: 'Clinic A FA', description: 'Desc FA' }],
            services: [
                {
                    id: 's1',
                    name: 'Service 1',
                    translations: [{ locale: 'fa', name: 'Service 1 FA' }],
                    category: {
                        name: 'Cat 1',
                        translations: [{ locale: 'fa', name: 'Cat 1 FA' }]
                    }
                }
            ],
            reviews: [
                { id: 'r1', rating: 5, comment: 'Great', user: { name: 'User 1' }, createdAt: new Date() }
            ],
            insurances: [],
            specialties: [],
            favoritedBy: []
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockFindUnique.mockImplementation(async () => mockClinic as any);

        const result = await getClinicById('1', 'fa');

        expect(mockFindUnique).toHaveBeenCalled();
        expect(result).not.toBeNull();
        expect(result?.name).toBe('Clinic A FA'); // Flattened
        expect(result?.services[0].name).toBe('Service 1 FA'); // Flattened service
        expect(result?.services[0].category).toBe('Cat 1 FA'); // Flattened category
        expect(result?.averageRating).toBe(5);
        expect(result?.reviewCount).toBe(1);
    });

    it("should return null if clinic not found", async () => {
        mockFindUnique.mockImplementation(async () => null);
        const result = await getClinicById('non-existent');
        expect(result).toBeNull();
    });
});
