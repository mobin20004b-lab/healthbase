'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, BadgeCheck, ArrowRight, Scale } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Card } from '@/web/components/ui/card';
import { FavoriteButton } from '@/web/components/clinic/FavoriteButton';
import { Checkbox } from '@/web/components/ui/checkbox';

interface Clinic {
    id: string;
    name: string;
    isVerified?: boolean;
    city?: string;
    province?: string;
    description?: string;
    services?: { id: string; name: string }[];
}

interface FavoritesListProps {
    favorites: Clinic[];
    locale: string;
    tVerified: string;
}

export function FavoritesList({ favorites, locale, tVerified }: FavoritesListProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelect = (clinicId: string, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, clinicId]);
        } else {
            setSelectedIds(prev => prev.filter(id => id !== clinicId));
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                {favorites.map((clinic) => (
                    <Card key={clinic.id} variant="bento" className="group p-6 h-full transition-all hover:bg-surface-container-high hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 flex flex-col relative">
                        <div className="absolute top-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                                id={`compare-${clinic.id}`}
                                checked={selectedIds.includes(clinic.id)}
                                onChange={(e) => handleSelect(clinic.id, e.target.checked)}
                                className="w-6 h-6 border-2 border-outline-variant/50"
                                aria-label="Select for comparison"
                            />
                        </div>
                        <Link
                            href={`/${locale}/clinics/${clinic.id}`}
                            className="flex-1 flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-4 mt-2">
                                <div className="flex-1 pr-8">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-2xl font-black text-on-surface group-hover:text-primary transition-colors">
                                            {clinic.name}
                                        </h3>
                                        {clinic.isVerified && (
                                            <div className="flex items-center gap-1 bg-primary-container text-on-primary-container text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                <BadgeCheck className="h-3.5 w-3.5" />
                                                {tVerified}
                                            </div>
                                        )}
                                    </div>
                                    {(clinic.city || clinic.province) && (
                                        <p className="mt-2 flex items-center gap-2 text-sm text-on-surface-variant font-bold">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            {clinic.province && `${clinic.province} - `}{clinic.city}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {clinic.description && (
                                <p className="text-base text-on-surface-variant line-clamp-2 mb-8 flex-1 leading-relaxed font-medium">
                                    {clinic.description}
                                </p>
                            )}

                            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                                <div className="flex flex-wrap gap-2">
                                    {clinic.services?.slice(0, 2).map((service) => (
                                        <span
                                            key={service.id}
                                            className="inline-flex items-center rounded-xl bg-surface-container-lowest border border-outline-variant/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-tight text-on-surface-variant group-hover:bg-primary/5 group-hover:text-primary transition-all"
                                        >
                                            {service.name}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <FavoriteButton
                                        clinicId={clinic.id}
                                        initialIsFavorited={true}
                                        className="scale-90"
                                    />
                                    <Button size="icon" variant="tonal" className="m3-shape-flower group-hover:rotate-12 transition-all">
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    </Card>
                ))}
            </div>

            {selectedIds.length >= 2 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <Card variant="elevated" className="flex items-center gap-4 p-4 rounded-full shadow-2xl border-primary/20 bg-surface/90 backdrop-blur-md">
                        <span className="font-medium text-on-surface pl-2">
                            {selectedIds.length} clinics selected
                        </span>
                        <Link href={`/${locale}/compare?ids=${selectedIds.join(',')}`}>
                            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 gap-2 font-bold">
                                <Scale className="w-5 h-5" />
                                Compare Now
                            </Button>
                        </Link>
                    </Card>
                </div>
            )}
        </>
    );
}
