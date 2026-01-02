
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ type: string; id: string }> }
) {
    const session = await auth();
    const { type, id } = await params;

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { name, translations } = await request.json();

        if (!name || !translations || !Array.isArray(translations)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Delete old translations and create new ones
        const updateData = {
            name,
            translations: {
                deleteMany: {},
                create: translations.map((t: any) => ({
                    locale: t.locale,
                    name: t.name,
                })),
            },
        };

        let result;
        if (type === 'category') {
            result = await prisma.category.update({
                where: { id },
                data: updateData,
                include: { translations: true }
            });
        } else if (type === 'specialty') {
            result = await prisma.specialty.update({
                where: { id },
                data: updateData,
                include: { translations: true }
            });
        } else if (type === 'insurance') {
            result = await prisma.insurance.update({
                where: { id },
                data: updateData,
                include: { translations: true }
            });
        } else {
            return NextResponse.json({ error: 'Invalid taxonomy type' }, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error(`PUT /api/admin/taxonomy/${type}/${id} error:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ type: string; id: string }> }
) {
    const session = await auth();
    const { type, id } = await params;

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        if (type === 'category') {
            await prisma.category.delete({ where: { id } });
        } else if (type === 'specialty') {
            await prisma.specialty.delete({ where: { id } });
        } else if (type === 'insurance') {
            await prisma.insurance.delete({ where: { id } });
        } else {
            return NextResponse.json({ error: 'Invalid taxonomy type' }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(`DELETE /api/admin/taxonomy/${type}/${id} error:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
