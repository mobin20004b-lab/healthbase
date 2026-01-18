import type { Clinic } from '@prisma/client';

export type MockClinic = Partial<Clinic> & {
    specialties: string[];
    insurances: string[];
    serviceCategories: string[];
    rating: number;
    reviewCount: number;
    nextAvailable: string;
    waitTime: number; // in minutes
    cost: {
        min: number;
        max: number;
        currency: string;
    };
};

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
    insurances: ['Tamin', 'Salamat'],
    serviceCategories: ['Consultation', 'Surgery'],
    rating: 4.8,
    reviewCount: 320,
    nextAvailable: 'Tomorrow',
    waitTime: 15,
    cost: {
        min: 200000,
        max: 5000000,
        currency: 'TOMAN'
    }
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['General', 'Internal', 'Neurology'],
    insurances: ['Tamin', 'Salamat', 'NiroohayeMosallah'],
    serviceCategories: ['Emergency', 'Checkup'],
    rating: 4.2,
    reviewCount: 1500,
    nextAvailable: '3 weeks',
    waitTime: 45,
    cost: {
        min: 50000,
        max: 1000000,
        currency: 'TOMAN'
    }
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
    insurances: [],
    serviceCategories: ['Laser', 'Botox'],
    rating: 4.9,
    reviewCount: 85,
    nextAvailable: '2 days',
    waitTime: 5,
    cost: {
        min: 500000,
        max: 8000000,
        currency: 'TOMAN'
    }
  },
    {
    id: '4',
    name: 'Mashhad Eye Clinic',
    city: 'Mashhad',
    province: 'Razavi Khorasan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000', // Placeholder
    isVerified: true,
    specialties: ['Ophthalmology'],
    insurances: ['Tamin'],
    serviceCategories: ['Lasik', 'Checkup'],
    rating: 4.6,
    reviewCount: 210,
    nextAvailable: '1 week',
    waitTime: 20,
    cost: {
        min: 300000,
        max: 12000000,
        currency: 'TOMAN'
    }
  }
];
