import type { Clinic } from '@prisma/client';

export interface MockClinic extends Partial<Clinic> {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  image?: string;
  isVerified: boolean;
  // Extended fields for filtering and comparison
  specialties: string[];
  insurances: string[];
  rating: number;
  reviewCount: number;
  nextAvailable: string; // e.g. "Tomorrow", "In 3 days"
  priceRange: string; // e.g. "$", "$$", "$$$"
  waitTime: string; // e.g. "10-15 mins"
  services: string[];
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
    insurances: ['Tamin', 'Salamat'],
    rating: 4.8,
    reviewCount: 320,
    nextAvailable: 'Tomorrow',
    priceRange: '$$',
    waitTime: '30 mins',
    services: ['Echocardiography', 'Angiography', 'Consultation']
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['General', 'Internal Medicine', 'Neurology'],
    insurances: ['Tamin', 'Salamat', 'NiroohayeMosallah'],
    rating: 4.2,
    reviewCount: 1500,
    nextAvailable: 'In 3 days',
    priceRange: '$',
    waitTime: '2 hours',
    services: ['Emergency', 'MRI', 'Lab Tests']
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
    insurances: ['Salamat'],
    rating: 4.9,
    reviewCount: 85,
    nextAvailable: 'Today',
    priceRange: '$$$',
    waitTime: '5 mins',
    services: ['Laser Therapy', 'Botox', 'Skin Care']
  },
  {
    id: '4',
    name: 'Isfahan Eye Clinic',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Ophthalmology'],
    insurances: ['Tamin', 'Dana'],
    rating: 4.7,
    reviewCount: 210,
    nextAvailable: 'Tomorrow',
    priceRange: '$$',
    waitTime: '15 mins',
    services: ['Lasik', 'Cataract Surgery', 'Eye Exam']
  },
  {
    id: '5',
    name: 'Tabriz Children Hospital',
    city: 'Tabriz',
    province: 'East Azerbaijan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Pediatrics'],
    insurances: ['Tamin', 'Salamat'],
    rating: 4.6,
    reviewCount: 450,
    nextAvailable: 'Today',
    priceRange: '$',
    waitTime: '45 mins',
    services: ['Vaccination', 'Checkup', 'Emergency']
  }
];
