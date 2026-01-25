"use client";

import { useTranslations } from 'next-intl';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Map, List, Filter, Scale } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { useSearchParams } from 'next/navigation';
import { Link } from '@/routing';
import { MOCK_CLINICS } from '@/lib/constants/mock-data';

export default function SearchPage() {
  const t = useTranslations('Clinics');
  const [showMap, setShowMap] = useState(false);
  const searchParams = useSearchParams();
  const [selectedClinics, setSelectedClinics] = useState<string[]>([]);

  // Filter Logic
  const filteredClinics = useMemo(() => {
    const q = searchParams.get('q')?.toLowerCase();
    const city = searchParams.get('city');
    const province = searchParams.get('province');
    const specialty = searchParams.get('specialty');
    const insurance = searchParams.get('insurance');

    return MOCK_CLINICS.filter((clinic) => {
      if (q && !clinic.name.toLowerCase().includes(q) && !clinic.description?.toLowerCase().includes(q) && !clinic.specialties.some(s => s.toLowerCase().includes(q))) return false;
      if (city && clinic.city !== city) return false;
      if (province && clinic.province !== province) return false;
      if (specialty && !clinic.specialties.includes(specialty)) return false;
      if (insurance && !clinic.insurances.includes(insurance)) return false;
      return true;
    });
  }, [searchParams]);

  // Comparison Logic
  const handleCompareChange = (id: string, checked: boolean) => {
    if (checked) {
      if (selectedClinics.length >= 3) {
        // Optional: Show toast notification that max 3 is allowed
        return;
      }
      setSelectedClinics([...selectedClinics, id]);
    } else {
      setSelectedClinics(selectedClinics.filter((cId) => cId !== id));
    }
  };

  const compareUrl = `/compare?ids=${selectedClinics.join(',')}`;

  return (
    <div className="relative flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Filters Sidebar - Desktop */}
      <div className="hidden w-80 shrink-0 border-r border-outline-variant/20 overflow-y-auto p-4 lg:block">
        <SearchFilters />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex relative">
        {/* List View */}
        <div className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth transition-opacity duration-300",
            showMap ? "hidden lg:block" : "block"
        )}>
             <div className="max-w-4xl mx-auto space-y-6 pb-20">
                 <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-on-surface">{t('title')}</h1>
                        <p className="text-on-surface-variant mt-1">{t('subtitle')}</p>
                    </div>

                    {/* Mobile Filter Trigger */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
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
                     {filteredClinics.length > 0 ? filteredClinics.map((clinic) => (
                         <ClinicCard
                             key={clinic.id}
                             clinic={clinic as Clinic} // Cast to satisfy Prisma type
                             rating={clinic.rating}
                             reviewCount={120} // Mock
                             nextAvailable={clinic.nextAvailable}
                             onCompareChange={(checked) => handleCompareChange(clinic.id, checked)}
                             // isChecked prop is missing in ClinicCard interface but useful if controlled.
                             // Assuming uncontrolled for now based on read_file of ClinicCard.
                         />
                     )) : (
                        <div className="text-center py-10 text-on-surface-variant">
                            {t('noResults')}
                        </div>
                     )}
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
      </div>

      {/* Comparison Floating Action Button */}
      {selectedClinics.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300">
              <Button
                size="lg"
                className="shadow-xl rounded-full px-6 gap-2"
                asChild
              >
                  <Link href={compareUrl}>
                      <Scale className="h-5 w-5" />
                      Compare ({selectedClinics.length})
                  </Link>
              </Button>
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
