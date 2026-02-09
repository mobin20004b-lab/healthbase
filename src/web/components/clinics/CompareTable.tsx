"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Star, MapPin, Calendar, Wallet, Clock, Check } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Link } from '@/routing';
import type { ClinicWithRelations } from '@/services/clinics';
import { cn } from '@/lib/utils';

interface CompareTableProps {
    clinics: ClinicWithRelations[];
}

export function CompareTable({ clinics }: CompareTableProps) {
    const t = useTranslations('Clinics');

    if (!clinics || clinics.length === 0) return <div className="p-8 text-center text-on-surface-variant">No clinics to compare.</div>;

    return (
        <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[800px] border-separate border-spacing-0">
                <thead>
                    <tr>
                        <th className="sticky left-0 z-20 bg-surface p-4 text-left w-48 border-b border-outline-variant/20 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                            <span className="text-lg font-bold text-on-surface">{t('comparison')}</span>
                        </th>
                        {clinics.map(clinic => (
                            <th key={clinic.id} className="p-4 w-64 min-w-[250px] border-b border-outline-variant/20 align-bottom bg-surface">
                                <div className="flex flex-col gap-3">
                                    <div className="relative h-32 w-full rounded-xl overflow-hidden bg-surface-container-highest">
                                        {clinic.image ? (
                                            <Image src={clinic.image} alt={clinic.name} fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <MapPin className="h-8 w-8 text-on-surface-variant/20" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-on-surface line-clamp-2 text-start">{clinic.name}</h3>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                    {/* Rating Row */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-surface p-4 font-semibold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                            {t('rating')}
                        </td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-4 align-top bg-surface/50">
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

                    {/* Location Row */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-surface p-4 font-semibold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                            {t('location')}
                        </td>
                         {clinics.map(clinic => (
                            <td key={clinic.id} className="p-4 align-top text-on-surface bg-surface/50">
                                {clinic.city || "Unknown"}, {clinic.province || "Unknown"}
                            </td>
                        ))}
                    </tr>

                    {/* Availability Row (Mocked) */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-surface p-4 font-semibold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                            {t('availability')}
                        </td>
                        {clinics.map((clinic, idx) => {
                             // Mock logic: alternate for visual variety
                             const isSoon = idx % 2 === 0;
                             return (
                                <td key={clinic.id} className="p-4 align-top bg-surface/50">
                                    <div className={cn(
                                        "flex items-center gap-2 font-medium",
                                        isSoon ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                                    )}>
                                        <Calendar className="h-4 w-4" />
                                        <span>{isSoon ? "Tomorrow" : "In 3 weeks"}</span>
                                    </div>
                                </td>
                             );
                        })}
                    </tr>

                     {/* Wait Time Row (Mocked Bar Chart) */}
                     <tr>
                        <td className="sticky left-0 z-10 bg-surface p-4 font-semibold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                            {t('waitTime')}
                        </td>
                        {clinics.map((clinic, idx) => {
                             // Mock logic
                             const waitTime = idx === 0 ? 15 : idx === 1 ? 45 : 30;
                             const color = waitTime < 20 ? "bg-green-500" : waitTime < 40 ? "bg-amber-500" : "bg-error";
                             return (
                                <td key={clinic.id} className="p-4 align-top bg-surface/50">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm text-on-surface">
                                            <Clock className="h-4 w-4 text-on-surface-variant" />
                                            <span>~{waitTime} mins</span>
                                        </div>
                                        {/* CSS Bar Chart */}
                                        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden mt-1">
                                            <div className={cn("h-full rounded-full", color)} style={{ width: `${(waitTime/60)*100}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                             );
                        })}
                    </tr>

                    {/* Cost Row (Mocked) */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-surface p-4 font-semibold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                             {t('cost')}
                        </td>
                        {clinics.map((clinic, idx) => {
                            // Mock logic
                            const price = idx === 0 ? "$50" : idx === 1 ? "$120" : "$80";
                            return (
                                <td key={clinic.id} className="p-4 align-top bg-surface/50">
                                    <div className="flex items-center gap-2 text-on-surface font-medium">
                                        <Wallet className="h-4 w-4 text-primary" />
                                        <span>{price}</span>
                                    </div>
                                </td>
                            );
                        })}
                    </tr>

                    {/* Services Row */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-surface p-4 font-semibold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                            {t('topServices')}
                        </td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-4 align-top bg-surface/50">
                                <ul className="space-y-1 text-sm text-on-surface-variant">
                                    {clinic.services.slice(0, 3).map(service => (
                                        <li key={service.id} className="flex items-center gap-2">
                                            <Check className="h-3 w-3 text-primary" />
                                            {service.name}
                                        </li>
                                    ))}
                                    {clinic.services.length === 0 && <li>No specific services listed</li>}
                                </ul>
                            </td>
                        ))}
                    </tr>

                    {/* Actions Row */}
                    <tr>
                         <td className="sticky left-0 z-10 bg-surface p-4 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]"></td>
                         {clinics.map(clinic => (
                             <td key={clinic.id} className="p-4 align-top bg-surface/50">
                                 <Button asChild className="w-full">
                                     <Link href={`/clinics/${clinic.id}`}>{t('viewProfile')}</Link>
                                 </Button>
                             </td>
                         ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
