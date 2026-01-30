
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CompareTable, ComparableClinic } from '@/web/components/clinics/CompareTable';

interface PageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getClinicsByIds(ids: string[]) {
    if (ids.length === 0) return [];

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${baseUrl}/api/clinics?ids=${ids.join(',')}`, {
            cache: 'no-store'
        });
        if (!res.ok) {
            console.error('Failed to fetch clinics for comparison');
            return [];
        }
        const json = await res.json();
        return json.data as ComparableClinic[];
    } catch (error) {
        console.error('Error fetching clinics:', error);
        return [];
    }
}

export default async function ComparePage({ params, searchParams }: PageProps) {
    const { locale } = await params;
    const { ids } = await searchParams;

    setRequestLocale(locale);
    const t = await getTranslations('Clinics');

    const idsList = typeof ids === 'string' ? ids.split(',').filter(Boolean) : [];
    const clinics = await getClinicsByIds(idsList);

    return (
        <div className="min-h-screen bg-background pb-20">
             <div className="relative isolate overflow-hidden bg-surface-container-low py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
                        {t.has('compareTitle') ? t('compareTitle') : 'Compare Clinics'}
                    </h1>
                    <p className="mt-4 text-lg text-on-surface-variant">
                         {t.has('compareSubtitle') ? t('compareSubtitle') : 'Side-by-side comparison of your selected clinics.'}
                    </p>
                </div>
                 {/* M3 Expressive decorative background elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] right-[10%] w-[400px] h-[400px] bg-secondary/5 blur-[80px] m3-shape-flower opacity-60" />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                 <CompareTable clinics={clinics} />
            </div>
        </div>
    );
}
