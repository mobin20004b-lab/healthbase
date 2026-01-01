
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "20")
  const city = searchParams.get("city")
  const minRating = parseFloat(searchParams.get("min_rating") || "0")

  const skip = (page - 1) * limit

  const where: any = {}

  if (city) {
      // Assuming address is stored as JSON and we want to filter by city.
      // Prisma JSON filtering depends on DB. For Postgres:
      where.address = {
          path: ['city'],
          equals: city
      }
  }

  if (minRating > 0) {
      where.averageRating = {
          gte: minRating
      }
  }

  where.status = "ACTIVE"

  try {
    const [clinics, total] = await Promise.all([
      prisma.clinic.findMany({
        where,
        skip,
        take: limit,
        include: {
            services: {
                select: { category: true } // optimization
            }
        }
      }),
      prisma.clinic.count({ where })
    ])

    return NextResponse.json({
        items: clinics,
        total,
        page,
        limit
    })
  } catch (error) {
      console.error(error)
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST - Admin only
import { requireRole } from "@/lib/auth-helpers"

export async function POST(req: NextRequest) {
    try {
        await requireRole("ADMIN")
        const body = await req.json()

        // Basic validation
        const schema = z.object({
            name: z.string(),
            description: z.string().optional(),
            contactPhone: z.string().optional(),
        })

        const data = schema.parse(body)

        const clinic = await prisma.clinic.create({
            data: {
                ...data,
                status: "PENDING"
            }
        })

        return NextResponse.json(clinic, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
             return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        // Auth error
        if ((error as any).message === "NEXT_REDIRECT") throw error // Next.js redirect

        return NextResponse.json({ error: "Unauthorized or Error" }, { status: 500 })
    }
}
