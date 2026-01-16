import type { Clinic } from '@prisma/client';

export interface MockClinic extends Clinic {
  specialties: string[];
  insurances: string[];
  rating: number;
  reviewCount: number;
}

const now = new Date();

export const MOCK_CLINICS: MockClinic[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    description: 'Specialized heart center in Tehran.',
    address: 'North Kargar Street',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    phone: '02188029600',
    website: 'http://thc.tums.ac.ir/',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Cardiology'],
    insurances: ['Tamin', 'Salamat'],
    rating: 4.8,
    reviewCount: 1200,
    createdAt: now,
    updatedAt: now
  },
  {
    id: '2',
    name: 'Milad Hospital',
    description: 'General hospital with various specialties.',
    address: 'Hemmat Highway',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    phone: '02182039',
    website: 'http://milad.ir',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['General', 'Cardiology', 'Dermatology'],
    insurances: ['Tamin'],
    rating: 3.9,
    reviewCount: 500,
    createdAt: now,
    updatedAt: now
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    description: 'Best clinic in Shiraz for dermatology.',
    address: 'Zand Street',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    phone: '07132345678',
    website: null,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Dermatology'],
    insurances: ['Salamat', 'NiroohayeMosallah'],
    rating: 4.5,
    reviewCount: 150,
    createdAt: now,
    updatedAt: now
  },
    {
    id: '4',
    name: 'Yazd Eye Hospital',
    description: 'Advanced eye care center.',
    address: 'Kashani Street',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    phone: '03536245678',
    website: null,
    image: 'https://images.unsplash.com/photo-1579684385136-137af18db23d?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Ophthalmology'],
    insurances: ['Tamin', 'Salamat'],
    rating: 4.7,
    reviewCount: 320,
    createdAt: now,
    updatedAt: now
  }
];
