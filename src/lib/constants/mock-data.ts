import type { Clinic } from '@prisma/client';

export type MockClinic = Partial<Clinic> & {
    specialties: string[];
    insurances: string[];
    rating: number;
    reviewCount: number;
    serviceCategories?: string[];
};

export const MOCK_CLINICS: MockClinic[] = [
    {
        id: '1',
        name: 'Tehran Heart Center',
        description: 'Specialized cardiac care center providing comprehensive heart health services.',
        city: 'Tehran',
        province: 'Tehran',
        country: 'Iran',
        address: 'North Kargar Street, Tehran',
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
        isVerified: true,
        phone: '+98 21 8802 9600',
        website: 'thc.tums.ac.ir',
        rating: 4.8,
        reviewCount: 342,
        specialties: ['Cardiology', 'Surgery'],
        insurances: ['Tamin', 'Salamat', 'NiroohayeMosallah'],
        serviceCategories: ['Surgery', 'Consultation']
    },
    {
        id: '2',
        name: 'Milad Hospital',
        description: 'One of the largest specialty hospitals in Iran offering a wide range of medical services.',
        city: 'Tehran',
        province: 'Tehran',
        country: 'Iran',
        address: 'Hemmat Expressway, Tehran',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
        isVerified: false,
        phone: '+98 21 82039',
        website: 'miladhospital.com',
        rating: 4.2,
        reviewCount: 856,
        specialties: ['General', 'Cardiology', 'Neurology', 'Dermatology'],
        insurances: ['Tamin', 'Salamat'],
        serviceCategories: ['Emergency', 'Inpatient']
    },
    {
        id: '3',
        name: 'Shiraz Central Clinic',
        description: 'A leading outpatient clinic in Shiraz focusing on dermatology and cosmetic procedures.',
        city: 'Shiraz',
        province: 'Fars',
        country: 'Iran',
        address: 'Zand Blvd, Shiraz',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
        isVerified: true,
        phone: '+98 71 3233 4455',
        website: 'shirazclinic.com',
        rating: 4.6,
        reviewCount: 120,
        specialties: ['Dermatology', 'Cosmetic'],
        insurances: ['Salamat', 'NiroohayeMosallah'],
        serviceCategories: ['Cosmetic', 'Dermatology']
    },
    {
        id: '4',
        name: 'Isfahan Neurology Institute',
        description: 'Premier institute for neurological disorders and brain health in Isfahan.',
        city: 'Isfahan',
        province: 'Isfahan',
        country: 'Iran',
        address: 'Amadegah St, Isfahan',
        image: 'https://images.unsplash.com/photo-1579684385136-137af7546118?auto=format&fit=crop&q=80&w=1000',
        isVerified: true,
        phone: '+98 31 3222 5566',
        rating: 4.9,
        reviewCount: 215,
        specialties: ['Neurology'],
        insurances: ['Tamin', 'Salamat', 'NiroohayeMosallah'],
        serviceCategories: ['Neurology', 'Rehabilitation']
    },
    {
        id: '5',
        name: 'Tabriz Children Hospital',
        description: 'Specialized pediatric hospital serving the northwest region of Iran.',
        city: 'Tabriz',
        province: 'East Azerbaijan',
        country: 'Iran',
        address: 'Sheshgolan St, Tabriz',
        image: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=1000',
        isVerified: true,
        phone: '+98 41 3526 2250',
        rating: 4.5,
        reviewCount: 540,
        specialties: ['Pediatrics', 'General'],
        insurances: ['Tamin', 'Salamat'],
        serviceCategories: ['Pediatrics', 'Emergency']
    },
    {
        id: '6',
        name: 'Mashhad Eye Clinic',
        description: 'Advanced ophthalmology center with state-of-the-art diagnostic and surgical equipment.',
        city: 'Mashhad',
        province: 'Razavi Khorasan',
        country: 'Iran',
        address: 'Ahmadabad Blvd, Mashhad',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000',
        isVerified: false,
        phone: '+98 51 3840 2020',
        rating: 4.3,
        reviewCount: 98,
        specialties: ['Ophthalmology'],
        insurances: ['Tamin', 'NiroohayeMosallah'],
        serviceCategories: ['Surgery', 'Consultation']
    }
];
