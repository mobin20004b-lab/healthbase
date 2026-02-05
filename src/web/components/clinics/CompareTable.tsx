"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/routing';
import { Star, MapPin, Wallet, Calendar } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { cn } from '@/lib/utils';
// import type { ClinicWithRelations } from '@/services/clinics';

export interface ComparableClinic {
    id: string;
    name: string;
    city: string | null;
    image: string | null;
    averageRating: number;
    reviewCount: number;
    isVerified: boolean;
    services: { id: string; name: string }[];
}

interface CompareTableProps {
    clinics: ComparableClinic[];
}

export function CompareTable({ clinics }: CompareTableProps) {
    const t = useTranslations('Clinics');

    if (clinics.length === 0) return null;

    return (
        <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[800px] border-collapse">
                <thead>
                    <tr>
                        <th className="sticky left-0 z-20 bg-surface/95 backdrop-blur-sm p-4 text-left w-48 border-b border-outline-variant/20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                            <span className="text-lg font-bold text-on-surface">{t('comparison')}</span>
                        </th>
                        {clinics.map((clinic) => (
                            <th key={clinic.id} className="p-4 min-w-[250px] align-top border-b border-outline-variant/20 bg-surface/50">
                                <div className="space-y-3">
                                    <div className="relative h-32 w-full rounded-xl overflow-hidden bg-surface-container-highest">
                                        {clinic.image ? (
                                            <Image
                                                src={clinic.image}
                                                alt={clinic.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <MapPin className="h-8 w-8 text-on-surface-variant/20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <Link href={`/clinics/${clinic.id}`} className="text-lg font-bold text-on-surface hover:text-primary transition-colors block mb-1">
                                            {clinic.name}
                                        </Link>
                                        <div className="flex items-center gap-1 text-sm text-on-surface-variant">
                                            <MapPin className="h-3.5 w-3.5" />
                                            <span>{clinic.city}</span>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                    {/* Rating Row */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-surface/95 backdrop-blur-sm p-4 font-semibold text-on-surface shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                            {t('rating')}
                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="p-4 bg-surface/50">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-md">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold">{clinic.averageRating.toFixed(1)}</span>
                                    </div>
                                    <span className="text-sm text-on-surface-variant">({clinic.reviewCount} reviews)</span>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Availability Row (Mocked) */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-surface/95 backdrop-blur-sm p-4 font-semibold text-on-surface shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                            {t('availability')}
                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="p-4 bg-surface/50">
                                <div className={cn(
                                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                                    // Mock logic: verified clinics have better availability for demo
                                    clinic.isVerified
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                )}>
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{clinic.isVerified ? "Tomorrow" : "Next Week"}</span>
                                </div>
                            </td>
                        ))}
                    </tr>

                     {/* Cost Row (Mocked) */}
                     <tr>
                        <td className="sticky left-0 z-10 bg-surface/95 backdrop-blur-sm p-4 font-semibold text-on-surface shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                            {t('cost')}
                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="p-4 bg-surface/50">
                                <div className="flex items-center gap-2 text-on-surface">
                                    <Wallet className="h-4 w-4 text-on-surface-variant" />
                                    {/* Mock logic */}
                                    <span>{clinic.isVerified ? "$$" : "$$$"}</span>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Services Row */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-surface/95 backdrop-blur-sm p-4 font-semibold text-on-surface shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] align-top">
                            {t('services')}
                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="p-4 bg-surface/50 align-top">
                                <div className="flex flex-wrap gap-2">
                                    {clinic.services.length > 0 ? (
                                        clinic.services.slice(0, 5).map((service) => (
                                            <span key={service.id} className="text-xs bg-surface-variant/50 px-2 py-1 rounded-md text-on-surface-variant border border-outline-variant/30">
                                                {service.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-on-surface-variant italic">No services listed</span>
                                    )}
                                    {clinic.services.length > 5 && (
                                        <span className="text-xs text-on-surface-variant px-1">+{clinic.services.length - 5} more</span>
                                    )}
                                </div>
                            </td>
                        ))}
                    </tr>

                     {/* Action Row */}
                     <tr>
                        <td className="sticky left-0 z-10 bg-surface/95 backdrop-blur-sm p-4 font-semibold text-on-surface shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="p-4 bg-surface/50">
                                <Button className="w-full" asChild>
                                    <Link href={`/clinics/${clinic.id}`}>
                                        {t('viewProfile', { defaultValue: 'View Profile' })}
                                    </Link>
                                </Button>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
