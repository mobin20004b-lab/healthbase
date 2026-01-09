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

// Extended mock type to include filterable fields not present in base Clinic type yet or for simulation
type MockClinic = Partial<Clinic> & {
    specialty?: string;
    insurances?: string[];
};

// Mock data for initial implementation
const MOCK_CLINICS: MockClinic[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialty: 'Cardiology',
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
    specialty: 'Neurology',
    insurances: ['Tamin', 'NiroohayeMosallah'],
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialty: 'Dermatology',
    insurances: ['Salamat'],
  },
  {
    id: '4',
    name: 'Yazd Dental Clinic',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialty: 'Dentistry',
    insurances: ['Salamat', 'Tamin', 'NiroohayeMosallah'],
  }
];

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);
  const t = useTranslations('Search');
  const searchParams = useSearchParams();

  // Filter Logic
  const filteredClinics = useMemo(() => {
    const q = searchParams.get('q')?.toLowerCase() || '';
    const city = searchParams.get('city');
    const province = searchParams.get('province');
    const specialty = searchParams.get('specialty');
    const insurance = searchParams.get('insurance');

    return MOCK_CLINICS.filter((clinic) => {
        const matchesQ = !q || (clinic.name?.toLowerCase().includes(q) ?? false) || (clinic.city?.toLowerCase().includes(q) ?? false);
        const matchesCity = !city || clinic.city === city;
        const matchesProvince = !province || clinic.province === province;
        const matchesSpecialty = !specialty || clinic.specialty === specialty;
        const matchesInsurance = !insurance || (clinic.insurances?.includes(insurance) ?? false);

        return matchesQ && matchesCity && matchesProvince && matchesSpecialty && matchesInsurance;
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
                     <div className="text-center py-12 text-on-surface-variant">
                         <p>{t('noResults')}</p>
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
                     <p>{t('mapView')}</p>
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
