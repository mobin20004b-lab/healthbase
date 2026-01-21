import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import type { Clinic, Review } from '@prisma/client';

export type SearchParams = {
  q?: string;
  city?: string;
  province?: string;
  specialty?: string;
  insurance?: string;
  limit?: number;
  offset?: number;
};

// Define the type that includes the relations we need
export type ClinicWithRelations = Clinic & {
  reviews: Review[];
  // We can add other relations here if needed for specific logic,
  // but for the card display, reviews are the main extra data for rating.
  // translations: ClinicTranslation[]; // If we implement translation fallback logic here
};

export async function getClinics(params: SearchParams = {}) {
  const { q, city, province, specialty, insurance, limit = 50, offset = 0 } = params;

  // Build the where clause dynamically
  const where: Prisma.ClinicWhereInput = {};

  if (city) {
    where.city = city;
  }

  if (province) {
    where.province = province;
  }

  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      // Search in specialties
      {
        specialties: {
          some: {
            name: { contains: q, mode: 'insensitive' }
          }
        }
      }
    ];
  }

  if (specialty) {
    where.specialties = {
      some: {
        name: { equals: specialty, mode: 'insensitive' } // Exact match for filter, but case insensitive
      }
    };
  }

  if (insurance) {
    where.insurances = {
      some: {
        name: { contains: insurance, mode: 'insensitive' }
      }
    };
  }

  try {
    const clinics = await prisma.clinic.findMany({
      where,
      take: limit,
      skip: offset,
      include: {
        reviews: true,
        specialties: true,
        insurances: true,
        translations: true, // Fetch translations to potentially use in UI
      },
      orderBy: {
        isVerified: 'desc', // Verified clinics first
      },
    });

    return clinics;
  } catch (error) {
    console.error('Error fetching clinics:', error);
    return [];
  }
}
