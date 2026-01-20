import type { Clinic } from '@prisma/client';

export type MockClinic = Partial<Clinic> & {
    specialties: string[];
    insurances: string[];
    serviceCategories: string[];
    rating: number;
    reviewCount: number;
    cost: {
        min: number;
        max: number;
        currency: string;
    };
    waitTime: string; // e.g. "Low", "Medium", "High" or specific days
    nextAvailable: string; // e.g. "Tomorrow"
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
    reviewCount: 1240,
    cost: { min: 500000, max: 2000000, currency: 'IRR' },
    waitTime: 'High',
    nextAvailable: '3 weeks',
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['General', 'Orthopedics', 'Neurology'],
    insurances: ['Tamin', 'Salamat', 'NiroohayeMosallah'],
    serviceCategories: ['Emergency', 'Inpatient'],
    rating: 3.9,
    reviewCount: 850,
    cost: { min: 200000, max: 1000000, currency: 'IRR' },
    waitTime: 'Very High',
    nextAvailable: '2 months',
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Dermatology', 'Aesthetic'],
    insurances: ['Private'],
    serviceCategories: ['Outpatient'],
    rating: 4.5,
    reviewCount: 320,
    cost: { min: 1500000, max: 5000000, currency: 'IRR' },
    waitTime: 'Low',
    nextAvailable: 'Tomorrow',
  },
  {
    id: '4',
    name: 'Tabriz Children Hospital',
    city: 'Tabriz',
    province: 'East Azerbaijan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Pediatrics', 'Neonatology'],
    insurances: ['Tamin', 'Salamat'],
    serviceCategories: ['Inpatient', 'NICU'],
    rating: 4.7,
    reviewCount: 560,
    cost: { min: 300000, max: 1500000, currency: 'IRR' },
    waitTime: 'Medium',
    nextAvailable: '3 days',
  },
  {
    id: '5',
    name: 'Isfahan Eye Clinic',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Ophthalmology'],
    insurances: ['Tamin', 'Salamat', 'Asia'],
    serviceCategories: ['Surgery', 'Lasik'],
    rating: 4.9,
    reviewCount: 210,
    cost: { min: 2000000, max: 8000000, currency: 'IRR' },
    waitTime: 'Medium',
    nextAvailable: '1 week',
  }
];
