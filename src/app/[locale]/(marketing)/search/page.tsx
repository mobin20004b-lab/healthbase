import { getTranslations } from 'next-intl/server';
import { MOCK_CLINICS } from '@/lib/constants/mock-data';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { ClinicCard } from '@/web/components/clinics/clinic-card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/web/components/ui/sheet";
import { Button } from "@/web/components/ui/button";
import { Filter } from "lucide-react";
import { Link } from '@/routing';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Clinics' });
  return {
    title: t('title'),
    description: t('subtitle')
  };
}

export default async function SearchPage({
  searchParams,
}: Props) {
  const t = await getTranslations('Clinics');
  const params = await searchParams;

  const q = (Array.isArray(params.q) ? params.q[0] : params.q)?.toLowerCase() || '';
  const city = (Array.isArray(params.city) ? params.city[0] : params.city) || '';
  const province = (Array.isArray(params.province) ? params.province[0] : params.province) || '';
  const specialty = (Array.isArray(params.specialty) ? params.specialty[0] : params.specialty) || '';
  const insurance = (Array.isArray(params.insurance) ? params.insurance[0] : params.insurance) || '';

  const filteredClinics = MOCK_CLINICS.filter((clinic) => {
    const matchesQ = !q || clinic.name.toLowerCase().includes(q) || clinic.description?.toLowerCase().includes(q);
    const matchesCity = !city || clinic.city === city;
    const matchesProvince = !province || clinic.province === province;
    const matchesSpecialty = !specialty || clinic.specialties.includes(specialty);
    const matchesInsurance = !insurance || clinic.insurances.includes(insurance);

    return matchesQ && matchesCity && matchesProvince && matchesSpecialty && matchesInsurance;
  });

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 shrink-0">
                <SearchFilters />
            </aside>

            {/* Mobile Filter Trigger */}
            <div className="md:hidden mb-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            {t('filters')}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>{t('filters')}</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4">
                            <SearchFilters />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Results */}
            <div className="flex-1">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-on-surface mb-2">{t('title')}</h1>
                    <p className="text-on-surface-variant">
                        {filteredClinics.length > 0
                            ? `${filteredClinics.length} result${filteredClinics.length !== 1 ? 's' : ''} found`
                            : t('noResults')}
                    </p>
                </div>

                {filteredClinics.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredClinics.map((clinic) => (
                            <ClinicCard
                                key={clinic.id}
                                clinic={clinic}
                                rating={clinic.rating}
                                reviewCount={clinic.reviewCount}
                                nextAvailable={clinic.nextAvailable}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-surface-container-low rounded-xl">
                        <p className="text-lg text-on-surface-variant">{t('noResults')}</p>
                        {/* We use a simple anchor tag for clearing to trigger a full refresh/reset or just link to base search */}
                        <Button
                             variant="link"
                             className="mt-2 text-primary"
                             asChild
                        >
                            <Link href="/search">Clear Filters</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
