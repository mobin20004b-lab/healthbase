
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { auth } from '@/auth';
import { redirect } from '@/routing';
import { AdminClinicList } from '@/web/components/admin/AdminClinicList';

async function getClinics() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/clinics`, {
        cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function AdminClinicsPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const t = await getTranslations('Admin.clinics');

    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/', { locale });
    }

    const clinics = await getClinics();

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-on-surface leading-tight">{t('title')}</h1>
                    <p className="text-xl text-on-surface-variant font-bold mt-2">
                        {t('list.status')} & Management
                    </p>
                </header>

                <AdminClinicList initialClinics={clinics} locale={locale} />
            </div>
        </div>
    );
}
