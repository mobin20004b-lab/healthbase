"use client";

import { useTranslations } from 'next-intl';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Map, List, Filter } from 'lucide-react';
import { useState } from 'react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";

// Mock data for initial implementation
const MOCK_CLINICS: Partial<Clinic>[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
  },
  {
    id: '4',
    name: 'Isfahan Specialized Clinic',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
  },
  {
    id: '5',
    name: 'Tabriz Medical Center',
    city: 'Tabriz',
    province: 'East Azerbaijan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
  }
];

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
    <div className="relative flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Filters Sidebar - Desktop */}
      {/* Fixed width sidebar, scrollable */}
      <div className="hidden w-80 shrink-0 border-r border-outline-variant/20 overflow-y-auto p-4 lg:block bg-surface h-full">
        <SearchFilters />
      </div>

      {/* Main Content Area: Grid for List + Map */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 relative h-full">

        {/* List View Column */}
        <div className={cn(
            "h-full overflow-y-auto p-4 md:p-6 scroll-smooth transition-opacity duration-300",
            // Mobile: Hide if showMap is true
            showMap ? "hidden lg:block" : "block",
            // Desktop: Takes 2 columns in the 3-col grid
            "lg:col-span-2"
        )}>
             <div className="max-w-3xl mx-auto space-y-6 pb-20 lg:pb-0">
                 <div className="flex items-center justify-between sticky top-0 bg-surface/95 backdrop-blur z-10 py-2 border-b border-outline-variant/10 lg:static lg:bg-transparent lg:border-none lg:p-0">
                    <h1 className="text-2xl lg:text-3xl font-bold text-on-surface">{t('title')}</h1>

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

        {/* Map View Column */}
        <div className={cn(
            "h-full border-l border-outline-variant/20 bg-surface-container-high relative",
            // Mobile: Show if showMap is true
            showMap ? "block" : "hidden lg:block",
             // Desktop: Takes 1 column in the 3-col grid
            "lg:col-span-1"
        )}>
             {/* Sticky/Fixed container for map */}
             <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
                 <div className="text-center">
                     <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
                     <p className="font-medium">Map View Placeholder</p>
                     <p className="text-sm opacity-70">Interactive map will be implemented here.</p>
                 </div>
             </div>
        </div>
      </div>

      {/* Mobile Map Toggle FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button
            className="rounded-full shadow-xl h-14 w-14 p-0 animate-in zoom-in duration-300 bg-primary text-on-primary hover:bg-primary/90"
            size="icon"
            onClick={() => setShowMap(!showMap)}
          >
              {showMap ? <List className="h-6 w-6" /> : <Map className="h-6 w-6" />}
          </Button>
      </div>
    </div>
  );
}
