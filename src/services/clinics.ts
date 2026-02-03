
import prisma from '@/lib/prisma';
import type { Clinic, Service, Review, ClinicTranslation, ServiceTranslation } from '@prisma/client';

// Fallback Mock Data
const MOCK_CLINICS = [
  {
    id: 'mock-1',
    name: 'Tehran Heart Center (Mock)',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    averageRating: 4.5,
    reviewCount: 120,
    services: [],
    translations: [],
    reviews: [],
    favoritedBy: []
  },
  {
    id: 'mock-2',
    name: 'Milad Hospital (Mock)',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    averageRating: 3.8,
    reviewCount: 45,
    services: [],
    translations: [],
    reviews: [],
    favoritedBy: []
  },
  {
    id: 'mock-3',
    name: 'Shiraz Central Clinic (Mock)',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    averageRating: 5.0,
    reviewCount: 12,
    services: [],
    translations: [],
    reviews: [],
    favoritedBy: []
  }
];

export type ClinicWithRelations = Clinic & {
    averageRating: number;
    reviewCount: number;
    services: (Service & {
        translations?: ServiceTranslation[];
    })[];
    translations?: ClinicTranslation[];
    reviews?: { rating: number }[];
    favoritedBy?: { id: string }[];
    isFavorited?: boolean;
};

export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type GetClinicsResult = {
    data: ClinicWithRelations[];
    meta: PaginationMeta;
};

export async function getClinics(
    searchParams: Record<string, string | string[] | undefined>,
    locale: string = 'fa',
    userId?: string
): Promise<GetClinicsResult> {
    const page = parseInt(typeof searchParams.page === 'string' ? searchParams.page : '1') || 1;
    const limit = parseInt(typeof searchParams.limit === 'string' ? searchParams.limit : '20') || 20;
    const city = typeof searchParams.city === 'string' ? searchParams.city : undefined;
    const province = typeof searchParams.province === 'string' ? searchParams.province : undefined;
    const specialty = typeof searchParams.specialty === 'string' ? searchParams.specialty : undefined;
    const insurance = typeof searchParams.insurance === 'string' ? searchParams.insurance : undefined;
    const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';

    const skip = (page - 1) * limit;

    const andConditions: Record<string, unknown>[] = [];

    // Search in translations as well if q is provided
    if (city) {
        andConditions.push({
            OR: [
                { city: { equals: city, mode: 'insensitive' } },
                { translations: { some: { city: { equals: city, mode: 'insensitive' }, locale } } }
            ]
        });
    }

    if (province) {
        andConditions.push({
            OR: [
                { province: { equals: province, mode: 'insensitive' } },
                { translations: { some: { province: { equals: province, mode: 'insensitive' }, locale } } }
            ]
        });
    }

    if (specialty) {
        andConditions.push({
            OR: [
                // Check Clinic Specialties relation
                {
                    specialties: {
                        some: {
                            OR: [
                                { name: { contains: specialty, mode: 'insensitive' } },
                                { translations: { some: { name: { contains: specialty, mode: 'insensitive' }, locale } } }
                            ]
                        }
                    }
                },
                // Check Services
                {
                    services: {
                        some: {
                            OR: [
                                { name: { contains: specialty, mode: 'insensitive' } },
                                { category: { name: { contains: specialty, mode: 'insensitive' } } }, // category is relation
                                { translations: { some: { name: { contains: specialty, mode: 'insensitive' }, locale } } }
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
                        { name: { contains: insurance, mode: 'insensitive' } },
                        { translations: { some: { name: { contains: insurance, mode: 'insensitive' }, locale } } }
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
                { translations: { some: { name: { contains: q, mode: 'insensitive' } } } },
                { translations: { some: { description: { contains: q, mode: 'insensitive' } } } },
                { services: { some: { name: { contains: q, mode: 'insensitive' } } } },
                { services: { some: { translations: { some: { name: { contains: q, mode: 'insensitive' } } } } } },
            ]
        });
    }

    const where: Record<string, unknown> = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting logic
    let orderBy: Record<string, unknown> = { createdAt: 'desc' };
    if (sort === 'rating_desc') {
        orderBy = { reviews: { _count: 'desc' } }; // Approximate for DB sort, actual sort done in memory for average
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
                                where: { locale }
                            }
                        }
                    },
                    reviews: {
                        select: { rating: true }
                    },
                    translations: {
                        where: { locale }
                    },
                    favoritedBy: userId ? { where: { id: userId }, select: { id: true } } : false
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                orderBy: orderBy as any,
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prisma.clinic.count({ where: where as any }),
        ]);

        // Apply translations in memory and calculate ratings
        const clinicsWithData: ClinicWithRelations[] = clinics.map((clinic) => {
            const translation = clinic.translations[0];
            const services = clinic.services.map((service) => {
                const sTranslation = service.translations[0];
                return {
                    ...service,
                    name: sTranslation?.name || service.name,
                    description: sTranslation?.description || service.description,
                    translations: undefined
                };
            });

            const totalRating = clinic.reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = clinic.reviews.length > 0 ? totalRating / clinic.reviews.length : 0;
            const reviewCount = clinic.reviews.length;
            const isFavorited = clinic.favoritedBy && clinic.favoritedBy.length > 0;

            return {
                ...clinic,
                name: translation?.name || clinic.name,
                description: translation?.description || clinic.description,
                address: translation?.address || clinic.address,
                city: translation?.city || clinic.city,
                province: translation?.province || clinic.province,
                services,
                averageRating,
                reviewCount,
                isFavorited,
                translations: undefined, // Clear raw translations
                reviews: undefined,      // Clear raw reviews
                favoritedBy: undefined   // Clear raw favorites
            };
        });

        // Handle rating sorting in memory for MVP (since averageRating is computed)
        if (sort === 'rating_desc') {
            clinicsWithData.sort((a, b) => b.averageRating - a.averageRating);
        }

        return {
            data: clinicsWithData,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    } catch (error) {
        console.warn("Database operation failed, returning mock data.", error);
        // Basic filtering for mock data to make it slightly interactive
        let filtered = [...MOCK_CLINICS];
        if (city) filtered = filtered.filter(c => c.city.toLowerCase() === city.toLowerCase());
        if (province) filtered = filtered.filter(c => c.province.toLowerCase() === province.toLowerCase());
        if (q) filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(q.toLowerCase()) ||
            c.city.toLowerCase().includes(q.toLowerCase())
        );

        return {
            data: filtered as ClinicWithRelations[],
            meta: {
                page,
                limit,
                total: filtered.length,
                totalPages: Math.ceil(filtered.length / limit),
            },
        };
    }
}
