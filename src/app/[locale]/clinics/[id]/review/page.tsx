
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReviewForm } from '@/web/components/clinic/ReviewForm';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

async function getClinic(id: string) {
    return await prisma.clinic.findUnique({
        where: { id },
        select: { name: true, id: true }
    });
}

export default async function ClinicReviewPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params;
    setRequestLocale(locale);

    const session = await auth();
    if (!session) {
        // Redirect logic would go here, but auth middleware usually handles it.
        // For now we just check it.
    }

    const t = await getTranslations('ClinicDetail');
    const clinic = await getClinic(id);

    if (!clinic) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-on-surface leading-tight mb-4">
                        {t('writeReview')}
                    </h1>
                    <p className="text-xl text-on-surface-variant font-bold">
                        Sharing your experience for <span className="text-primary">{clinic.name}</span>
                    </p>
                </header>

                <ReviewForm clinicId={clinic.id} />
            </div>
        </div>
    );
}
