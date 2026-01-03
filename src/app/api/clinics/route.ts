
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

const clinicSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    phone: z.string().optional(),
    image: z.string().optional(),
    website: z.string().optional(),
});

export async function GET(request: Request) {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const city = searchParams.get('city');
    const province = searchParams.get('province');
    const specialty = searchParams.get('specialty');
    const insurance = searchParams.get('insurance');
    const q = searchParams.get('q');
    const sort = searchParams.get('sort') || 'newest';
    const lang = searchParams.get('lang') || 'fa';

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
                favoritedBy: session?.user?.id ? { where: { id: session.user.id }, select: { id: true } } : false
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

    return NextResponse.json({
        data: clinicsWithTranslations,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
}

export async function POST(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        // translations: { en: { name: '...', ... }, fa: { name: '...', ... } }
        const { translations, ...rest } = json;

        const body = clinicSchema.parse(rest);

        const clinic = await prisma.clinic.create({
            data: {
                ...body,
                translations: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    create: Object.entries(translations || {}).map(([locale, data]: [string, any]) => ({
                        locale,
                        ...data
                    }))
                }
            },
            include: {
                translations: true
            }
        });

        return NextResponse.json(clinic, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.flatten() }, { status: 400 });
        }
        console.error('POST /api/clinics error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
