"use client";

import { useState } from "react";
import { ClinicWithRelations } from "@/services/clinics";
import { ClinicCard } from "@/web/components/clinics/clinic-card";
import { Button } from "@/web/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/web/components/ui/sheet";
import { Filter } from "lucide-react";
import SearchFilters from "@/web/components/clinics/SearchFilters";
import { Pagination } from "@/web/components/ui/pagination";
import { useTranslations } from "next-intl";
import { useRouter } from "@/routing";

interface SearchPageClientProps {
  clinics: ClinicWithRelations[];
  totalPages: number;
  currentPage: number;
}

export default function SearchPageClient({ clinics, totalPages, currentPage }: SearchPageClientProps) {
  const t = useTranslations('Clinics');
  const router = useRouter();
  const [selectedClinics, setSelectedClinics] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCompareChange = (id: string, checked: boolean) => {
    if (checked) {
      if (selectedClinics.length >= 3) return; // Max 3
      setSelectedClinics([...selectedClinics, id]);
    } else {
      setSelectedClinics(selectedClinics.filter(cId => cId !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
       {/* Mobile Filter Trigger */}
       <div className="lg:hidden">
         <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
           <SheetTrigger asChild>
             <Button variant="outlined" className="w-full gap-2">
               <Filter className="h-4 w-4" />
               {t('filters')}
             </Button>
           </SheetTrigger>
           <SheetContent side="bottom" className="h-[90vh] overflow-y-auto rounded-t-3xl p-0">
                <SheetHeader className="px-6 py-4 border-b border-outline-variant/10">
                    <SheetTitle>{t('filters')}</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                     <SearchFilters className="shadow-none border-none p-0" />
                </div>
           </SheetContent>
         </Sheet>
       </div>

       {/* Results Grid */}
       {clinics.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {clinics.map(clinic => (
                <ClinicCard
                  key={clinic.id}
                  clinic={clinic}
                  rating={clinic.averageRating}
                  reviewCount={clinic.reviewCount}
                  checked={selectedClinics.includes(clinic.id)}
                  onCompareChange={(checked) => handleCompareChange(clinic.id, checked)}
                />
              ))}
           </div>
       ) : (
           <div className="text-center py-20 bg-surface-container-low rounded-xl">
                <p className="text-on-surface-variant text-lg font-medium">{t('noResults')}</p>
                <Button variant="text" onClick={() => router.push('/search')}>
                    {t('clearAll')}
                </Button>
           </div>
       )}

       {/* Pagination */}
       <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          basePath="/search"
       />

       {/* Comparison Floating Bar */}
       {selectedClinics.length > 0 && (
         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface p-4 rounded-2xl shadow-xl z-50 flex items-center gap-4 w-[90%] max-w-lg border border-outline-variant animate-in slide-in-from-bottom-10 fade-in duration-300">
            <span className="font-bold whitespace-nowrap">{selectedClinics.length} Selected</span>
            <div className="flex-1" />
             <Button variant="ghost" size="sm" onClick={() => setSelectedClinics([])}>Clear</Button>
            <Button>Compare</Button>
         </div>
       )}
    </div>
  )
}
