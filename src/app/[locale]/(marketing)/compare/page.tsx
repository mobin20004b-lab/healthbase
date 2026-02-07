import { getTranslations } from 'next-intl/server';
import { getClinicsByIds } from '@/services/clinics';
import { CompareTable } from '@/web/components/clinics/CompareTable';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{ locale: string }>;
};

export default async function ComparePage({ searchParams, params }: Props) {
    const { locale } = await params;
    const resolvedSearchParams = await searchParams;
    const idsParam = resolvedSearchParams.ids;

    // Parse IDs
    const ids = typeof idsParam === 'string' ? idsParam.split(',').filter(Boolean) : [];

    const t = await getTranslations('Compare');

    const clinics = await getClinicsByIds(ids, locale);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-on-surface mb-2">{t('title')}</h1>
                <p className="text-on-surface-variant">{t('subtitle')}</p>
            </div>

            <CompareTable clinics={clinics} />
        </div>
    );
}
