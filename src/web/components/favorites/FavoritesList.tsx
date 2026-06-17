"use client";

import { useState } from 'react';
import { MapPin, BadgeCheck, Heart, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Card } from '@/web/components/ui/card';
import { FavoriteButton } from '@/web/components/clinic/FavoriteButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    translations: {
        verified: string;
    };
}

export default function FavoritesList({ favorites, locale, translations }: FavoritesListProps) {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(selectedId => selectedId !== id);
            }
            if (prev.length >= 3) {
                // max 3 selections
                return prev;
            }
            return [...prev, id];
        });
    };

    const handleCompare = () => {
        if (selectedIds.length >= 2) {
            router.push(`/${locale}/compare?ids=${selectedIds.join(',')}`);
        }
    };

    return (
        <div className="relative">
            {favorites.length === 0 ? (
                <Card variant="bento" className="text-center py-24 bg-surface-container-lowest">
                    <div className="mx-auto h-12 w-12 text-on-surface-variant mb-4 opacity-20">
                        <Heart className="h-full w-full" />
                    </div>
                    <p className="text-on-surface-variant text-lg font-bold">You haven&apos;t saved any clinics yet.</p>
                    <Link href={`/${locale}/search`} className="mt-6 inline-block">
                        <Button variant="default" className="rounded-full px-8">
                            Browse Clinics
                        </Button>
                    </Link>
                </Card>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-on-surface-variant">
                            Select 2-3 clinics to compare them side-by-side.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                        {favorites.map((clinic) => {
                            const isSelected = selectedIds.includes(clinic.id);

                            return (
                                <Link
                                    key={clinic.id}
                                    href={`/${locale}/clinics/${clinic.id}`}
                                    className="block h-full transition-all relative"
                                >
                                    <Card
                                        variant="bento"
                                        className={`group p-6 h-full transition-all flex flex-col ${
                                            isSelected
                                                ? 'border-primary shadow-xl shadow-primary/20 bg-primary/5'
                                                : 'hover:bg-surface-container-high hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10'
                                        }`}
                                    >
                                        {/* Selection Checkbox */}
                                        <button
                                            onClick={(e) => toggleSelection(e, clinic.id)}
                                            className="absolute top-4 right-4 z-10 text-on-surface-variant hover:text-primary transition-colors bg-surface rounded-md p-1 shadow-sm border border-outline-variant/20"
                                            disabled={!isSelected && selectedIds.length >= 3}
                                        >
                                            {isSelected ? (
                                                <CheckSquare className="w-6 h-6 text-primary" />
                                            ) : (
                                                <Square className={`w-6 h-6 ${!isSelected && selectedIds.length >= 3 ? 'opacity-30' : ''}`} />
                                            )}
                                        </button>

                                        <div className="flex items-start justify-between mb-4 mt-2">
                                            <div className="flex-1 pr-8">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-2xl font-black text-on-surface group-hover:text-primary transition-colors">
                                                        {clinic.name}
                                                    </h3>
                                                    {clinic.isVerified && (
                                                        <div className="flex items-center gap-1 bg-primary-container text-on-primary-container text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                            <BadgeCheck className="h-3.5 w-3.5" />
                                                            {translations.verified}
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
                                            <div className="flex gap-2 relative z-10">
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
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Floating Compare Action Bar */}
                    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${
                        selectedIds.length >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
                    }`}>
                        <div className="bg-surface border border-outline/20 shadow-2xl rounded-full p-2 flex items-center gap-4">
                            <div className="px-4 font-bold text-on-surface">
                                {selectedIds.length} clinics selected
                            </div>
                            <Button
                                onClick={handleCompare}
                                className="rounded-full px-8 shadow-lg"
                                variant="default"
                            >
                                Compare Now
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
