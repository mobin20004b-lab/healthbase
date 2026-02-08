"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Star, MapPin, Calendar, Wallet } from 'lucide-react';
import type { ClinicWithRelations } from '@/services/clinics';
import { Button } from '@/web/components/ui/button';
import { Link } from '@/routing';

interface CompareTableProps {
    clinics: ClinicWithRelations[];
}

export default function CompareTable({ clinics }: CompareTableProps) {
    const t = useTranslations('Compare');
    const tCommon = useTranslations('Clinics');

    // Mock data generators for visualizers
    const getAvailability = (id: string) => {
        // Deterministic mock based on ID char code
        const code = id.charCodeAt(0) % 2;
        return code === 0 ? 'tomorrow' : 'in3weeks';
    };

    const getWaitTime = (id: string) => {
         const code = id.charCodeAt(0) % 3;
         return (code + 1) * 20; // 20, 40, 60 mins
    };

    const getPriceRange = (id: string) => {
        const code = id.charCodeAt(0) % 3;
        return "$".repeat(code + 1);
    };

    if (clinics.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-on-surface-variant mb-4">{t('noClinicsSelected')}</p>
                <Button asChild>
                    <Link href="/search">{t('backToSearch')}</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[600px] border-collapse">
                <thead>
                    <tr>
                        <th className="p-4 text-left min-w-[200px] bg-surface sticky left-0 top-0 z-20 border-b border-outline-variant/20">
                            <span className="text-on-surface font-semibold text-lg">{t('features')}</span>
                        </th>
                        {clinics.map(clinic => (
                            <th key={clinic.id} className="p-4 text-left min-w-[250px] bg-surface sticky top-0 z-10 border-b border-outline-variant/20 align-top">
                                <div className="flex flex-col gap-3">
                                    <div className="relative h-32 w-full rounded-lg overflow-hidden bg-surface-container-highest">
                                        {clinic.image ? (
                                            <Image
                                                src={clinic.image}
                                                alt={clinic.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-on-surface-variant/20">
                                                <MapPin className="h-8 w-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-on-surface text-lg leading-tight mb-1">
                                            {clinic.name}
                                        </h3>
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
                    {/* Rating */}
                    <tr>
                        <td className="p-4 font-medium text-on-surface sticky left-0 bg-surface z-10">
                            {t('rating')}
                        </td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-md">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold">{clinic.averageRating.toFixed(1)}</span>
                                    </div>
                                    <span className="text-sm text-on-surface-variant">
                                        ({clinic.reviewCount} {tCommon('reviews')})
                                    </span>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Availability */}
                    <tr>
                        <td className="p-4 font-medium text-on-surface sticky left-0 bg-surface z-10">
                            {t('availability')}
                        </td>
                        {clinics.map(clinic => {
                            const avail = getAvailability(clinic.id);
                            return (
                                <td key={clinic.id} className="p-4">
                                    <div className={`flex items-center gap-2 font-medium ${
                                        avail === 'tomorrow' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                                    }`}>
                                        <Calendar className="h-4 w-4" />
                                        <span>{t(avail)}</span>
                                    </div>
                                </td>
                            );
                        })}
                    </tr>

                    {/* Wait Time */}
                    <tr>
                        <td className="p-4 font-medium text-on-surface sticky left-0 bg-surface z-10">
                            {t('waitTime')}
                        </td>
                        {clinics.map(clinic => {
                            const waitTime = getWaitTime(clinic.id);
                            // Visual bar
                            const percentage = Math.min((waitTime / 60) * 100, 100);
                            return (
                                <td key={clinic.id} className="p-4">
                                    <div className="flex flex-col gap-1 w-full max-w-[150px]">
                                        <span className="text-sm font-medium">{waitTime} {t('mins')}</span>
                                        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                            );
                        })}
                    </tr>

                    {/* Price Range */}
                    <tr>
                        <td className="p-4 font-medium text-on-surface sticky left-0 bg-surface z-10">
                            {t('priceRange')}
                        </td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-4">
                                <div className="flex items-center gap-2 text-on-surface">
                                    <Wallet className="h-4 w-4 text-on-surface-variant" />
                                    <span>{getPriceRange(clinic.id)}</span>
                                </div>
                            </td>
                        ))}
                    </tr>

                     {/* Top Services */}
                     <tr>
                        <td className="p-4 font-medium text-on-surface sticky left-0 bg-surface z-10 align-top">
                            {tCommon('services')}
                        </td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-4 align-top">
                                <ul className="list-disc list-inside text-sm text-on-surface-variant space-y-1">
                                    {clinic.services.slice(0, 5).map(service => (
                                        <li key={service.id}>{service.name}</li>
                                    ))}
                                    {clinic.services.length === 0 && (
                                        <li className="list-none text-on-surface-variant/50 italic">{tCommon('noServices') || "No services listed"}</li>
                                    )}
                                </ul>
                            </td>
                        ))}
                    </tr>

                    {/* Action */}
                    <tr>
                        <td className="p-4 sticky left-0 bg-surface z-10"></td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-4">
                                <Button className="w-full" asChild>
                                    <Link href={`/clinics/${clinic.id}`}>
                                        {t('viewProfile')}
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
