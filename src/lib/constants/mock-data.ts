import type { Clinic } from '@prisma/client';

export interface MockClinic extends Clinic {
  rating: number;
  reviewCount: number;
  nextAvailable: string;
  specialties: string[];
  insurances: string[];
  serviceCategories: string[];
  cost: string;
}

export const MOCK_CLINICS: MockClinic[] = [
  {
    id: '1',
    name: 'Yazd Cardiovascular Center',
    description: 'Specialized center for heart diseases and surgery with advanced equipment.',
    address: 'Jomhouri Blvd, Yazd',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    phone: '035-12345678',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww',
    website: 'https://yazdheart.com',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.8,
    reviewCount: 124,
    nextAvailable: 'Tomorrow',
    specialties: ['Cardiology', 'Surgery'],
    insurances: ['Salamat', 'Tamin'],
    serviceCategories: ['Consultation', 'Surgery'],
    cost: '$$'
  },
  {
    id: '2',
    name: 'Dr. Karimi Dental Clinic',
    description: 'Modern dental clinic offering cosmetic and restorative dentistry.',
    address: 'Kashani St, Yazd',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    phone: '035-87654321',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVudGFsJTIwY2xpbmljfGVufDB8fDB8fHww',
    website: 'https://karimidental.com',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.5,
    reviewCount: 89,
    nextAvailable: 'Today',
    specialties: ['Dentistry'],
    insurances: ['Tamin', 'NiroohayeMosallah'],
    serviceCategories: ['Implants', 'Orthodontics'],
    cost: '$$$'
  },
  {
    id: '3',
    name: 'Tehran Skin & Hair Clinic',
    description: 'Leading dermatology center in Tehran offering laser treatments and surgeries.',
    address: 'Valiasr St, Tehran',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    phone: '021-98765432',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D',
    website: 'https://tehranskin.com',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.2,
    reviewCount: 45,
    nextAvailable: 'In 2 days',
    specialties: ['Dermatology'],
    insurances: ['Salamat'],
    serviceCategories: ['Laser', 'Botox'],
    cost: '$$$'
  },
  {
    id: '4',
    name: 'Meybod General Hospital',
    description: 'Comprehensive medical services for the Meybod region.',
    address: 'Imam Khomeini St, Meybod',
    city: 'Meybod',
    province: 'Yazd',
    country: 'Iran',
    phone: '035-32112345',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D',
    website: '',
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 3.9,
    reviewCount: 210,
    nextAvailable: 'Today',
    specialties: ['General', 'Pediatrics', 'Cardiology'],
    insurances: ['Salamat', 'Tamin', 'NiroohayeMosallah'],
    serviceCategories: ['Emergency', 'Surgery'],
    cost: '$'
  },
  {
    id: '5',
    name: 'Isfahan Neurology Institute',
    description: 'Specialized care for neurological disorders.',
    address: 'Chaharbagh, Isfahan',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    phone: '031-33344455',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVkaWNhbHxlbnwwfHwwfHx8MA%3D%3D',
    website: 'https://isfahanneuro.com',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.9,
    reviewCount: 312,
    nextAvailable: 'In 1 week',
    specialties: ['Neurology'],
    insurances: ['Tamin'],
    serviceCategories: ['MRI', 'Consultation'],
    cost: '$$'
  }
];
