import type { Clinic } from '@prisma/client';

export interface ClinicWithRelations extends Partial<Clinic> {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  image: string;
  isVerified: boolean;
  averageRating: number;
  reviewCount: number;
  nextAvailable: string;
  waitTime: number; // minutes
  cost: string; // $, $$, $$$
  services: string[];
  insurances: string[];
}

export const MOCK_CLINICS: ClinicWithRelations[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    averageRating: 4.8,
    reviewCount: 1240,
    nextAvailable: 'Tomorrow',
    waitTime: 45,
    cost: '$$',
    services: ['Cardiology', 'Surgery', 'Rehabilitation'],
    insurances: ['Tamin Ejtemaei', 'Salamat'],
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
    reviewCount: 850,
    nextAvailable: 'In 3 days',
    waitTime: 120,
    cost: '$',
    services: ['General', 'Pediatrics', 'Orthopedics'],
    insurances: ['All'],
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
    reviewCount: 320,
    nextAvailable: 'Today',
    waitTime: 15,
    cost: '$$$',
    services: ['Dermatology', 'Laser', 'Beauty'],
    insurances: ['Private'],
  }
];

export async function getClinicsByIds(ids: string[]): Promise<ClinicWithRelations[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_CLINICS.filter(clinic => ids.includes(clinic.id));
}

export async function getClinics(): Promise<ClinicWithRelations[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_CLINICS;
}
