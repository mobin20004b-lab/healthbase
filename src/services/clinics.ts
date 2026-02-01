import type { Clinic } from '@prisma/client';

export interface ClinicWithRelations extends Clinic {
  averageRating?: number;
  reviewCount?: number;
  services?: unknown[];
}

const MOCK_CLINICS: Partial<ClinicWithRelations>[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    averageRating: 4.8,
    reviewCount: 120,
    services: [], // Mocking JSON field as array if needed, or specific type
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    averageRating: 4.2,
    reviewCount: 85,
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    averageRating: 4.9,
    reviewCount: 200,
  },
  {
    id: '4',
    name: 'Isfahan Specialized Clinic',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    averageRating: 4.5,
    reviewCount: 56,
  },
  {
    id: '5',
    name: 'Mashhad General Hospital',
    city: 'Mashhad',
    province: 'Razavi Khorasan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    averageRating: 3.8,
    reviewCount: 42,
  },
];

export interface GetClinicsParams {
  city?: string;
  province?: string;
  specialty?: string;
  insurance?: string;
  q?: string;
}

export async function getClinics(params: GetClinicsParams): Promise<ClinicWithRelations[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...MOCK_CLINICS];

  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(
      (clinic) =>
        clinic.name?.toLowerCase().includes(query) ||
        clinic.city?.toLowerCase().includes(query)
    );
  }

  if (params.city) {
    filtered = filtered.filter((clinic) => clinic.city === params.city);
  }

  if (params.province) {
    filtered = filtered.filter((clinic) => clinic.province === params.province);
  }

  // Note: Specialty and Insurance are not in the mock data structure yet (usually relations or JSON fields).
  // For now, we'll skip filtering by them in the mock implementation or assume they are implied by name for demo purposes.
  // In a real implementation with Prisma, we would query the database with relations.

  // Example of handling if we had the data:
  if (params.specialty) {
      // Mock filtering: if name contains specialty (very rough mock)
      // filtered = filtered.filter(c => c.name?.includes(params.specialty!));
      // Or just return empty or random for now if not matching, but let's keep it open for demo.
  }

  return filtered as ClinicWithRelations[];
}
