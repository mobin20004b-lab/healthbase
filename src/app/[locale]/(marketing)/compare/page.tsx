
import { getClinicsByIds } from '@/services/clinics';
import { CompareTable, type ComparableClinic } from '@/web/components/clinics/CompareTable';
import { StickyHeader } from '@/web/components/ui/sticky-header';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Clinics' });

  return {
    title: t('compareTitle', { defaultValue: 'Compare Clinics' }),
  };
}

export default async function ComparePage({ params, searchParams }: Props) {
    const { locale } = await params;
    const resolvedSearchParams = await searchParams;
    const ids = resolvedSearchParams.ids;

    let idArray: string[] = [];
    if (typeof ids === 'string') {
        idArray = ids.split(',').filter(Boolean);
    } else if (Array.isArray(ids)) {
         idArray = ids.flatMap(id => id.split(',')).filter(Boolean);
    }

    // Limit to 3 just in case
    idArray = idArray.slice(0, 3);

    const clinics = await getClinicsByIds(idArray, locale);

    // Map to ComparableClinic to avoid serialization issues with Dates
    const comparableClinics: ComparableClinic[] = clinics.map(clinic => ({
        id: clinic.id,
        name: clinic.name,
        city: clinic.city,
        image: clinic.image,
        averageRating: clinic.averageRating,
        reviewCount: clinic.reviewCount,
        isVerified: clinic.isVerified,
        services: clinic.services.map(s => ({ id: s.id, name: s.name })),
    }));

    return (
        <div className="min-h-screen bg-surface">
            <StickyHeader />
            <main className="container mx-auto px-4 py-8 pt-24">
                <div className="mb-8">
                     <h1 className="text-3xl font-bold text-on-surface mb-2">Compare Clinics</h1>
                     <p className="text-on-surface-variant">
                        Comparing {clinics.length} clinics side-by-side.
                     </p>
                </div>

                <CompareTable clinics={comparableClinics} />
            </main>
        </div>
    );
}
