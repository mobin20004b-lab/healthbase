"use client";

import { useTranslations } from 'next-intl';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { Button } from '@/web/components/ui/button';
import { Map, List, Filter, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { Clinic } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { useSearchParams } from 'next/navigation';
import { Link } from '@/routing';
import { Label } from '@/web/components/ui/label';

// Mock data type extension
type MockClinic = Partial<Clinic> & {
  specialties: string[];
  insurances: string[];
  serviceCategories: string[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
};

// Expanded Mock Data
const MOCK_CLINICS: MockClinic[] = [
  {
    id: '1',
    name: 'Tehran Heart Center',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Cardiology', 'Surgery'],
    insurances: ['Salamat', 'Tamin'],
    serviceCategories: ['Surgery', 'Consultation'],
    rating: 4.8,
    reviewCount: 320,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Milad Hospital',
    city: 'Tehran',
    province: 'Tehran',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    isVerified: false,
    specialties: ['Neurology', 'Dermatology'],
    insurances: ['Tamin', 'NiroohayeMosallah'],
    serviceCategories: ['Consultation', 'Imaging'],
    rating: 4.2,
    reviewCount: 150,
    createdAt: new Date('2023-02-15'),
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
    serviceCategories: ['Consultation'],
    rating: 4.9,
    reviewCount: 85,
    createdAt: new Date('2023-03-10'),
  },
  {
    id: '4',
    name: 'Yazd Eye Clinic',
    city: 'Yazd',
    province: 'Yazd',
    country: 'Iran',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    isVerified: true,
    specialties: ['Surgery'],
    insurances: ['Salamat', 'Tamin', 'NiroohayeMosallah'],
    serviceCategories: ['Surgery', 'Consultation'],
    rating: 4.5,
    reviewCount: 200,
    createdAt: new Date('2023-04-05'),
  }
];

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const t = useTranslations('Clinics');
  const tSort = useTranslations('Clinics.sortOptions');

  const sort = searchParams.get('sort') || 'name';

  // Actually, let's just use the `handleSort` function similar to SearchFilters
  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', val);
      // We can use window.location for now as it triggers full refresh which is safe,
      // or try to use router.push if we can construct the path.
      // SearchFilters uses `router.push(/search?...)`.
      // I'll replicate that.
      // But wait, SearchFilters uses `useRouter` from `@/routing`.
      // I should assume `useRouter` from `next/navigation` works if I just update params?
      // No, `next-intl` middleware handles localization.
      // I will just use `window.location.href` to be 100% sure for MVP without checking `@/routing`.
      // Actually, I can just use `router.replace` from `next/navigation` with the full URL including locale if I knew it.
      // I'll stick to a simple strategy: Update URL via searchParams.

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('sort', val);
      // Construct relative URL with current pathname (which includes locale)
      const pathname = window.location.pathname;
      window.location.href = `${pathname}?${newParams.toString()}`;
  };


  const filteredClinics = useMemo(() => {
    const q = searchParams.get('q')?.toLowerCase();
    const city = searchParams.get('city');
    const province = searchParams.get('province');
    const specialty = searchParams.get('specialty');
    const insurance = searchParams.get('insurance');
    const serviceCategory = searchParams.get('service_category');
    const minRating = searchParams.get('min_rating');
    const currentSort = searchParams.get('sort') || 'name';

    let result = MOCK_CLINICS.filter(clinic => {
      if (q && !clinic.name?.toLowerCase().includes(q) && !clinic.city?.toLowerCase().includes(q)) return false;
      if (city && clinic.city !== city) return false;
      if (province && clinic.province !== province) return false;
      if (specialty && !clinic.specialties.includes(specialty)) return false;
      if (insurance && !clinic.insurances.includes(insurance)) return false;
      if (serviceCategory && !clinic.serviceCategories.includes(serviceCategory)) return false;
      if (minRating && clinic.rating < parseFloat(minRating)) return false;
      return true;
    });

    // Sorting
    result = result.sort((a, b) => {
      if (currentSort === 'rating') return b.rating - a.rating;
      if (currentSort === 'newest') return b.createdAt.getTime() - a.createdAt.getTime();
      return (a.name || '').localeCompare(b.name || '');
    });

    return result;
  }, [searchParams]);

  const toggleCompare = (id: string, checked: boolean) => {
    if (checked) {
      if (compareList.length < 3) {
        setCompareList(prev => [...prev, id]);
      }
    } else {
      setCompareList(prev => prev.filter(cid => cid !== id));
    }
  };

  return (
    <div className="relative flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Filters Sidebar - Desktop */}
      <div className="hidden w-80 shrink-0 border-r border-outline-variant/20 overflow-y-auto p-4 lg:block">
        <SearchFilters key={searchParams.toString()} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex relative flex-col lg:flex-row">
        {/* List View */}
        <div className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth transition-opacity duration-300",
            showMap ? "hidden lg:block" : "block"
        )}>
             <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0">
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-baseline gap-2">
                        <h1 className="text-3xl font-bold text-on-surface">{t('title')}</h1>
                        <span className="text-lg font-normal text-on-surface-variant">({filteredClinics.length})</span>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        {/* Sort By Dropdown */}
                        <div className="relative flex items-center gap-2">
                            <Label className="whitespace-nowrap hidden sm:block">{t('sortBy')}:</Label>
                            <div className="relative">
                                <select
                                    value={sort}
                                    onChange={onSortChange}
                                    className="h-9 w-full sm:w-[140px] appearance-none rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="name">{tSort('name')}</option>
                                    <option value="rating">{tSort('rating')}</option>
                                    <option value="newest">{tSort('newest')}</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
                            </div>
                        </div>

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
                                        <SearchFilters key={searchParams.toString()} />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                 </div>

                 {/* Active Filters / Compare Bar (Floating if compare active) */}
                 {compareList.length > 0 && (
                   <div className="sticky top-0 z-10 bg-primary-container text-on-primary-container p-4 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-2">
                     <span className="font-medium">{compareList.length} clinics selected</span>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setCompareList([])}>Clear</Button>
                        <Button size="sm" asChild>
                           <Link href={`/compare?ids=${compareList.join(',')}`}>
                             Compare <ArrowRight className="ml-1 h-4 w-4" />
                           </Link>
                        </Button>
                     </div>
                   </div>
                 )}

                 <div className="grid grid-cols-1 gap-4">
                     {filteredClinics.length > 0 ? (
                       filteredClinics.map((clinic) => (
                           <ClinicCard
                               key={clinic.id}
                               clinic={clinic as Clinic}
                               rating={clinic.rating}
                               reviewCount={clinic.reviewCount}
                               isChecked={clinic.id ? compareList.includes(clinic.id) : false}
                               onCompareChange={(checked) => clinic.id && toggleCompare(clinic.id, checked)}
                           />
                       ))
                     ) : (
                       <div className="text-center py-12 text-on-surface-variant">
                         <p className="text-lg">{t('noResults')}</p>
                         <Button variant="link" onClick={() => window.location.href = '/search'}>
                           {t('clearAll')}
                         </Button>
                       </div>
                     )}
                 </div>
             </div>
        </div>

        {/* Map View */}
        <div className={cn(
            "w-full lg:w-1/3 border-l border-outline-variant/20 bg-surface-container-high relative min-h-[300px]",
            showMap ? "block flex-1" : "hidden lg:block"
        )}>
             <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant bg-surface-container-highest/50">
                 <div className="text-center p-6">
                     <Map className="w-16 h-16 mx-auto mb-4 opacity-20" />
                     <h3 className="text-lg font-semibold mb-2">Map View</h3>
                     <p className="text-sm opacity-70 max-w-[200px] mx-auto">
                       Interactive map showing {filteredClinics.length} clinics in this area.
                     </p>
                     <p className="text-xs mt-4 text-primary font-medium">(Coming Soon)</p>
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
