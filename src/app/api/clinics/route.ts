
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';
import { getClinics } from '@/lib/services/clinics';

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
    const city = searchParams.get('city') || undefined;
    const province = searchParams.get('province') || undefined;
    const specialty = searchParams.get('specialty') || undefined;
    const insurance = searchParams.get('insurance') || undefined;
    const q = searchParams.get('q') || undefined;
    const sort = searchParams.get('sort') || 'newest';
    const lang = searchParams.get('lang') || 'fa';

    const result = await getClinics({
        page,
        limit,
        city,
        province,
        specialty,
        insurance,
        q,
        sort,
        lang,
        userId: session?.user?.id
    });

    return NextResponse.json(result);
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
