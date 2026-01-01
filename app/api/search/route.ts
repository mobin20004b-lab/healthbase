
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q")

    if (!q) return NextResponse.json([])

    // MVP: Postgres ILIKE or basic contains.
    // Full Text Search would need raw SQL with tsvector.

    const clinics = await prisma.clinic.findMany({
        where: {
            OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } }
            ],
            status: "ACTIVE"
        },
        take: 20
    })

    return NextResponse.json(clinics)
}
