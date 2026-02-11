"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Map, List, Filter } from 'lucide-react';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Pagination } from '@/web/components/ui/pagination';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { Link } from '@/routing';
import { cn } from '@/lib/utils';
import type { ClinicWithRelations, PaginationMeta } from '@/services/clinics';
import { toast } from 'sonner';

interface SearchContentProps {
    clinics: ClinicWithRelations[];
    meta: PaginationMeta;
}

export default function SearchContent({ clinics, meta }: SearchContentProps) {
    const [showMap, setShowMap] = useState(false);
    const [selectedClinics, setSelectedClinics] = useState<string[]>([]);
    const t = useTranslations('Clinics');

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
        <div className="flex-1 flex relative h-full overflow-hidden">
            {/* List View */}
            <div className={cn(
                "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth transition-opacity duration-300 pb-24",
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
                                     onCompareChange={() => handleCompareToggle(clinic.id)}
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

            {/* Mobile Map Toggle FAB */}
            <div className={cn("lg:hidden fixed bottom-6 right-6 z-40 transition-all duration-300", selectedClinics.length > 0 ? "bottom-24" : "bottom-6")}>
                <Button
                    className="rounded-full shadow-xl h-14 w-14 p-0 animate-in zoom-in duration-300"
                    size="icon"
                    onClick={() => setShowMap(!showMap)}
                >
                    {showMap ? <List className="h-6 w-6" /> : <Map className="h-6 w-6" />}
                </Button>
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
