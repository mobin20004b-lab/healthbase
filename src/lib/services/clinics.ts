import prisma from '@/lib/prisma';
import type { Clinic, Service } from '@prisma/client';
import { MOCK_CLINICS } from '@/lib/constants/mock-data';

export type ClinicSearchParams = {
    page?: number;
    limit?: number;
    city?: string;
    province?: string;
    specialty?: string;
    insurance?: string;
    q?: string;
    sort?: string;
    lang?: string;
    userId?: string;
};

// Define a type that matches the transformed output
export type ClinicWithDetails = Omit<Clinic, 'translations' | 'reviews' | 'favoritedBy'> & {
    services: (Omit<Service, 'translations'> & { category: { name: string } | null })[];
    averageRating: number;
    reviewCount: number;
    isFavorited: boolean;
};

export async function getClinics(params: ClinicSearchParams) {
    const {
        page = 1,
        limit = 20,
        city,
        province,
        specialty,
        insurance,
        q,
        sort = 'newest',
        lang = 'fa',
        userId
    } = params;

    const skip = (page - 1) * limit;

    const andConditions: Record<string, unknown>[] = [];

    if (city) {
        andConditions.push({
            OR: [
                { city: { equals: city, mode: 'insensitive' } },
                { translations: { some: { city: { equals: city, mode: 'insensitive' }, locale: lang } } }
            ]
        });
    }

    if (province) {
        andConditions.push({
            OR: [
                { province: { equals: province, mode: 'insensitive' } },
                { translations: { some: { province: { equals: province, mode: 'insensitive' }, locale: lang } } }
            ]
        });
    }

    if (specialty) {
        andConditions.push({
            OR: [
                // Check direct specialty relation
                {
                    specialties: {
                        some: {
                            OR: [
                                { name: { contains: specialty, mode: 'insensitive' } },
                                { translations: { some: { name: { contains: specialty, mode: 'insensitive' }, locale: lang } } }
                            ]
                        }
                    }
                },
                // Check services
                {
                    services: {
                        some: {
                            OR: [
                                { name: { contains: specialty, mode: 'insensitive' } },
                                // Check category relation on service
                                {
                                    category: {
                                         OR: [
                                             { name: { contains: specialty, mode: 'insensitive' } },
                                             { translations: { some: { name: { contains: specialty, mode: 'insensitive' }, locale: lang } } }
                                         ]
                                    }
                                },
                                { translations: { some: { name: { contains: specialty, mode: 'insensitive' }, locale: lang } } }
                            ]
                        }
                    }
                }
            ]
        });
    }

    if (insurance) {
        andConditions.push({
            insurances: {
                some: {
                     OR: [
                         { name: { equals: insurance, mode: 'insensitive' } },
                         { translations: { some: { name: { equals: insurance, mode: 'insensitive' }, locale: lang } } }
                     ]
                }
            }
        });
    }

    if (q) {
        andConditions.push({
            OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
                { city: { contains: q, mode: 'insensitive' } },
                { province: { contains: q, mode: 'insensitive' } },
                { translations: { some: { name: { contains: q, mode: 'insensitive' }, locale: lang } } },
                { translations: { some: { description: { contains: q, mode: 'insensitive' }, locale: lang } } },
                // Services
                { services: { some: { name: { contains: q, mode: 'insensitive' } } } },
                // Specialties
                { specialties: { some: { name: { contains: q, mode: 'insensitive' } } } },
            ]
        });
    }

    const where: Record<string, unknown> = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting logic
    let orderBy: Record<string, unknown> = { createdAt: 'desc' };
    if (sort === 'rating_desc') {
        orderBy = { reviews: { _count: 'desc' } }; // Approximate for DB sort, refinements in memory
    } else if (sort === 'name_asc') {
        orderBy = { name: 'asc' };
    } else if (sort === 'oldest') {
        orderBy = { createdAt: 'asc' };
    }

    try {
        const [clinics, total] = await Promise.all([
            prisma.clinic.findMany({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                where: where as any,
                skip,
                take: limit,
                include: {
                    services: {
                        include: {
                            translations: {
                                where: { locale: lang }
                            },
                            category: {
                                include: {
                                    translations: { where: { locale: lang } }
                                }
                            }
                        }
                    },
                    reviews: {
                        select: { rating: true }
                    },
                    translations: {
                        where: { locale: lang }
                    },
                    favoritedBy: userId ? { where: { id: userId }, select: { id: true } } : false
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                orderBy: orderBy as any,
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prisma.clinic.count({ where: where as any }),
        ]);

        // Apply translations and formatting
        const formattedClinics = clinics.map((clinic) => {
            const translation = clinic.translations[0];

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const services = clinic.services.map((service: any) => {
                const sTranslation = service.translations[0];
                const cTranslation = service.category?.translations[0];
                return {
                    ...service,
                    name: sTranslation?.name || service.name,
                    description: sTranslation?.description || service.description,
                    category: service.category ? {
                        ...service.category,
                        name: cTranslation?.name || service.category.name
                    } : null,
                    translations: undefined
                };
            });

            const totalRating = clinic.reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = clinic.reviews.length > 0 ? totalRating / clinic.reviews.length : 0;

            return {
                ...clinic,
                name: translation?.name || clinic.name,
                description: translation?.description || clinic.description,
                address: translation?.address || clinic.address,
                city: translation?.city || clinic.city,
                province: translation?.province || clinic.province,
                services,
                averageRating,
                reviewCount: clinic.reviews.length,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                isFavorited: (clinic as any).favoritedBy?.length > 0,
                translations: undefined,
                reviews: undefined,
                favoritedBy: undefined
            };
        });

        // Handle rating sorting in memory if needed (DB sort was by count, or basic)
        if (sort === 'rating_desc') {
            formattedClinics.sort((a, b) => b.averageRating - a.averageRating);
        }

        return {
            data: formattedClinics as unknown as ClinicWithDetails[],
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        };
    } catch (error) {
        console.error('Database connection failed, using mock data:', error);
        // Fallback to mock data for development
        let data = [...MOCK_CLINICS];

        // Simple mock filtering
        if (city) data = data.filter(c => c.city?.toLowerCase() === city.toLowerCase());
        if (province) data = data.filter(c => c.province?.toLowerCase() === province.toLowerCase());
        if (q) data = data.filter(c =>
            c.name.toLowerCase().includes(q.toLowerCase()) ||
            c.city?.toLowerCase().includes(q.toLowerCase())
        );

        const total = data.length;
        const start = (page - 1) * limit;
        const pagedData = data.slice(start, start + limit);

        return {
            data: pagedData,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        };
    }
}
