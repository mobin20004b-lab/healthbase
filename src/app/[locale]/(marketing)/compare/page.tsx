
import { getClinicsByIds } from '@/services/clinics';
import CompareTable from '@/web/components/clinics/CompareTable';
import ClinicComparisonAISummary from '@/web/components/clinics/comparison/ClinicComparisonAISummary';
// import { getTranslations } from 'next-intl/server';
import { Link } from '@/routing';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

interface ComparePageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
    await params;
    // const t = await getTranslations({ locale, namespace: 'Clinics' });
    return {
        title: `Compare Clinics - Topmedica`, // Should be localized ideally
    };
}

export default async function ComparePage({ params, searchParams }: ComparePageProps) {
    const { locale } = await params;
    const sp = await searchParams;

    const idsParam = sp.ids;
    let idsStr = '';

    if (Array.isArray(idsParam)) {
        idsStr = idsParam.join(',');
    } else if (typeof idsParam === 'string') {
        idsStr = idsParam;
    }

    const clinicIds = idsStr.split(',').map(id => id.trim()).filter(Boolean);

    const clinics = await getClinicsByIds(clinicIds, locale);
    // const t = await getTranslations({ locale, namespace: 'Clinics' });

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="mb-8">
                 <Link href="/search" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1 rtl:rotate-180 rtl:mr-0 rtl:ml-1" />
                    Back to Search results
                </Link>
                <div className="flex items-baseline justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-on-surface">Compare Clinics</h1>
                        <p className="text-on-surface-variant mt-2">
                            Comparing {clinics.length} selected clinic{clinics.length !== 1 ? 's' : ''}.
                        </p>
                    </div>
                </div>
            </div>

            <ClinicComparisonAISummary clinics={clinics} />

            <CompareTable clinics={clinics} />
        </div>
    );
}
