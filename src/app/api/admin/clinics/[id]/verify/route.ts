
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = (await params).id;

    try {
        const { isVerified } = await request.json();

        const clinic = await prisma.clinic.update({
            where: { id },
            data: { isVerified }
        });

        return NextResponse.json(clinic);
    } catch (error) {
        console.error('PUT /api/admin/clinics/[id]/verify error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
