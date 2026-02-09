import { getClinicsByIds } from '@/services/clinics';
import { CompareTable } from '@/web/components/clinics/CompareTable';
import { getTranslations } from 'next-intl/server';

type Props = {
    searchParams: Promise<{ ids?: string | string[] }>;
    params: Promise<{ locale: string }>;
};

export default async function ComparePage({ searchParams, params }: Props) {
    const { ids: idsParam } = await searchParams;
    const { locale } = await params;

    let ids: string[] = [];

    if (typeof idsParam === 'string') {
        ids = idsParam.split(',').filter(Boolean);
    } else if (Array.isArray(idsParam)) {
        ids = idsParam.flatMap(id => id.split(',')).filter(Boolean);
    }

    const clinics = await getClinicsByIds(ids, locale);
    const t = await getTranslations({ locale, namespace: 'Clinics' });

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-on-surface mb-2">{t('compareTitle') || 'Compare Clinics'}</h1>
                <p className="text-on-surface-variant">{t('compareSubtitle') || 'Compare features, ratings, and availability.'}</p>
             </div>

             <CompareTable clinics={clinics} />
        </div>
    );
}
