import type { Clinic } from '@prisma/client';

export type ClinicWithDetails = Partial<Clinic> & {
  rating: number;
  reviewCount: number;
  waitTime: string; // e.g. "20 min", "1 hour"
  nextAvailable: string; // e.g. "Tomorrow", "In 3 weeks"
  cost: string; // e.g. "$", "$$", "$$$"
  specialties: string[];
  insurances: string[];
  serviceCategories: string[];
};

export const MOCK_CLINICS: ClinicWithDetails[] = [
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
    waitTime: '15 min',
    nextAvailable: 'Tomorrow',
    cost: '$$',
    specialties: ['Cardiology', 'Surgery'],
    insurances: ['Tamin Ejtemaei', 'Salamat'],
    serviceCategories: ['Consultation', 'Heart Surgery', 'Angiography'],
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
    reviewCount: 1500,
    waitTime: '45 min',
    nextAvailable: 'In 3 days',
    cost: '$',
    specialties: ['General', 'Internal Medicine', 'Orthopedics'],
    insurances: ['Tamin Ejtemaei', 'Salamat', 'Armed Forces'],
    serviceCategories: ['Emergency', 'General Visit', 'MRI'],
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
    waitTime: '10 min',
    nextAvailable: 'Today',
    cost: '$$$',
    specialties: ['Dermatology', 'Aesthetic'],
    insurances: ['Dana', 'Asia'],
    serviceCategories: ['Skin Care', 'Laser', 'Botox'],
  },
  {
    id: '4',
    name: 'Isfahan Specialized Clinic',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    rating: 4.6,
    reviewCount: 210,
    waitTime: '25 min',
    nextAvailable: 'Tomorrow',
    cost: '$$',
    specialties: ['Neurology', 'Psychiatry'],
    insurances: ['Tamin Ejtemaei', 'Salamat'],
    serviceCategories: ['Therapy', 'Brain Scan'],
  },
  {
    id: '5',
    name: 'Tabriz Children Hospital',
    city: 'Tabriz',
    province: 'East Azerbaijan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd8189718c?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    rating: 4.7,
    reviewCount: 450,
    waitTime: '30 min',
    nextAvailable: 'In 1 week',
    cost: '$',
    specialties: ['Pediatrics', 'Neonatology'],
    insurances: ['All'],
    serviceCategories: ['Vaccination', 'Checkup'],
  }
];
