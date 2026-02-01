import { Clinic, Review, Service, Specialty, Insurance } from '@prisma/client';

// Extended type for Clinic with relations
export type ClinicWithRelations = Clinic & {
  reviews: Review[];
  services: Service[];
  specialties: Specialty[];
  insurances: Insurance[];
  averageRating?: number;
};

export interface ClinicFilters {
  q?: string;
  city?: string;
  province?: string;
  specialty?: string[];
  insurance?: string[];
  minRating?: number;
  priceLevel?: string; // 'LOW' | 'MEDIUM' | 'HIGH' - Mock logic based on avg service price
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Mock Data
const MOCK_CLINICS: ClinicWithRelations[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    description: 'Specialized heart clinic in Tehran.',
    address: 'North Kargar Street',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    phone: '+98 21 8802 9600',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    website: 'https://thc.tums.ac.ir',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [
      { id: 'r1', rating: 5, comment: 'Excellent service', status: 'APPROVED', userId: 'u1', clinicId: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 'r2', rating: 4, comment: 'Very busy but good', status: 'APPROVED', userId: 'u2', clinicId: '1', createdAt: new Date(), updatedAt: new Date() },
    ],
    services: [
        { id: 's1', name: 'Cardiology Consultation', description: '', priceMin: 5000000, priceMax: 10000000, currency: 'IRR', clinicId: '1', categoryId: 'c1', createdAt: new Date(), updatedAt: new Date() }
    ],
    specialties: [
        { id: 'sp1', name: 'Cardiology', createdAt: new Date(), updatedAt: new Date() }
    ],
    insurances: [
        { id: 'i1', name: 'Tamin', createdAt: new Date(), updatedAt: new Date() },
        { id: 'i2', name: 'Salamat', createdAt: new Date(), updatedAt: new Date() }
    ],
    averageRating: 4.5
  },
  {
    id: '2',
    name: 'Milad Hospital',
    description: 'General hospital with various specialties.',
    address: 'Hemmat Expressway',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    phone: '+98 21 8203 9',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    website: 'https://miladhospital.com',
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [
       { id: 'r3', rating: 3, comment: 'Average experience', status: 'APPROVED', userId: 'u3', clinicId: '2', createdAt: new Date(), updatedAt: new Date() }
    ],
    services: [
        { id: 's2', name: 'General Checkup', description: '', priceMin: 2000000, priceMax: 5000000, currency: 'IRR', clinicId: '2', categoryId: 'c2', createdAt: new Date(), updatedAt: new Date() }
    ],
    specialties: [
        { id: 'sp2', name: 'General', createdAt: new Date(), updatedAt: new Date() },
        { id: 'sp3', name: 'Dermatology', createdAt: new Date(), updatedAt: new Date() }
    ],
    insurances: [
        { id: 'i1', name: 'Tamin', createdAt: new Date(), updatedAt: new Date() }
    ],
    averageRating: 3.0
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    description: 'Best clinic in Shiraz.',
    address: 'Zand Street',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    phone: '+98 71 3233 4455',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    website: '',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [],
    services: [],
    specialties: [
        { id: 'sp1', name: 'Cardiology', createdAt: new Date(), updatedAt: new Date() },
        { id: 'sp4', name: 'Neurology', createdAt: new Date(), updatedAt: new Date() }
    ],
    insurances: [],
    averageRating: 0
  },
   {
    id: '4',
    name: 'Isfahan Specialized Clinic',
    description: 'Advanced medical services.',
    address: 'Amadgah Street',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    phone: '',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd8189718c?auto=format&fit=crop&q=80&w=1000',
    website: '',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [
         { id: 'r4', rating: 5, comment: 'Great', status: 'APPROVED', userId: 'u4', clinicId: '4', createdAt: new Date(), updatedAt: new Date() }
    ],
    services: [],
    specialties: [
        { id: 'sp5', name: 'Dentistry', createdAt: new Date(), updatedAt: new Date() }
    ],
    insurances: [
         { id: 'i3', name: 'NiroohayeMosallah', createdAt: new Date(), updatedAt: new Date() }
    ],
    averageRating: 5.0
  }
];

export async function getClinics(filters: ClinicFilters = {}): Promise<PaginatedResult<ClinicWithRelations>> {
  // Simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...MOCK_CLINICS];

  // Filter by Query (Name or Description)
  if (filters.q) {
    const q = filters.q.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }

  // Filter by City
  if (filters.city) {
    filtered = filtered.filter((c) => c.city === filters.city);
  }

  // Filter by Province
  if (filters.province) {
    filtered = filtered.filter((c) => c.province === filters.province);
  }

  // Filter by Specialty (Array)
  if (filters.specialty && filters.specialty.length > 0) {
    filtered = filtered.filter((c) =>
      c.specialties.some((s) => filters.specialty?.includes(s.name || ''))
    );
  }

  // Filter by Insurance (Array)
  if (filters.insurance && filters.insurance.length > 0) {
    filtered = filtered.filter((c) =>
        c.insurances.some((i) => filters.insurance?.includes(i.name || ''))
    );
  }

  // Filter by Min Rating
  if (filters.minRating) {
      filtered = filtered.filter((c) => (c.averageRating || 0) >= (filters.minRating || 0));
  }

  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const total = filtered.length;

  const data = filtered.slice(startIndex, endIndex);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
