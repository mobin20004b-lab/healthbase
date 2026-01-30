"use client";

// import { useTranslations } from 'next-intl';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Map, List, Filter, ArrowRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { useSearchParams } from 'next/navigation';
import { Pagination } from '@/web/components/ui/pagination';
import { Link } from '@/routing';

// Mock data for initial implementation
// Using Partial<Clinic> but ensuring compatibility with ClinicCard
interface ExtendedClinic extends Partial<Clinic> {
    id: string;
    name: string;
    city: string;
    province: string;
    country: string;
    image: string;
    isVerified: boolean;
    specialties?: string[];
    insurances?: string[];
    rating: number;
    reviewCount: number;
    nextAvailable: string;
}

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
    insurances: ['Salamat', 'Tamin'],
    rating: 4.8,
    reviewCount: 320,
    nextAvailable: 'Tomorrow',
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['General', 'Dermatology'],
    insurances: ['Tamin'],
    rating: 4.2,
    reviewCount: 150,
    nextAvailable: 'In 2 days',
  },
  {
    id: '3',
    name: 'Shiraz Central Clinic',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a092fc43?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Dentistry'],
    insurances: ['Salamat'],
    rating: 4.9,
    reviewCount: 85,
    nextAvailable: 'Today',
  },
  {
    id: '4',
    name: 'Isfahan Specialized Clinic',
    city: 'Isfahan',
    province: 'Isfahan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Neurology'],
    insurances: ['NiroohayeMosallah'],
    rating: 4.5,
    reviewCount: 200,
    nextAvailable: 'Tomorrow',
  },
  {
    id: '5',
    name: 'Mashhad Skin Center',
    city: 'Mashhad',
    province: 'Razavi Khorasan',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['Dermatology'],
    insurances: ['Salamat', 'Tamin'],
    rating: 4.0,
    reviewCount: 45,
    nextAvailable: 'Next week',
  },
  {
    id: '6',
    name: 'Yazd Dental Care',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Dentistry'],
    insurances: ['Tamin'],
    rating: 4.7,
    reviewCount: 112,
    nextAvailable: 'Tomorrow',
  },
   {
    id: '7',
    name: 'Tehran Eye Clinic',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Ophthalmology'],
    insurances: ['Salamat', 'Tamin', 'NiroohayeMosallah'],
    rating: 4.6,
    reviewCount: 220,
    nextAvailable: 'In 3 days',
  },
  {
    id: '8',
    name: 'Shiraz Heart Institute',
    city: 'Shiraz',
    province: 'Fars',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Cardiology'],
    insurances: ['Salamat'],
    rating: 4.9,
    reviewCount: 410,
    nextAvailable: 'Tomorrow',
  },
];

const ITEMS_PER_PAGE = 5;

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);
  const searchParams = useSearchParams();
  const [selectedClinics, setSelectedClinics] = useState<string[]>([]);

  // Filter Data
  const filteredClinics = useMemo(() => {
    const q = searchParams.get('q')?.toLowerCase() || '';
    const city = searchParams.get('city');
    const province = searchParams.get('province');
    const specialty = searchParams.get('specialty');
    const insurance = searchParams.get('insurance');

    return MOCK_CLINICS.filter(clinic => {
        if (q && !clinic.name.toLowerCase().includes(q) && !clinic.city.toLowerCase().includes(q)) return false;
        if (city && clinic.city !== city) return false;
        if (province && clinic.province !== province) return false;
        if (specialty && !clinic.specialties?.includes(specialty)) return false;
        if (insurance && !clinic.insurances?.includes(insurance)) return false;
        return true;
    });
  }, [searchParams]);

  // Pagination
  const page = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(filteredClinics.length / ITEMS_PER_PAGE);
  const paginatedClinics = filteredClinics.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Comparison Logic
  const handleCompareChange = (id: string, checked: boolean) => {
      if (checked) {
          if (selectedClinics.length >= 3) {
              // Optional: Show toast "Max 3 clinics"
              return;
          }
          setSelectedClinics([...selectedClinics, id]);
      } else {
          setSelectedClinics(selectedClinics.filter(c => c !== id));
      }
  };

  const t = (key: string) => {
    const messages: Record<string, string> = {
      title: 'Find Your Care',
      mapView: 'Map',
      listView: 'List',
      filters: 'Filters',
      noResults: 'No clinics found matching your criteria.',
      compare: 'Compare',
      clear: 'Clear',
      compareBtn: 'Compare Selected',
    };
    return messages[key] || key;
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
            "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth transition-opacity duration-300",
            showMap ? "hidden lg:block" : "block"
        )}>
             <div className="max-w-4xl mx-auto space-y-6 pb-24">
                 <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-on-surface">{t('title')}</h1>
                    <span className="text-on-surface-variant font-medium">
                        {filteredClinics.length} results
                    </span>

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
                     {paginatedClinics.length > 0 ? (
                         paginatedClinics.map((clinic) => (
                             <ClinicCard
                                 key={clinic.id}
                                 clinic={clinic as unknown as Clinic}
                                 rating={clinic.rating}
                                 reviewCount={clinic.reviewCount}
                                 nextAvailable={clinic.nextAvailable}
                                 onCompareChange={(checked) => handleCompareChange(clinic.id, checked)}
                                 className={selectedClinics.includes(clinic.id) ? "ring-2 ring-primary" : ""}
                             />
                         ))
                     ) : (
                         <div className="text-center py-20 bg-surface-container rounded-2xl">
                             <p className="text-lg text-on-surface-variant">{t('noResults')}</p>
                             <Button variant="text" onClick={() => window.history.back()} className="mt-4">
                                 Go Back
                             </Button>
                         </div>
                     )}
                 </div>

                 {/* Pagination */}
                 <div className="mt-8">
                     <Pagination totalPages={totalPages} />
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

      {/* Comparison Floating Bar */}
      {selectedClinics.length > 0 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-2xl">
              <div className="bg-surface-container-highest shadow-xl rounded-2xl p-4 flex items-center justify-between border border-outline-variant/50 animate-in slide-in-from-bottom-5 fade-in duration-300">
                  <div className="flex items-center gap-4">
                      <div className="bg-primary text-on-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {selectedClinics.length}
                      </div>
                      <span className="font-medium text-on-surface">{t('compare')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedClinics([])}>
                          {t('clear')}
                      </Button>
                      <Button variant="filled" size="sm" asChild>
                          <Link href={`/compare?ids=${selectedClinics.join(',')}`}>
                              {t('compareBtn')} <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </div>
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
