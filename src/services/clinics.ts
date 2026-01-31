import prisma from '@/lib/prisma';

interface GetClinicsParams {
    page?: number;
    limit?: number;
    city?: string | null;
    province?: string | null;
    specialty?: string | null;
    insurance?: string | null;
    q?: string | null;
    sort?: string;
    lang?: string;
    userId?: string;
}

export async function getClinics({
    page = 1,
    limit = 20,
    city,
    province,
    specialty,
    insurance,
    q,
    sort = 'newest',
    lang = 'fa',
    userId,
}: GetClinicsParams) {
    const skip = (page - 1) * limit;

    const andConditions: Record<string, unknown>[] = [];

    // Search in translations as well if q is provided
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
            services: {
                some: {
                    OR: [
                        { name: { contains: specialty, mode: 'insensitive' } },
                        { category: { contains: specialty, mode: 'insensitive' } },
                        { translations: { some: { name: { contains: specialty, mode: 'insensitive' }, locale: lang } } }
                    ]
                }
            }
        });
    }

    if (insurance) {
        andConditions.push({ insurances: { has: insurance } });
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
        orderBy = { reviews: { _count: 'desc' } };
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

        // Apply translations in memory for simple response
        const clinicsWithTranslations = clinics.map((clinic) => {
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

            return {
                ...clinic,
                name: translation?.name || clinic.name,
                description: translation?.description || clinic.description,
                address: translation?.address || clinic.address,
                city: translation?.city || clinic.city,
                province: translation?.province || clinic.province,
                services,
                averageRating,
                isFavorited: clinic.favoritedBy?.length > 0,
                translations: undefined,
                reviews: undefined,
                favoritedBy: undefined
            };
        });

        // Handle rating sorting in memory for MVP
        if (sort === 'rating_desc') {
            clinicsWithTranslations.sort((a, b) => b.averageRating - a.averageRating);
        }

        return {
            data: clinicsWithTranslations,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    } catch (error) {
        console.warn("Database connection failed, returning mock data", error);
        // Mock data matching the return type
        const mockData = [
             {
                id: '1',
                name: 'Tehran Heart Center (Mock)',
                city: 'Tehran',
                province: 'Tehran',
                country: 'Iran',
                image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
                isVerified: true,
                address: 'North Kargar St',
                phone: '021-88029600',
                website: 'https://thc.tums.ac.ir',
                description: 'Specialized heart hospital',
                createdAt: new Date(),
                updatedAt: new Date(),
                averageRating: 4.5,
                isFavorited: false,
                services: [],
            },
            {
                id: '2',
                name: 'Milad Hospital (Mock)',
                city: 'Tehran',
                province: 'Tehran',
                country: 'Iran',
                image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
                isVerified: false,
                address: 'Milad Tower',
                phone: '021-88000000',
                website: 'https://miladhospital.com',
                description: 'General hospital',
                createdAt: new Date(),
                updatedAt: new Date(),
                averageRating: 3.8,
                isFavorited: false,
                services: [],
            }
        ];

        return {
            data: mockData,
            meta: {
                page: 1,
                limit: 20,
                total: mockData.length,
                totalPages: 1,
            },
        };
    }
}
