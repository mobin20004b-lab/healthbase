import { setRequestLocale, getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { redirect } from '@/routing';
import { ClinicForm } from '@/web/components/admin/ClinicForm';

export default async function NewClinicPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);

    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/', { locale });
    }

    const t = await getTranslations('Admin.clinics');

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-on-surface leading-tight">{t('addNew')}</h1>
                </header>

                <ClinicForm />
            </div>
        </div>
    );
}
