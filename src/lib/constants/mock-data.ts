import type { Clinic } from '@prisma/client';

export interface MockClinic extends Partial<Clinic> {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  image: string;
  isVerified: boolean;
  // Extra fields for comparison/display
  specialties: string[];
  insurances: string[];
  serviceCategories: string[]; // For filtering
  rating: number;
  reviewCount: number;
  nextAvailable: string; // e.g. "Tomorrow", "In 3 weeks"
  waitTime: number; // in minutes
  cost: string; // e.g. "$$", "$100-200"
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
    insurances: ['Tamin Ejtemaei', 'Salamat'],
    serviceCategories: ['Heart Surgery', 'Consultation'],
    rating: 4.8,
    reviewCount: 1240,
    nextAvailable: 'Tomorrow',
    waitTime: 15,
    cost: '$$',
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['General', 'Internal Medicine'],
    insurances: ['Tamin Ejtemaei', 'Armed Forces'],
    serviceCategories: ['General Checkup', 'Emergency'],
    rating: 4.2,
    reviewCount: 850,
    nextAvailable: 'In 3 days',
    waitTime: 45,
    cost: '$',
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
    insurances: ['Private', 'Salamat'],
    serviceCategories: ['Skin Care', 'Laser'],
    rating: 4.9,
    reviewCount: 320,
    nextAvailable: 'In 2 weeks',
    waitTime: 10,
    cost: '$$$',
  },
  {
    id: '4',
    name: 'Isfahan Specialized Clinic',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Orthopedics', 'Physiotherapy'],
    insurances: ['Tamin Ejtemaei'],
    serviceCategories: ['Physical Therapy', 'Surgery'],
    rating: 4.6,
    reviewCount: 150,
    nextAvailable: 'Tomorrow',
    waitTime: 20,
    cost: '$$',
  },
  {
    id: '5',
    name: 'Tabriz Children Hospital',
    city: 'Tabriz',
    province: 'East Azerbaijan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Pediatrics'],
    insurances: ['All'],
    serviceCategories: ['Pediatric Care'],
    rating: 4.7,
    reviewCount: 500,
    nextAvailable: 'Today',
    waitTime: 30,
    cost: '$',
  }
];
