"use client";

import { useState } from 'react';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import { Button } from '@/web/components/ui/button';
import { Link } from '@/routing';
import { toast } from 'sonner';

interface Clinic {
    id: string;
    name: string;
    isVerified?: boolean;
    city?: string;
    province?: string;
    country?: string;
    description?: string;
    services?: { id: string; name: string }[];
    image?: string | null;
}

interface FavoritesListProps {
    favorites: Clinic[];
}

export default function FavoritesList({ favorites }: FavoritesListProps) {
    const [selectedClinics, setSelectedClinics] = useState<string[]>([]);

    const handleCompareToggle = (clinicId: string) => {
        setSelectedClinics(prev => {
            if (prev.includes(clinicId)) {
                return prev.filter(id => id !== clinicId);
            } else {
                if (prev.length >= 3) {
                    toast.error("You can compare up to 3 clinics.");
                    return prev;
                }
                return [...prev, clinicId];
            }
        });
    };

    const clearComparison = () => setSelectedClinics([]);

    return (
        <div className="relative pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((clinic) => {
                    // We cast to any because ClinicCard expects a Prisma Clinic model
                    // and we only have partial data from the API endpoint.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const c = clinic as any;
                    return (
                        <ClinicCard
                            key={clinic.id}
                            clinic={c}
                            isSelected={selectedClinics.includes(clinic.id)}
                            onCompareChange={() => handleCompareToggle(clinic.id)}
                        />
                    );
                })}
            </div>

            {/* Comparison Bar */}
            {selectedClinics.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-high border-t border-outline-variant/20 p-4 shadow-xl animate-in slide-in-from-bottom-full duration-300">
                    <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                        <div className="text-on-surface font-medium text-sm sm:text-base">
                            <span className="font-bold text-primary">{selectedClinics.length}</span> clinics selected
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="text" size="sm" onClick={clearComparison} className="text-error hover:text-error-container hover:bg-error/10">
                                Clear
                            </Button>
                            <Link href={`/compare?ids=${selectedClinics.join(',')}`}>
                                 <Button variant="filled" size="sm" className="bg-primary text-on-primary hover:bg-primary/90">
                                    Compare Now
                                 </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
