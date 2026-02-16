
import prisma from '@/lib/prisma';
import type {
    Clinic,
    Service,
    ClinicTranslation,
    ServiceTranslation,
    Insurance,
    Specialty,
    Category,
    Review,
    User,
    InsuranceTranslation,
    SpecialtyTranslation,
    // CategoryTranslation
} from '@prisma/client';

// Fallback Mock Data
const MOCK_CLINICS = [
  {
    id: 'mock-1',
    name: 'Tehran Heart Center (Mock)',
    description: 'A leading heart center in Tehran. Specializing in cardiovascular diseases and surgery.',
    address: 'North Kargar Street',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    phone: '+98 21 8802 9600',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    website: 'https://thc.tums.ac.ir',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.5,
    reviewCount: 120,
    services: [
        { id: 'srv-1', name: 'Cardiology Consultation', description: 'Expert consultation', priceMin: 500000, priceMax: 1000000, currency: 'IRR', clinicId: 'mock-1', createdAt: new Date(), updatedAt: new Date(), categoryId: null, category: { id: 'cat-1', name: 'Consultation', createdAt: new Date(), updatedAt: new Date() }, translations: [] }
    ],
    translations: [],
    reviews: [
        { id: 'rev-1', rating: 5, comment: 'Excellent service and caring staff.', status: 'APPROVED', userId: 'user-1', clinicId: 'mock-1', createdAt: new Date(), updatedAt: new Date(), user: { id: 'user-1', name: 'Ali Rezaei', image: null, email: null, emailVerified: null, role: 'USER', createdAt: new Date(), updatedAt: new Date(), password: null, clinicId: null } },
        { id: 'rev-2', rating: 4, comment: 'Very busy but great doctors.', status: 'APPROVED', userId: 'user-2', clinicId: 'mock-1', createdAt: new Date(), updatedAt: new Date(), user: { id: 'user-2', name: 'Sara Kamali', image: null, email: null, emailVerified: null, role: 'USER', createdAt: new Date(), updatedAt: new Date(), password: null, clinicId: null } }
    ],
    favoritedBy: [],
    insurances: [
        { id: 'ins-1', name: 'Tamin Ejtemaei', createdAt: new Date(), updatedAt: new Date(), translations: [] },
        { id: 'ins-2', name: 'Salamat', createdAt: new Date(), updatedAt: new Date(), translations: [] }
    ],
    specialties: [
        { id: 'spec-1', name: 'Cardiology', createdAt: new Date(), updatedAt: new Date(), translations: [] },
        { id: 'spec-2', name: 'Heart Surgery', createdAt: new Date(), updatedAt: new Date(), translations: [] }
    ]
  },
  {
    id: 'mock-2',
    name: 'Milad Hospital (Mock)',
    description: 'Large specialized hospital offering a wide range of medical services.',
    address: 'Hemmat Expressway',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    phone: '+98 21 82039',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    website: 'https://milad.ir',
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 3.8,
    reviewCount: 45,
    services: [
        { id: 'srv-2', name: 'General Checkup', description: 'Complete body checkup', priceMin: 2000000, priceMax: 5000000, currency: 'IRR', clinicId: 'mock-2', createdAt: new Date(), updatedAt: new Date(), categoryId: null, category: null, translations: [] }
    ],
    translations: [],
    reviews: [],
    favoritedBy: [],
    insurances: [
        { id: 'ins-1', name: 'Tamin Ejtemaei', createdAt: new Date(), updatedAt: new Date(), translations: [] }
    ],
    specialties: [
        { id: 'spec-3', name: 'General Medicine', createdAt: new Date(), updatedAt: new Date(), translations: [] },
        { id: 'spec-4', name: 'Orthopedics', createdAt: new Date(), updatedAt: new Date(), translations: [] }
    ]
  },
  {
    id: 'mock-3',
    name: 'Shiraz Central Clinic (Mock)',
    description: 'Central clinic in Shiraz providing top-notch healthcare services.',
    address: 'Zand Street',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    phone: '+98 71 3233 4455',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    website: null,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 5.0,
    reviewCount: 12,
    services: [],
    translations: [],
    reviews: [],
    favoritedBy: [],
    insurances: [],
    specialties: [
        { id: 'spec-5', name: 'Dermatology', createdAt: new Date(), updatedAt: new Date(), translations: [] }
    ]
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

export type ClinicDetail = Clinic & {
    averageRating: number;
    reviewCount: number;
    isFavorited?: boolean;
    favoritedBy?: { id: string }[];
    services: (Service & {
        translations?: ServiceTranslation[];
        category?: Category | null;
    })[];
    translations?: ClinicTranslation[];
    reviews: (Review & {
        user?: User;
    })[];
    insurances: (Insurance & {
        translations?: InsuranceTranslation[];
    })[];
    specialties: (Specialty & {
        translations?: SpecialtyTranslation[];
    })[];
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
    const specialty = searchParams.specialty;
    const insurance = searchParams.insurance;
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
        const specialties = Array.isArray(specialty) ? specialty : [specialty];
        andConditions.push({
            OR: specialties.map((s) => ({
                OR: [
                    // Check Clinic Specialties relation
                    {
                        specialties: {
                            some: {
                                OR: [
                                    { name: { contains: s, mode: 'insensitive' } },
                                    { translations: { some: { name: { contains: s, mode: 'insensitive' }, locale } } }
                                ]
                            }
                        }
                    },
                    // Check Services
                    {
                        services: {
                            some: {
                                OR: [
                                    { name: { contains: s, mode: 'insensitive' } },
                                    { category: { name: { contains: s, mode: 'insensitive' } } }, // category is relation
                                    { translations: { some: { name: { contains: s, mode: 'insensitive' }, locale } } }
                                ]
                            }
                        }
                    }
                ]
            }))
        });
    }

    if (insurance) {
        const insurances = Array.isArray(insurance) ? insurance : [insurance];
        andConditions.push({
            OR: insurances.map((i) => ({
                insurances: {
                    some: {
                        OR: [
                            { name: { contains: i, mode: 'insensitive' } },
                            { translations: { some: { name: { contains: i, mode: 'insensitive' }, locale } } }
                        ]
                    }
                }
            }))
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
        if (city) filtered = filtered.filter(c => c.city && c.city.toLowerCase() === city.toLowerCase());
        if (province) filtered = filtered.filter(c => c.province && c.province.toLowerCase() === province.toLowerCase());
        if (q) filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(q.toLowerCase()) ||
            (c.city && c.city.toLowerCase().includes(q.toLowerCase()))
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

export async function getClinicsByIds(
    ids: string[],
    locale: string = 'fa'
): Promise<ClinicWithRelations[]> {
    if (!ids || ids.length === 0) return [];

    try {
        const clinics = await prisma.clinic.findMany({
            where: {
                id: { in: ids }
            },
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
                }
            }
        });

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
                translations: undefined, // Clear raw translations
                reviews: undefined,      // Clear raw reviews
            };
        });

        return clinicsWithData;
    } catch (error) {
        console.warn("Database operation failed in getClinicsByIds, returning mock data.", error);
        return MOCK_CLINICS.filter(c => ids.includes(c.id)) as ClinicWithRelations[];
    }
}

export async function getClinicById(
    id: string,
    locale: string = 'fa',
    userId?: string
): Promise<ClinicDetail | null> {
    try {
        const clinic = await prisma.clinic.findUnique({
            where: { id },
            include: {
                services: {
                    include: {
                        translations: { where: { locale } },
                        category: {
                            include: {
                                translations: { where: { locale } }
                            }
                        }
                    }
                },
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: { createdAt: 'desc' }
                },
                insurances: {
                    include: {
                        translations: { where: { locale } }
                    }
                },
                specialties: {
                    include: {
                        translations: { where: { locale } }
                    }
                },
                translations: {
                    where: { locale }
                },
                favoritedBy: userId ? { where: { id: userId }, select: { id: true } } : false
            }
        });

        if (!clinic) return null;

        // Process translations
        const translation = clinic.translations[0];

        const services = clinic.services.map((service) => {
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

        const insurances = clinic.insurances.map((insurance) => {
            const iTranslation = insurance.translations[0];
            return {
                ...insurance,
                name: iTranslation?.name || insurance.name,
                translations: undefined
            };
        });

        const specialties = clinic.specialties.map((specialty) => {
            const spTranslation = specialty.translations[0];
            return {
                ...specialty,
                name: spTranslation?.name || specialty.name,
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
            insurances,
            specialties,
            averageRating,
            reviewCount,
            isFavorited,
            translations: undefined,
            favoritedBy: undefined
        };

    } catch (error) {
        console.warn(`Error fetching clinic ${id}:`, error);
        // Find mock clinic
        const mock = MOCK_CLINICS.find(c => c.id === id);
        if (mock) return mock as unknown as ClinicDetail;
        return null;
    }
}
