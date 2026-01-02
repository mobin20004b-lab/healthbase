
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

const reviewSchema = z.object({
    clinicId: z.string().min(1, 'Clinic ID is required'),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
});

export async function POST(request: Request) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const body = reviewSchema.parse(json);

        // Check if clinic exists
        const clinic = await prisma.clinic.findUnique({
            where: { id: body.clinicId },
        });

        if (!clinic) {
            return NextResponse.json({ error: 'Clinic not found' }, { status: 404 });
        }

        // Optional: Check if user already reviewed this clinic
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: session.user.id,
                clinicId: body.clinicId,
            }
        });

        if (existingReview) {
            return NextResponse.json({ error: 'You have already reviewed this clinic' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                ...body,
                userId: session.user.id!,
                status: 'PENDING', // Reviews require moderation by default
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.flatten() }, { status: 400 });
        }
        console.error('Create Review Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const clinicId = searchParams.get('clinicId');
    const status = searchParams.get('status') || 'APPROVED';

    const session = await auth();
    const isAdmin = session?.user?.role === 'ADMIN';

    // If clinicId is provided, filters by clinic. Otherwise, logic depends on role.
    const where: { clinicId?: string; status?: string } = {};
    if (clinicId) {
        where.clinicId = clinicId;
    }

    // Only admins can see non-approved reviews for other clinics
    if (!isAdmin) {
        where.status = 'APPROVED';
    } else if (status) { // Use the status variable from searchParams
        where.status = status;
    }

    try {
        const reviews = await prisma.review.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Fetch Reviews Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
