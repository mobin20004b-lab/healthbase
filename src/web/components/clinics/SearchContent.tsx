"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Map, List, Filter, X } from 'lucide-react';
import { Link } from '@/routing';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Pagination } from '@/web/components/ui/pagination';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { cn } from '@/lib/utils';
import type { ClinicWithRelations, PaginationMeta } from '@/services/clinics';

interface SearchContentProps {
    clinics: ClinicWithRelations[];
    meta: PaginationMeta;
}

export default function SearchContent({ clinics, meta }: SearchContentProps) {
    const [showMap, setShowMap] = useState(false);
    const [selectedClinics, setSelectedClinics] = useState<string[]>([]);
    const t = useTranslations('Clinics');

    const handleCompareToggle = (id: string, checked: boolean) => {
        if (checked) {
            if (selectedClinics.length >= 3) {
                // Ideally use a toast here
                alert(t('compareLimit') || "You can only compare up to 3 clinics.");
                return;
            }
            setSelectedClinics([...selectedClinics, id]);
        } else {
            setSelectedClinics(selectedClinics.filter(cId => cId !== id));
        }
    };

    return (
        <div className="flex-1 flex relative h-full overflow-hidden">
            {/* List View */}
            <div className={cn(
                "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth transition-opacity duration-300",
                showMap ? "hidden lg:block" : "block"
            )}>
                 <div className="max-w-4xl mx-auto space-y-6">
                     <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-on-surface">{t('title')}</h1>

                        {/* Mobile Filter Trigger */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outlined" size="sm" className="gap-2">
                                        <Filter className="h-4 w-4" />
                                        {t('filters')}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] p-0">
                                    <div className="h-full overflow-y-auto p-4">
                                        <SearchFilters />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 gap-4">
                         {clinics.length > 0 ? (
                             clinics.map((clinic) => (
                                 <ClinicCard
                                     key={clinic.id}
                                     clinic={clinic}
                                     rating={clinic.averageRating}
                                     reviewCount={clinic.reviewCount}
                                     isSelected={selectedClinics.includes(clinic.id)}
                                     onCompareChange={(checked) => handleCompareToggle(clinic.id, checked)}
                                     // nextAvailable logic is mocked for now
                                 />
                             ))
                         ) : (
                             <div className="text-center py-10 text-on-surface-variant">
                                 {t('noResults') || "No clinics found matching your criteria."}
                             </div>
                         )}
                     </div>

                     <div className="mt-8">
                         <Pagination currentPage={meta.page} totalPages={meta.totalPages} />
                     </div>
                 </div>
            </div>

            {/* Map View */}
            <div className={cn(
                "w-full lg:w-1/3 border-l border-outline-variant/20 bg-surface-container-high relative",
                showMap ? "block" : "hidden lg:block"
            )}>
                 <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
                     <div className="text-center">
                         <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
                         <p>Map View Placeholder</p>
                     </div>
                 </div>
            </div>

            {/* Comparison Bar */}
            {selectedClinics.length > 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between bg-surface-container-highest border border-outline-variant/20 rounded-2xl shadow-xl p-3 pl-5">
                        <div className="text-sm font-medium text-on-surface">
                            {selectedClinics.length} {selectedClinics.length === 1 ? 'clinic' : 'clinics'} selected
                        </div>
                        <div className="flex items-center gap-2">
                             <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-surface-container-high"
                                onClick={() => setSelectedClinics([])}
                             >
                                <X className="h-4 w-4" />
                             </Button>
                             <Button asChild variant="filled" size="sm" className="rounded-xl px-4">
                                <Link href={`/compare?ids=${selectedClinics.join(',')}`}>
                                    Compare
                                </Link>
                             </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Map Toggle FAB */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <Button
                    className="rounded-full shadow-xl h-14 w-14 p-0 animate-in zoom-in duration-300"
                    size="icon"
                    onClick={() => setShowMap(!showMap)}
                >
                    {showMap ? <List className="h-6 w-6" /> : <Map className="h-6 w-6" />}
                </Button>
            </div>
        </div>
    );
}
