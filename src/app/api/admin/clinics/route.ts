
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const clinics = await prisma.clinic.findMany({
            include: {
                translations: {
                    where: { locale: 'fa' } // Default to Farsi for admin list
                },
                _count: {
                    select: { reviews: true, services: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const formattedClinics = clinics.map((clinic: {
            id: string;
            name: string;
            translations: { name?: string; city?: string | null }[];
            city: string | null;
            isVerified: boolean;
            _count: { reviews: number; services: number };
            createdAt: Date;
        }) => ({
            id: clinic.id,
            name: clinic.translations[0]?.name || clinic.name,
            city: clinic.translations[0]?.city || clinic.city,
            isVerified: clinic.isVerified,
            reviewCount: clinic._count.reviews,
            serviceCount: clinic._count.services,
            createdAt: clinic.createdAt
        }));

        return NextResponse.json(formattedClinics);
    } catch (error) {
        console.error('GET /api/admin/clinics error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
