import type { Clinic } from '@prisma/client';

export interface MockClinic extends Partial<Clinic> {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  image: string;
  isVerified: boolean;
  // Extended properties for UI/Comparison
  rating: number;
  reviewCount: number;
  nextAvailable: string;
  cost: string;
  waitTime: string;
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
    reviewCount: 1250,
    nextAvailable: 'Tomorrow',
    cost: '$$-$$$',
    waitTime: '15 mins',
    specialties: ['Cardiology', 'Cardiac Surgery', 'Rehabilitation'],
    insurances: ['Tamin Ejtemaei', 'Salamat', 'Dana'],
    serviceCategories: ['Surgery', 'Consultation']
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
    nextAvailable: '3 weeks',
    cost: '$-$$',
    waitTime: '45 mins',
    specialties: ['General', 'Internal Medicine', 'Neurology'],
    insurances: ['Tamin Ejtemaei', 'Salamat', 'Asia'],
    serviceCategories: ['Emergency', 'Surgery', 'Inpatient']
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
    reviewCount: 320,
    nextAvailable: 'Today',
    cost: '$$',
    waitTime: '10 mins',
    specialties: ['Dermatology', 'Cosmetics', 'Laser'],
    insurances: ['Private', 'Dana', 'Alborz'],
    serviceCategories: ['Cosmetic', 'Consultation']
  },
  {
    id: '4',
    name: 'Isfahan Specialized Hospital',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    rating: 4.5,
    reviewCount: 560,
    nextAvailable: '2 days',
    cost: '$$$',
    waitTime: '20 mins',
    specialties: ['Orthopedics', 'Physiotherapy', 'Sports Medicine'],
    insurances: ['Tamin Ejtemaei', 'Salamat'],
    serviceCategories: ['Surgery', 'Rehabilitation']
  },
  {
    id: '5',
    name: 'Tabriz Childrens Hospital',
    city: 'Tabriz',
    province: 'East Azerbaijan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    rating: 4.7,
    reviewCount: 410,
    nextAvailable: '1 week',
    cost: '$-$$',
    waitTime: '30 mins',
    specialties: ['Pediatrics', 'Neonatology', 'Genetics'],
    insurances: ['Tamin Ejtemaei', 'Salamat', 'Armed Forces'],
    serviceCategories: ['Pediatrics', 'Vaccination']
  }
];
