"use client";

import { useTranslations } from 'next-intl';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Map, List, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { useSearchParams } from 'next/navigation';

// Extended mock type for filtering
type MockClinic = Partial<Clinic> & {
    services?: { name: string }[];
    insurances?: string[];
};

const MOCK_CLINICS: MockClinic[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    services: [{ name: 'Cardiology' }, { name: 'Surgery' }],
    insurances: ['Salamat', 'Tamin'],
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    services: [{ name: 'General' }, { name: 'Dermatology' }],
    insurances: ['Salamat'],
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    services: [{ name: 'Neurology' }, { name: 'Dentistry' }],
    insurances: ['NiroohayeMosallah'],
  }
];

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);
  const t = useTranslations('Clinics');
  const searchParams = useSearchParams();

  // Filter Logic
  const filteredClinics = useMemo(() => {
      const q = searchParams.get('q')?.toLowerCase();
      const city = searchParams.get('city');
      const province = searchParams.get('province');
      const specialty = searchParams.get('specialty');
      const insurance = searchParams.get('insurance');

      return MOCK_CLINICS.filter(clinic => {
          if (q) {
              const inName = clinic.name?.toLowerCase().includes(q);
              const inCity = clinic.city?.toLowerCase().includes(q);
              const inProv = clinic.province?.toLowerCase().includes(q);
              if (!inName && !inCity && !inProv) return false;
          }
          if (city && clinic.city !== city) return false;
          if (province && clinic.province !== province) return false;
          if (specialty) {
              const hasSpecialty = clinic.services?.some(s => s.name === specialty);
              if (!hasSpecialty) return false;
          }
          if (insurance) {
              const hasInsurance = clinic.insurances?.includes(insurance);
              if (!hasInsurance) return false;
          }
          return true;
      });
  }, [searchParams]);

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

                 {filteredClinics.length === 0 ? (
                     <div className="text-center py-12">
                         <p className="text-on-surface-variant text-lg">{t('noResults')}</p>
                     </div>
                 ) : (
                     <div className="grid grid-cols-1 gap-4">
                         {filteredClinics.map((clinic) => (
                             <ClinicCard
                                 key={clinic.id}
                                 clinic={clinic as Clinic}
                                 rating={4.5}
                                 reviewCount={120}
                             />
                         ))}
                     </div>
                 )}

                 {/* Pagination Placeholder */}
                 {filteredClinics.length > 0 && (
                     <div className="flex justify-center mt-8">
                         <div className="flex gap-2">
                             <Button variant="ghost" size="sm" disabled>1</Button>
                             <Button variant="ghost" size="sm" disabled>2</Button>
                             <Button variant="ghost" size="sm" disabled>...</Button>
                         </div>
                     </div>
                 )}
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
    </div>
  );
}
