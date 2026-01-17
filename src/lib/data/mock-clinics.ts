import type { Clinic } from '@prisma/client';

export interface MockClinic extends Partial<Clinic> {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  image: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  specialties?: string[];
  insurances?: string[];
  availability?: string;
  waitTime?: number; // average days
  cost?: string;
}

export const MOCK_CLINICS: MockClinic[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    rating: 4.8,
    reviewCount: 1240,
    specialties: ['Cardiology', 'Surgery'],
    insurances: ['Tamin Ejtemaei', 'Salamat'],
    availability: 'Tomorrow',
    waitTime: 2,
    cost: '$$'
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    rating: 4.2,
    reviewCount: 850,
    specialties: ['General', 'Internal Medicine'],
    insurances: ['Tamin Ejtemaei', 'Armed Forces'],
    availability: '3 weeks',
    waitTime: 14,
    cost: '$'
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    rating: 4.9,
    reviewCount: 210,
    specialties: ['Dermatology', 'Aesthetic'],
    insurances: ['Private', 'Salamat'],
    availability: 'Next Week',
    waitTime: 5,
    cost: '$$$'
  }
];
