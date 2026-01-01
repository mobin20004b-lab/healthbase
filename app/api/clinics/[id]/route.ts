
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/auth-helpers"
import { auth } from "@/auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const clinic = await prisma.clinic.findUnique({
        where: { id: params.id },
        include: {
            services: true,
            reviews: {
                where: { status: "APPROVED" },
                take: 5,
                orderBy: { createdAt: "desc" }
            }
        }
    })

    if (!clinic) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 })
    }

    return NextResponse.json(clinic)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await auth()
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const user = session.user as any

        // Check if Admin or Owner
        const clinic = await prisma.clinic.findUnique({ where: { id: params.id } })
        if (!clinic) return NextResponse.json({ error: "Not Found" }, { status: 404 })

        if (user.role !== "ADMIN" && clinic.ownerId !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const body = await req.json()
        const updated = await prisma.clinic.update({
            where: { id: params.id },
            data: body // In real app, validate strictly
        })

        return NextResponse.json(updated)

    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
