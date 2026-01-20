import prisma from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export type GetClinicsParams = {
  page?: number;
  limit?: number;
  city?: string;
  province?: string;
  specialty?: string;
  insurance?: string;
  q?: string;
  sort?: string;
  lang?: string;
  userId?: string;
};

export async function getClinics({
  page = 1,
  limit = 20,
  city,
  province,
  specialty,
  insurance,
  q,
  sort = 'newest',
  lang = 'fa',
  userId,
}: GetClinicsParams) {
  const skip = (page - 1) * limit;

  const andConditions: Prisma.ClinicWhereInput[] = [];

  // Search in translations as well if q is provided
  if (city) {
    andConditions.push({
      OR: [
        { city: { equals: city, mode: 'insensitive' } },
        { translations: { some: { city: { equals: city, mode: 'insensitive' }, locale: lang } } }
      ]
    });
  }

  if (province) {
    andConditions.push({
      OR: [
        { province: { equals: province, mode: 'insensitive' } },
        { translations: { some: { province: { equals: province, mode: 'insensitive' }, locale: lang } } }
      ]
    });
  }

  if (specialty) {
    andConditions.push({
      services: {
        some: {
          OR: [
            { name: { contains: specialty, mode: 'insensitive' } },
            { category: { name: { contains: specialty, mode: 'insensitive' } } },
            { translations: { some: { name: { contains: specialty, mode: 'insensitive' }, locale: lang } } }
          ]
        }
      }
    });
  }

  if (insurance) {
    // Schema: Clinic has insurances relation (many-to-many).
    // route.ts: { insurances: { has: insurance } } -> implies string array?
    // Schema: Clinic { insurances Insurance[] }
    // So `has` is wrong for relation. It should be `some`.
    // { insurances: { some: { name: insurance } } }
    // I will fix this logic.
    andConditions.push({
      insurances: {
        some: {
          OR: [
            { name: { contains: insurance, mode: 'insensitive' } },
            { translations: { some: { name: { contains: insurance, mode: 'insensitive' }, locale: lang } } }
          ]
        }
      }
    });
  }

  if (q) {
    andConditions.push({
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
        { province: { contains: q, mode: 'insensitive' } },
        { translations: { some: { name: { contains: q, mode: 'insensitive' } } } },
        { translations: { some: { description: { contains: q, mode: 'insensitive' } } } },
        { services: { some: { name: { contains: q, mode: 'insensitive' } } } },
        { services: { some: { translations: { some: { name: { contains: q, mode: 'insensitive' } } } } } },
      ]
    });
  }

  const where: Prisma.ClinicWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Sorting logic
  let orderBy: Prisma.ClinicOrderByWithRelationInput = { createdAt: 'desc' };
  if (sort === 'rating_desc') {
    // This is hard to do with Prisma aggregation in orderBy.
    // We'll stick to in-memory sort for rating as in route.ts
  } else if (sort === 'name_asc') {
    orderBy = { name: 'asc' };
  } else if (sort === 'oldest') {
    orderBy = { createdAt: 'asc' };
  }

  const [clinics, total] = await Promise.all([
    prisma.clinic.findMany({
      where,
      skip,
      take: limit,
      include: {
        services: {
          include: {
            translations: {
              where: { locale: lang }
            }
          }
        },
        reviews: {
          select: { rating: true }
        },
        translations: {
          where: { locale: lang }
        },
        favoritedBy: userId ? { where: { id: userId }, select: { id: true } } : false,
        insurances: {
             include: {
                 translations: { where: { locale: lang } }
             }
        },
        specialties: {
             include: {
                 translations: { where: { locale: lang } }
             }
        }
      },
      orderBy,
    }),
    prisma.clinic.count({ where }),
  ]);

  // Apply translations in memory
  const clinicsWithTranslations = clinics.map((clinic) => {
    const translation = clinic.translations[0];
    const services = clinic.services.map((service) => {
      const sTranslation = service.translations[0];
      return {
        ...service,
        name: sTranslation?.name || service.name,
        description: sTranslation?.description || service.description,
        translations: undefined
      };
    });

    const totalRating = clinic.reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = clinic.reviews.length > 0 ? totalRating / clinic.reviews.length : 0;
    const reviewCount = clinic.reviews.length;

    return {
      ...clinic,
      name: translation?.name || clinic.name,
      description: translation?.description || clinic.description,
      address: translation?.address || clinic.address,
      city: translation?.city || clinic.city,
      province: translation?.province || clinic.province,
      services,
      averageRating,
      reviewCount,
      // Mocked nextAvailable for now as per requirements
      nextAvailable: "Tomorrow",
      isFavorited: clinic.favoritedBy && clinic.favoritedBy.length > 0,
      translations: undefined,
      reviews: undefined,
      favoritedBy: undefined
    };
  });

  // Handle rating sorting in memory for MVP
  if (sort === 'rating_desc') {
    clinicsWithTranslations.sort((a, b) => b.averageRating - a.averageRating);
  }

  return {
    data: clinicsWithTranslations,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
