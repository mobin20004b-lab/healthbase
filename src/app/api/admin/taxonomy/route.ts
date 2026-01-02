
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const [categories, specialties, insurances] = await Promise.all([
            prisma.category.findMany({
                include: { translations: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.specialty.findMany({
                include: { translations: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.insurance.findMany({
                include: { translations: true },
                orderBy: { createdAt: 'desc' }
            }),
        ]);

        return NextResponse.json({ categories, specialties, insurances });
    } catch (error) {
        console.error('GET /api/admin/taxonomy error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { type, name, translations } = await request.json();

        if (!type || !name || !translations || !Array.isArray(translations)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const data = {
            name,
            translations: {
                create: translations.map((t: any) => ({
                    locale: t.locale,
                    name: t.name,
                })),
            },
        };

        let result;
        if (type === 'category') {
            result = await prisma.category.create({ data, include: { translations: true } });
        } else if (type === 'specialty') {
            result = await prisma.specialty.create({ data, include: { translations: true } });
        } else if (type === 'insurance') {
            result = await prisma.insurance.create({ data, include: { translations: true } });
        } else {
            return NextResponse.json({ error: 'Invalid taxonomy type' }, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('POST /api/admin/taxonomy error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
