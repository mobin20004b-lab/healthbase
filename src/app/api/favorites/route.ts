
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

const favoriteSchema = z.object({
    clinicId: z.string().min(1, 'Clinic ID is required'),
});

export async function POST(request: Request) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const { clinicId } = favoriteSchema.parse(json);

        // Check if clinic exists
        const clinic = await prisma.clinic.findUnique({
            where: { id: clinicId },
        });

        if (!clinic) {
            return NextResponse.json({ error: 'Clinic not found' }, { status: 404 });
        }

        // Check if already favorited
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { favorites: { where: { id: clinicId } } },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isFavorited = user.favorites.length > 0;

        if (isFavorited) {
            // Unfavorite
            await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    favorites: {
                        disconnect: { id: clinicId },
                    },
                },
            });
            return NextResponse.json({ favorited: false });
        } else {
            // Favorite
            await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    favorites: {
                        connect: { id: clinicId },
                    },
                },
            });
            return NextResponse.json({ favorited: true });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.flatten() }, { status: 400 });
        }
        console.error('Favorite Toggle Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                favorites: {
                    include: {
                        services: {
                            take: 3,
                            select: { id: true, name: true }
                        }
                    }
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user.favorites);
    } catch (error) {
        console.error('Fetch Favorites Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
