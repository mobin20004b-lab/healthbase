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
    nextAvailable: string;
    waitTime: string;
    cost: string;
    specialties: string[];
    insurances: string[];
    serviceCategories: string[];
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
    reviewCount: 320,
    nextAvailable: 'Tomorrow',
    waitTime: '45 mins',
    cost: '$50 - $150',
    specialties: ['Cardiology', 'Surgery'],
    insurances: ['Tamin', 'Salamat'],
    serviceCategories: ['Consultation', 'Surgery']
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
    reviewCount: 150,
    nextAvailable: 'In 3 days',
    waitTime: '2 hours',
    cost: '$30 - $100',
    specialties: ['General', 'Orthopedics'],
    insurances: ['Tamin', 'NiroohayeMosallah'],
    serviceCategories: ['Emergency', 'Inpatient']
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
    reviewCount: 85,
    nextAvailable: 'Today',
    waitTime: '15 mins',
    cost: '$60 - $200',
    specialties: ['Dermatology', 'Cosmetic'],
    insurances: ['Salamat'],
    serviceCategories: ['Skin Care', 'Laser']
  }
];
