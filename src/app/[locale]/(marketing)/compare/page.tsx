import { getClinicsByIds } from '@/services/clinics';
import { CompareTable } from '@/web/components/clinics/CompareTable';
import { getTranslations } from 'next-intl/server';

interface ComparePageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ ids?: string }>;
}

export default async function ComparePage(props: ComparePageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const { locale } = params;
    const ids = searchParams.ids?.split(',').filter(Boolean) || [];
    const clinics = await getClinicsByIds(ids, locale);
    const t = await getTranslations('Clinics');

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold text-on-surface mb-8">{t.has('compareTitle') ? t('compareTitle') : "Compare Clinics"}</h1>
            <CompareTable clinics={clinics} />
        </div>
    );
}
