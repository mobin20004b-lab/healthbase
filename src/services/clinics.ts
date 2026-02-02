import { Clinic, Service, Insurance, Specialty } from '@prisma/client';

export interface ClinicWithRelations extends Clinic {
  averageRating: number;
  reviewCount: number;
  services: Service[];
  insurances: Insurance[];
  specialties: Specialty[];
}

export const MOCK_CLINICS: ClinicWithRelations[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    description: 'Specialized heart center providing top-tier cardiac care.',
    address: 'North Kargar St.',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    phone: '+98 21 8802 9600',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    website: 'https://thc.tums.ac.ir',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.8,
    reviewCount: 320,
    services: [
      { id: 's1', name: 'General Consultation', description: 'Basic checkup', priceMin: 500000, priceMax: 800000, currency: 'IRR', clinicId: '1', createdAt: new Date(), updatedAt: new Date(), categoryId: null },
      { id: 's2', name: 'Echocardiography', description: 'Heart imaging', priceMin: 2000000, priceMax: 3000000, currency: 'IRR', clinicId: '1', createdAt: new Date(), updatedAt: new Date(), categoryId: null },
    ],
    insurances: [
      { id: 'i1', name: 'Tamin Ejtemaei', createdAt: new Date(), updatedAt: new Date() },
      { id: 'i2', name: 'Salam', createdAt: new Date(), updatedAt: new Date() },
    ],
    specialties: [
      { id: 'sp1', name: 'Cardiology', createdAt: new Date(), updatedAt: new Date() },
    ],
  },
  {
    id: '2',
    name: 'Milad Hospital',
    description: 'One of the largest specialty hospitals in Tehran.',
    address: 'Hemmat Expressway',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    phone: '+98 21 8409 0',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    website: 'https://miladhospital.com',
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.2,
    reviewCount: 1500,
    services: [
      { id: 's3', name: 'MRI Scan', description: 'Full body scan', priceMin: 1500000, priceMax: 2000000, currency: 'IRR', clinicId: '2', createdAt: new Date(), updatedAt: new Date(), categoryId: null },
    ],
    insurances: [
      { id: 'i1', name: 'Tamin Ejtemaei', createdAt: new Date(), updatedAt: new Date() },
    ],
    specialties: [
        { id: 'sp2', name: 'General Surgery', createdAt: new Date(), updatedAt: new Date() },
        { id: 'sp3', name: 'Internal Medicine', createdAt: new Date(), updatedAt: new Date() },
    ],
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    description: 'Comprehensive medical services in the heart of Shiraz.',
    address: 'Zand St.',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    phone: '+98 71 3233 4455',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    website: null,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.5,
    reviewCount: 85,
    services: [
        { id: 's4', name: 'Dental Cleaning', description: 'Routine cleaning', priceMin: 800000, priceMax: 1000000, currency: 'IRR', clinicId: '3', createdAt: new Date(), updatedAt: new Date(), categoryId: null },
    ],
    insurances: [
         { id: 'i3', name: 'Dana Insurance', createdAt: new Date(), updatedAt: new Date() },
    ],
    specialties: [
        { id: 'sp4', name: 'Dentistry', createdAt: new Date(), updatedAt: new Date() },
    ],
  }
];

export async function getClinicsByIds(ids: string[]): Promise<ClinicWithRelations[]> {
    if (!ids || ids.length === 0) return [];
    return MOCK_CLINICS.filter(c => ids.includes(c.id));
}

export async function getClinics(): Promise<ClinicWithRelations[]> {
    return MOCK_CLINICS;
}
