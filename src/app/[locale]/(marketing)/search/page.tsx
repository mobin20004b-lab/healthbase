"use client";

// import { useTranslations } from 'next-intl';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Map, List, Filter } from 'lucide-react';
import { useState } from 'react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { MOCK_CLINICS } from '@/lib/data/mock-clinics';

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);

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

  return (
    <div className="h-[calc(100vh-64px)] w-full relative lg:grid lg:grid-cols-[280px_1fr_400px] overflow-hidden">

      {/* Filters Sidebar - Desktop (Column 1) */}
      <div className="hidden lg:block h-full border-r border-outline-variant/20 overflow-y-auto bg-surface p-4">
        <SearchFilters />
      </div>

      {/* List View (Column 2) */}
      <div className={cn(
          "h-full overflow-y-auto bg-background p-4 md:p-6 lg:p-8 scroll-smooth",
          showMap ? "hidden lg:block" : "block"
      )}>
           <div className="max-w-3xl mx-auto space-y-6">
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
                           rating={4.5}
                           reviewCount={120}
                       />
                   ))}
               </div>
           </div>
      </div>

      {/* Map View (Column 3) */}
      <div className={cn(
          "h-full border-l border-outline-variant/20 bg-surface-container-high relative",
          showMap ? "block fixed inset-0 z-40 lg:static lg:block" : "hidden lg:block"
      )}>
           {/* Mobile Header for Map Mode */}
           {showMap && (
             <div className="absolute top-4 left-4 z-50 lg:hidden">
                <Button
                  variant="filled"
                  size="sm"
                  onClick={() => setShowMap(false)}
                  className="shadow-md"
                >
                  <List className="mr-2 h-4 w-4" />
                  {t('listView')}
                </Button>
             </div>
           )}

           <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
               <div className="text-center">
                   <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
                   <p>Map View Placeholder</p>
               </div>
           </div>
      </div>

      {/* Mobile Map Toggle FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button
            className={cn(
                "rounded-full shadow-xl h-14 w-14 p-0 animate-in zoom-in duration-300",
                showMap ? "hidden" : "flex" // Hide FAB when map is full screen, use the back button instead
            )}
            size="icon"
            onClick={() => setShowMap(!showMap)}
          >
              <Map className="h-6 w-6" />
          </Button>
      </div>
    </div>
  );
}
