import { describe, expect, it, mock, beforeEach } from 'bun:test';
import { getClinics } from '@/lib/services/clinics';
import prisma from '@/lib/prisma';

// Mock Prisma
mock.module('@/lib/prisma', () => {
    return {
        default: {
            clinic: {
                findMany: mock(() => Promise.resolve([])),
            },
        },
    };
});

describe('getClinics', () => {
    beforeEach(() => {
        // Reset mock implementation before each test
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prisma.clinic.findMany as any).mockClear();
    });

    it('should call prisma.clinic.findMany with correct parameters when no filters are provided', async () => {
        await getClinics();
        expect(prisma.clinic.findMany).toHaveBeenCalledWith({
            where: {},
            take: 50,
            skip: 0,
            include: {
                reviews: true,
                specialties: true,
                insurances: true,
                translations: true,
            },
            orderBy: {
                isVerified: 'desc',
            },
        });
    });

    it('should call prisma.clinic.findMany with correct parameters when filters are provided', async () => {
        await getClinics({
            city: 'Tehran',
            province: 'Tehran',
            q: 'Heart',
        });

        expect(prisma.clinic.findMany).toHaveBeenCalledWith({
            where: {
                city: 'Tehran',
                province: 'Tehran',
                OR: [
                    { name: { contains: 'Heart', mode: 'insensitive' } },
                    { description: { contains: 'Heart', mode: 'insensitive' } },
                    {
                        specialties: {
                            some: {
                                name: { contains: 'Heart', mode: 'insensitive' }
                            }
                        }
                    }
                ],
            },
            take: 50,
            skip: 0,
            include: {
                reviews: true,
                specialties: true,
                insurances: true,
                translations: true,
            },
            orderBy: {
                isVerified: 'desc',
            },
        });
    });

    it('should handle errors gracefully', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prisma.clinic.findMany as any).mockRejectedValue(new Error('Database error'));
        const result = await getClinics();
        expect(result).toEqual([]);
    });
});
