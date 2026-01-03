
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
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

        const formattedClinics = clinics.map((clinic) => ({
            id: clinic.id,
            name: clinic.translations[0]?.name || clinic.name,
            city: clinic.translations[0]?.city || clinic.city,
            province: clinic.translations[0]?.province || clinic.province,
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
