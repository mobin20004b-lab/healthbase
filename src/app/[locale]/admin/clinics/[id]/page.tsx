
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { redirect } from '@/routing';
import { notFound } from 'next/navigation';
import { ClinicForm } from '@/web/components/admin/ClinicForm';

async function getClinic(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/clinics/${id}?lang=all`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('Error fetching clinic for edit:', error);
        return null;
    }
}

export default async function EditClinicPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params;
    setRequestLocale(locale);

    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/', { locale });
    }

    const t = await getTranslations('Admin.clinics');
    const clinic = await getClinic(id);

    if (!clinic) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-on-surface leading-tight">{t('edit')}</h1>
                </header>

                <ClinicForm initialData={clinic} />
            </div>
        </div>
    );
}
