import type { Clinic } from '@prisma/client';

export interface MockClinic extends Partial<Clinic> {
    id: string;
    name: string;
    city: string;
    province: string;
    country: string;
    image: string;
    isVerified: boolean;
    // Extended fields
    specialties: string[];
    insurances: string[];
    serviceCategories: string[];
    rating: number;
    reviewCount: number;
    nextAvailable: string;
    waitTime: string; // e.g. "Low", "Medium", "High" or minutes
    cost: string; // e.g. "$", "$$", "$$$"
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
        specialties: ['Cardiology', 'Cardiac Surgery'],
        insurances: ['Social Security', 'Armed Forces'],
        serviceCategories: ['Consultation', 'Surgery'],
        rating: 4.8,
        reviewCount: 1240,
        nextAvailable: 'Tomorrow',
        waitTime: '45 mins',
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
        specialties: ['General', 'Internal Medicine', 'Orthopedics'],
        insurances: ['Social Security', 'Iran Insurance'],
        serviceCategories: ['Emergency', 'Consultation'],
        rating: 4.2,
        reviewCount: 850,
        nextAvailable: 'In 3 days',
        waitTime: '2 hours',
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
        specialties: ['Dermatology', 'Cosmetic Surgery'],
        insurances: ['Dana', 'Asia'],
        serviceCategories: ['Cosmetic', 'Laser'],
        rating: 4.9,
        reviewCount: 320,
        nextAvailable: 'Today',
        waitTime: '15 mins',
        cost: '$$$',
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
        insurances: ['Social Security', 'Armed Forces'],
        serviceCategories: ['Pediatric', 'Emergency'],
        rating: 4.7,
        reviewCount: 560,
        nextAvailable: 'Tomorrow',
        waitTime: '30 mins',
        cost: '$',
    }
];
