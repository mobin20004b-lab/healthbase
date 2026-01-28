"use client";

// import { useTranslations } from 'next-intl';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Map, List, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { useSearchParams } from 'next/navigation';

interface ExtendedClinic extends Partial<Clinic> {
  specialties: string[];
  insurances: string[];
  rating: number;
  reviewCount: number;
  nextAvailable: string;
}

// Mock data with expanded fields for filtering
const MOCK_CLINICS: ExtendedClinic[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Cardiology'],
    insurances: ['Tamin', 'Salamat'],
    rating: 4.8,
    reviewCount: 320,
    nextAvailable: 'Tomorrow'
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['Neurology', 'Cardiology'],
    insurances: ['NiroohayeMosallah'],
    rating: 4.2,
    reviewCount: 150,
    nextAvailable: 'In 3 days'
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Dentistry', 'Dermatology'],
    insurances: ['Salamat'],
    rating: 4.9,
    reviewCount: 85,
    nextAvailable: 'Today'
  },
  {
    id: '4',
    name: 'Yazd Skin Center',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Dermatology'],
    insurances: ['Tamin', 'Salamat', 'NiroohayeMosallah'],
    rating: 4.7,
    reviewCount: 210,
    nextAvailable: 'Tomorrow'
  }
];

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);
  const searchParams = useSearchParams();

  // Filter Logic
  const filteredClinics = useMemo(() => {
    const q = searchParams.get('q')?.toLowerCase() || '';
    const city = searchParams.get('city');
    const province = searchParams.get('province');

    // Parse array filters (repeated keys or comma separated)
    const specialtyFilters = searchParams.getAll('specialty').length > 0
        ? searchParams.getAll('specialty')
        : searchParams.get('specialty')?.split(',').filter(Boolean) || [];

    const insuranceFilters = searchParams.getAll('insurance').length > 0
        ? searchParams.getAll('insurance')
        : searchParams.get('insurance')?.split(',').filter(Boolean) || [];

    return MOCK_CLINICS.filter(clinic => {
        // Text Search
        if (q && !clinic.name?.toLowerCase().includes(q) && !clinic.specialties?.some(s => s.toLowerCase().includes(q))) {
            return false;
        }
        // Location
        if (province && clinic.province !== province) return false;
        if (city && clinic.city !== city) return false;

        // Specialties (Match any)
        if (specialtyFilters.length > 0) {
            const hasSpecialty = clinic.specialties.some(s => specialtyFilters.includes(s));
            if (!hasSpecialty) return false;
        }

        // Insurance (Match any)
        if (insuranceFilters.length > 0) {
            const hasInsurance = clinic.insurances.some(i => insuranceFilters.includes(i));
            if (!hasInsurance) return false;
        }

        return true;
    });
  }, [searchParams]);

  // const t = useTranslations('Search');
  // Temporary mock until messages are updated
  const t = (key: string) => {
    const messages: Record<string, string> = {
      title: 'Find Your Care',
      mapView: 'Map',
      listView: 'List',
      filters: 'Filters',
      noResults: 'No clinics found matching your criteria.'
    };
    return messages[key] || key;
  };

  return (
    <div className="relative flex flex-col h-screen overflow-hidden pt-16">
       <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 h-full">

          {/* Filters Sidebar - Desktop (Col Span 3) */}
          <div className="hidden lg:block lg:col-span-3 border-r border-outline-variant/20 bg-surface h-full overflow-hidden">
             <SearchFilters basePath="/search" />
          </div>

          {/* Main Content (List + Map) */}
          <div className="lg:col-span-9 flex relative h-full overflow-hidden">

            {/* List View */}
            <div className={cn(
                "flex-1 h-full overflow-y-auto p-4 md:p-6 scroll-smooth transition-opacity duration-300",
                showMap ? "hidden lg:block lg:w-1/2" : "w-full lg:w-1/2"
            )}>
                <div className="max-w-3xl mx-auto space-y-6 pb-20 lg:pb-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-on-surface">
                            {filteredClinics.length} {t('title')}
                        </h1>

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
                                        <SearchFilters basePath="/search" />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {filteredClinics.length > 0 ? (
                            filteredClinics.map((clinic) => (
                                <ClinicCard
                                    key={clinic.id}
                                    clinic={clinic as Clinic}
                                    rating={clinic.rating}
                                    reviewCount={clinic.reviewCount}
                                    nextAvailable={clinic.nextAvailable}
                                />
                            ))
                        ) : (
                            <div className="text-center py-20 text-on-surface-variant">
                                <p>{t('noResults')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Map View */}
            <div className={cn(
                "w-full h-full bg-surface-container-high relative border-l border-outline-variant/20",
                showMap ? "block fixed inset-0 z-40 lg:static lg:block lg:w-1/2" : "hidden lg:block lg:w-1/2"
            )}>
                 {/* Close Map Button for Mobile */}
                 {showMap && (
                     <div className="absolute top-4 left-4 z-50 lg:hidden">
                         <Button onClick={() => setShowMap(false)} variant="secondary" size="sm">
                             Back to List
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
