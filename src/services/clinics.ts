import { Clinic, Service, Review, Insurance, Specialty } from '@prisma/client';

export interface ClinicWithRelations extends Clinic {
  services: Service[];
  reviews: Review[];
  insurances: Insurance[];
  specialties: Specialty[];
  averageRating: number;
  reviewCount: number;
}

export interface GetClinicsParams {
  query?: string;
  city?: string;
  province?: string;
  specialty?: string;
  insurance?: string;
  minRating?: number;
  page?: number;
  limit?: number;
}

// Mock Data
const MOCK_CLINICS: ClinicWithRelations[] = [
  {
    id: '1',
    name: 'Yazd General Hospital',
    description: 'A leading general hospital in Yazd offering comprehensive medical services.',
    address: 'Safaiyeh, Yazd',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    phone: '+98 35 1234 5678',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6c4261?q=80&w=800&auto=format&fit=crop',
    website: 'https://yazd-hospital.ir',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.5,
    reviewCount: 120,
    services: [
      { id: 's1', name: 'General Consultation', description: 'Basic health checkup', priceMin: 500000, priceMax: 1000000, currency: 'IRR', clinicId: '1', createdAt: new Date(), updatedAt: new Date(), categoryId: null },
      { id: 's2', name: 'MRI Scan', description: 'Full body MRI', priceMin: 15000000, priceMax: 20000000, currency: 'IRR', clinicId: '1', createdAt: new Date(), updatedAt: new Date(), categoryId: null },
    ],
    reviews: [],
    insurances: [
        { id: 'i1', name: 'Tamin', createdAt: new Date(), updatedAt: new Date() },
        { id: 'i2', name: 'Salamat', createdAt: new Date(), updatedAt: new Date() }
    ],
    specialties: [
        { id: 'sp1', name: 'Cardiology', createdAt: new Date(), updatedAt: new Date() },
        { id: 'sp2', name: 'Radiology', createdAt: new Date(), updatedAt: new Date() }
    ],
    owners: [],
    favoritedBy: [],
    translations: []
  },
  {
    id: '2',
    name: 'Dr. Amini Dental Clinic',
    description: 'Specialized dental care including implants and orthodontics.',
    address: 'Kashani St, Yazd',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    phone: '+98 35 8765 4321',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    website: null,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.8,
    reviewCount: 45,
    services: [
      { id: 's3', name: 'Dental Implant', description: 'Titanium implant', priceMin: 50000000, priceMax: 80000000, currency: 'IRR', clinicId: '2', createdAt: new Date(), updatedAt: new Date(), categoryId: null },
    ],
    reviews: [],
    insurances: [
        { id: 'i1', name: 'Tamin', createdAt: new Date(), updatedAt: new Date() }
    ],
    specialties: [
        { id: 'sp3', name: 'Dentistry', createdAt: new Date(), updatedAt: new Date() }
    ],
    owners: [],
    favoritedBy: [],
    translations: []
  },
  {
    id: '3',
    name: 'Yazd Heart Center',
    description: 'Specialized cardiology center.',
    address: 'Jomhouri Blvd, Yazd',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    phone: '+98 35 1111 2222',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
    website: null,
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.2,
    reviewCount: 30,
    services: [],
    reviews: [],
    insurances: [
         { id: 'i3', name: 'NiroohayeMosallah', createdAt: new Date(), updatedAt: new Date() }
    ],
    specialties: [
        { id: 'sp1', name: 'Cardiology', createdAt: new Date(), updatedAt: new Date() }
    ],
    owners: [],
    favoritedBy: [],
    translations: []
  },
  {
    id: '4',
    name: 'Meybod General Hospital',
    description: 'Serving the Meybod community.',
    address: 'Meybod Main St',
    city: 'Meybod',
    province: 'Yazd',
    country: 'Iran',
    phone: '+98 35 3333 4444',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop',
    website: null,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 3.9,
    reviewCount: 85,
    services: [],
    reviews: [],
    insurances: [
        { id: 'i1', name: 'Tamin', createdAt: new Date(), updatedAt: new Date() },
        { id: 'i2', name: 'Salamat', createdAt: new Date(), updatedAt: new Date() }
    ],
    specialties: [],
    owners: [],
    favoritedBy: [],
    translations: []
  },
   {
    id: '5',
    name: 'Skin & Hair Clinic',
    description: 'Advanced dermatology treatments.',
    address: 'Atlas Mall, Yazd',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    phone: '+98 35 5555 6666',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
    website: null,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.9,
    reviewCount: 200,
    services: [
         { id: 's4', name: 'Laser Hair Removal', description: 'Full body', priceMin: 2000000, priceMax: 5000000, currency: 'IRR', clinicId: '5', createdAt: new Date(), updatedAt: new Date(), categoryId: null },
    ],
    reviews: [],
    insurances: [],
    specialties: [
        { id: 'sp4', name: 'Dermatology', createdAt: new Date(), updatedAt: new Date() }
    ],
    owners: [],
    favoritedBy: [],
    translations: []
  }
];

export async function getClinics(params: GetClinicsParams): Promise<{ items: ClinicWithRelations[], total: number, page: number, limit: number }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filtered = [...MOCK_CLINICS];

  if (params.query) {
    const q = params.query.toLowerCase();
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q)
    );
  }

  if (params.city) {
    filtered = filtered.filter(c => c.city?.toLowerCase() === params.city?.toLowerCase());
  }

  if (params.province) {
      filtered = filtered.filter(c => c.province?.toLowerCase() === params.province?.toLowerCase());
  }

  if (params.specialty) {
      filtered = filtered.filter(c => c.specialties.some(s => s.name?.toLowerCase() === params.specialty?.toLowerCase()));
  }

  if (params.insurance) {
      filtered = filtered.filter(c => c.insurances.some(i => i.name?.toLowerCase() === params.insurance?.toLowerCase()));
  }

  if (params.minRating) {
      filtered = filtered.filter(c => c.averageRating >= (params.minRating || 0));
  }

  const page = params.page || 1;
  const limit = params.limit || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = filtered.slice(start, end);

  return {
    items,
    total: filtered.length,
    page,
    limit
  };
}
