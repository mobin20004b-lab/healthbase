"use client";

import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/routing'; // Ensure localized routing
import { Button } from '@/web/components/ui/button';
import { ArrowLeft, Check, Star, Wallet, Calendar, Clock } from 'lucide-react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';

// Reusing MOCK_CLINICS for MVP. Ideally this would be fetched or passed via context/store.
// In a real app, we might fetch these by IDs from the API.
const MOCK_CLINICS: Partial<Clinic>[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
  }
];

// Extended mock data for comparison fields
type ClinicDetails = {
    availability: string;
    rating: number;
    reviews: number;
    waitTime: string;
    cost: string;
    specialties: string[];
    insurances: string[];
};

const MOCK_DETAILS: Record<string, ClinicDetails> = {
    '1': {
        availability: 'Tomorrow',
        rating: 4.8,
        reviews: 240,
        waitTime: '15 mins',
        cost: '$50 - $150',
        specialties: ['Cardiology', 'Surgery'],
        insurances: ['Allianz', 'Social Security'],
    },
    '2': {
        availability: 'In 3 weeks',
        rating: 4.2,
        reviews: 120,
        waitTime: '45 mins',
        cost: '$30 - $100',
        specialties: ['General', 'Internal Medicine'],
        insurances: ['Social Security'],
    },
    '3': {
        availability: 'Today',
        rating: 4.9,
        reviews: 85,
        waitTime: '10 mins',
        cost: '$60 - $200',
        specialties: ['Dermatology', 'Cosmetic'],
        insurances: ['Private', 'Allianz'],
    }
};

export default function ComparePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const ids = searchParams.get('ids')?.split(',') || [];

    const selectedClinics = MOCK_CLINICS.filter(c => ids.includes(c.id!));

    if (selectedClinics.length === 0) {
        return (
            <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
                <h2 className="text-2xl font-bold">No clinics selected</h2>
                <p className="mt-2 text-on-surface-variant">Please go back and select clinics to compare.</p>
                <Button className="mt-4" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Search
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-center gap-4">
                    <Button variant="outlined" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-3xl font-bold text-on-surface">Compare Clinics</h1>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-outline-variant/20 bg-surface shadow-sm">
                    <table className="w-full min-w-[800px] border-collapse text-left">
                        <thead>
                            <tr className="bg-surface-container-low">
                                <th className="sticky left-0 z-10 w-48 bg-surface-container-low p-6 text-sm font-semibold text-on-surface-variant backdrop-blur">
                                    Feature
                                </th>
                                {selectedClinics.map(clinic => (
                                    <th key={clinic.id} className="min-w-[250px] p-6 align-top">
                                        <div className="flex flex-col gap-3">
                                            <div className="h-40 w-full overflow-hidden rounded-2xl bg-surface-container-highest">
                                                <img
                                                    src={clinic.image || ''}
                                                    alt={clinic.name || ''}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold text-on-surface">{clinic.name}</h3>
                                                <p className="text-sm text-on-surface-variant">{clinic.city}, {clinic.country}</p>
                                            </div>
                                            <Button className="w-full">Book Now</Button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                            {/* Availability Row */}
                            <tr>
                                <th className="sticky left-0 bg-surface p-6 text-sm font-medium text-on-surface-variant">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Next Availability
                                    </div>
                                </th>
                                {selectedClinics.map(clinic => {
                                    const details = MOCK_DETAILS[clinic.id!] || {};
                                    const isGood = details.availability === 'Today' || details.availability === 'Tomorrow';
                                    return (
                                        <td key={clinic.id} className="p-6">
                                            <span className={cn(
                                                "inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium",
                                                isGood
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                            )}>
                                                {details.availability || 'Unknown'}
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>

                            {/* Rating Row */}
                            <tr>
                                <th className="sticky left-0 bg-surface p-6 text-sm font-medium text-on-surface-variant">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-4 w-4" />
                                        Patient Rating
                                    </div>
                                </th>
                                {selectedClinics.map(clinic => {
                                    const details = MOCK_DETAILS[clinic.id!] || {};
                                    return (
                                        <td key={clinic.id} className="p-6">
                                            <div className="flex items-center gap-2">
                                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                <span className="text-lg font-bold">{details.rating}</span>
                                                <span className="text-sm text-on-surface-variant">({details.reviews} reviews)</span>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>

                            {/* Wait Time Row */}
                            <tr>
                                <th className="sticky left-0 bg-surface p-6 text-sm font-medium text-on-surface-variant">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Avg. Wait Time
                                    </div>
                                </th>
                                {selectedClinics.map(clinic => {
                                    const details = MOCK_DETAILS[clinic.id!] || {};
                                    // Visual bar for wait time (shorter is better)
                                    // Assuming max wait is 60m for visualization scale
                                    const minutes = parseInt(details.waitTime) || 0;
                                    const percentage = Math.min((minutes / 60) * 100, 100);

                                    return (
                                        <td key={clinic.id} className="p-6">
                                            <div className="space-y-1">
                                                <span className="font-medium">{details.waitTime}</span>
                                                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-container-highest">
                                                    <div
                                                        className={cn("h-full rounded-full", minutes < 20 ? "bg-green-500" : "bg-primary")}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>

                            {/* Cost Row */}
                            <tr>
                                <th className="sticky left-0 bg-surface p-6 text-sm font-medium text-on-surface-variant">
                                    <div className="flex items-center gap-2">
                                        <Wallet className="h-4 w-4" />
                                        Estimated Cost
                                    </div>
                                </th>
                                {selectedClinics.map(clinic => {
                                    const details = MOCK_DETAILS[clinic.id!] || {};
                                    return (
                                        <td key={clinic.id} className="p-6">
                                            <span className="font-mono text-base font-medium">{details.cost}</span>
                                        </td>
                                    );
                                })}
                            </tr>

                            {/* Specialties Row */}
                            <tr>
                                <th className="sticky left-0 bg-surface p-6 text-sm font-medium text-on-surface-variant">
                                    <div className="flex items-center gap-2">
                                        <Check className="h-4 w-4" />
                                        Specialties
                                    </div>
                                </th>
                                {selectedClinics.map(clinic => {
                                    const details = MOCK_DETAILS[clinic.id!] || {};
                                    return (
                                        <td key={clinic.id} className="p-6">
                                            <div className="flex flex-wrap gap-2">
                                                {details.specialties?.map((s: string) => (
                                                    <span key={s} className="rounded-full border border-outline-variant px-2 py-0.5 text-xs">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
