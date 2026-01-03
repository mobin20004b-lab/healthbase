
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

const clinicUpdateSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    phone: z.string().optional(),
    image: z.string().optional(),
    website: z.string().optional(),
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Params is a Promise in recent Next.js
) {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'fa';
    const id = (await params).id;

    const clinic = await prisma.clinic.findUnique({
        where: { id },
        include: {
            services: {
                include: {
                    translations: lang === 'all' ? true : {
                        where: { locale: lang }
                    }
                }
            },
            reviews: {
                select: { id: true, rating: true, comment: true, userId: true, user: { select: { name: true, image: true } } },
                where: { status: 'APPROVED' }
            },
            translations: lang === 'all' ? true : {
                where: { locale: lang }
            },
            favoritedBy: session?.user?.id ? { where: { id: session.user.id }, select: { id: true } } : false
        },
    });

    if (!clinic) {
        return NextResponse.json({ error: 'Clinic not found' }, { status: 404 });
    }

    if (lang === 'all') {
        return NextResponse.json(clinic);
    }

    // Apply translations in memory
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

    const clinicsWithTranslations = {
        ...clinic,
        name: translation?.name || clinic.name,
        description: translation?.description || clinic.description,
        address: translation?.address || clinic.address,
        city: translation?.city || clinic.city,
        province: translation?.province || clinic.province,
        services,
        isFavorited: clinic.favoritedBy?.length > 0,
        translations: undefined,
        favoritedBy: undefined
    };

    return NextResponse.json(clinicsWithTranslations);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = (await params).id;

    // Check permissions: Admin or Owner of this clinic
    const isAdmin = session.user.role === 'ADMIN';
    const isOwner = session.user.role === 'CLINIC_OWNER' && session.user.clinicId === id;

    if (!isAdmin && !isOwner) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const json = await request.json();
        const { translations, ...rest } = json;
        const body = clinicUpdateSchema.parse(rest);

        const clinic = await prisma.clinic.update({
            where: { id },
            data: {
                ...body,
                translations: translations ? {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    upsert: Object.entries(translations).map(([locale, data]: [string, any]) => ({
                        where: { clinicId_locale: { clinicId: id, locale } },
                        create: { locale, ...data },
                        update: { ...data }
                    }))
                } : undefined
            },
            include: {
                translations: true
            }
        });

        return NextResponse.json(clinic);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        console.error('PUT /api/clinics/[id] error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const id = (await params).id;

    try {
        await prisma.clinic.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Clinic deleted' });
    } catch {
        return NextResponse.json({ error: 'Failed to delete clinic' }, { status: 500 });
    }
}
