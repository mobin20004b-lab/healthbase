"use client";

// import { useTranslations } from 'next-intl';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Map, List, Filter, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { MOCK_CLINICS } from '@/lib/constants/mock-data';
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

  const handleCompareToggle = (id: string, checked: boolean) => {
      if (checked) {
          if (selectedClinics.length < 3) {
              setSelectedClinics([...selectedClinics, id]);
          }
      } else {
          setSelectedClinics(selectedClinics.filter(cId => cId !== id));
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
            "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth transition-opacity duration-300 pb-24", // Added pb-24 for floating bar
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
                             rating={clinic.rating}
                             reviewCount={clinic.reviewCount}
                             nextAvailable={clinic.nextAvailable}
                             isChecked={selectedClinics.includes(clinic.id)}
                             onCompareChange={(checked) => handleCompareToggle(clinic.id, checked)}
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

      {/* Compare Floating Bar */}
      {selectedClinics.length > 0 && (
          <div className="fixed bottom-0 lg:left-80 left-0 right-0 z-40 p-4 bg-surface-container-high/90 backdrop-blur border-t border-outline-variant/20 animate-in slide-in-from-bottom duration-300 shadow-lg">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                   <div className="flex items-center gap-4">
                       <span className="text-on-surface font-medium">{selectedClinics.length} clinics selected</span>
                       <Button variant="ghost" size="sm" onClick={() => setSelectedClinics([])} className="text-error hover:text-error/80 hover:bg-error/10">
                          <X className="w-4 h-4 mr-1" /> Clear
                       </Button>
                   </div>
                   <Button asChild className="rounded-full">
                       <Link href={{
                           pathname: '/compare',
                           query: { ids: selectedClinics.join(',') }
                       }}>
                          Compare <ArrowRight className="w-4 h-4 ml-2" />
                       </Link>
                   </Button>
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
