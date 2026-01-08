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
      <div className="hidden w-80 shrink-0 border-r border-outline-variant/20 overflow-y-auto p-4 lg:block bg-surface">
        <SearchFilters />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex relative">
        {/* List View */}
        <div className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth transition-opacity duration-300 bg-surface-container-lowest",
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
                             rating={4.5}
                             reviewCount={120}
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
             {/* Map Placeholder Graphic */}
             <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                 {/* Abstract Map Pattern */}
                 <div className="absolute inset-0 opacity-10"
                      style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)',
                          backgroundSize: '20px 20px'
                      }}
                 />

                 <div className="relative z-10 text-center p-6 bg-surface/80 backdrop-blur-md rounded-2xl shadow-lg border border-outline-variant">
                     <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <Map className="w-8 h-8" />
                     </div>
                     <h3 className="text-lg font-bold text-on-surface mb-2">Interactive Map</h3>
                     <p className="text-sm text-on-surface-variant max-w-[200px]">
                        Map view integration coming soon. Will support clustering and location search.
                     </p>
                 </div>
             </div>
        </div>
      </div>

      {/* Mobile Map Toggle FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button
            className="rounded-2xl shadow-xl h-14 w-14 p-0 animate-in zoom-in duration-300 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary"
            size="icon"
            onClick={() => setShowMap(!showMap)}
          >
              {showMap ? <List className="h-6 w-6" /> : <Map className="h-6 w-6" />}
          </Button>
      </div>
    </div>
  );
}
