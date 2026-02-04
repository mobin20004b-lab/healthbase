
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { z } from 'zod';
import { getClinics } from '@/services/clinics';
import prisma from '@/lib/prisma';

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
    const params = Object.fromEntries(searchParams.entries());
    const lang = searchParams.get('lang') || 'fa';

    const result = await getClinics(params, lang, session?.user?.id);

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
