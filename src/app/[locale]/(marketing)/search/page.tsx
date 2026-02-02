"use client";

// import { useTranslations } from 'next-intl';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Map, List, Filter, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { MOCK_CLINICS } from '@/services/clinics';
import { Link } from '@/routing';

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);
  const [selectedClinics, setSelectedClinics] = useState<string[]>([]);

  // const t = useTranslations('Search');
  // Temporary mock until messages are updated
  const t = (key: string) => {
    const messages: Record<string, string> = {
      title: 'Find Your Care',
      mapView: 'Map',
      listView: 'List',
      filters: 'Filters',
    };
    return messages[key] || key;
  };

  const toggleClinicSelection = (id: string, checked: boolean) => {
    if (checked) {
        if (selectedClinics.length >= 3) {
            // Optional: Show toast "Max 3 clinics"
            return;
        }
        setSelectedClinics(prev => [...prev, id]);
    } else {
        setSelectedClinics(prev => prev.filter(cId => cId !== id));
    }
  };

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
            "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth transition-opacity duration-300 pb-24", // pb-24 for floating bar
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
                     {MOCK_CLINICS.map((clinic) => (
                         <ClinicCard
                             key={clinic.id}
                             clinic={clinic as Clinic}
                             rating={clinic.averageRating}
                             reviewCount={clinic.reviewCount}
                             onCompareChange={(checked) => toggleClinicSelection(clinic.id, checked)}
                         />
                     ))}
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

      {/* Floating Comparison Bar */}
      {selectedClinics.length > 0 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
              <div className="flex items-center justify-between rounded-full bg-surface-container-highest p-2 pl-6 shadow-xl border border-outline-variant/50 backdrop-blur-md">
                  <span className="text-sm font-medium text-on-surface-variant">
                      {selectedClinics.length} selected
                  </span>
                  <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 text-on-surface-variant hover:text-error"
                        onClick={() => setSelectedClinics([])}
                      >
                          <X className="h-4 w-4" />
                      </Button>
                      <Button asChild variant="filled" size="sm" className="rounded-full px-6">
                          <Link href={`/compare?ids=${selectedClinics.join(',')}`}>
                              Compare <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
