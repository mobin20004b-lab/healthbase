
import { getTranslations } from 'next-intl/server';
import { getClinicsByIds } from '@/services/clinics';
import CompareTable from '@/web/components/clinics/CompareTable';

interface ComparePageProps {
    searchParams: Promise<{
        ids?: string;
    }>;
    params: Promise<{
        locale: string;
    }>;
}

export default async function ComparePage({ searchParams, params }: ComparePageProps) {
    const { ids } = await searchParams;
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: 'Compare'});

    const idList = ids ? ids.split(',') : [];
    const clinics = await getClinicsByIds(idList, locale);

    return (
        <div className="min-h-screen bg-surface-container-low flex flex-col">
            <div className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-on-surface mb-2">{t('title')}</h1>
                    <p className="text-on-surface-variant">{t('subtitle')}</p>
                </div>

                <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden">
                    <CompareTable clinics={clinics} />
                </div>
            </div>
        </div>
    );
}
