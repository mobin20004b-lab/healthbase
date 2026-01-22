import type { Clinic } from '@prisma/client';

export interface MockClinic extends Partial<Clinic> {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  image?: string;
  isVerified?: boolean;
  specialties: string[];
  insurances: string[];
  rating: number;
  reviewCount: number;
  cost: string; // e.g. "$", "$$", "$$$"
  waitTime: string; // e.g. "2 days", "1 week"
  nextAvailable: string; // e.g. "Tomorrow"
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
    specialties: ['Cardiology', 'Surgery'],
    insurances: ['Tamin Ejtemaei', 'Salamt'],
    rating: 4.8,
    reviewCount: 320,
    cost: '$$',
    waitTime: '3 weeks',
    nextAvailable: 'in 21 days'
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['General', 'Orthopedics', 'Cardiology'],
    insurances: ['All'],
    rating: 4.2,
    reviewCount: 1500,
    cost: '$',
    waitTime: '2 months',
    nextAvailable: 'in 60 days'
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Dermatology', 'Cosmetic'],
    insurances: ['Private'],
    rating: 4.9,
    reviewCount: 85,
    cost: '$$$',
    waitTime: '1 week',
    nextAvailable: 'Tomorrow'
  },
   {
    id: '4',
    name: 'Tabriz Children Hospital',
    city: 'Tabriz',
    province: 'East Azerbaijan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Pediatrics', 'Neurology'],
    insurances: ['Tamin Ejtemaei'],
    rating: 4.6,
    reviewCount: 210,
    cost: '$$',
    waitTime: '2 days',
    nextAvailable: 'Tomorrow'
  }
];
