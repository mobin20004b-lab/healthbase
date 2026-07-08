import { getTranslations } from 'next-intl/server';
import { Link } from '@/routing';
import { ShieldAlert } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export default async function UnauthorizedPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);

    const t = await getTranslations('Unauthorized');

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center max-w-md text-center space-y-6 p-8 bg-surface-container-low rounded-3xl shadow-sm border border-outline-variant/20">
                <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-2">
                    <ShieldAlert className="w-8 h-8 text-error" />
                </div>

                <h1 className="text-3xl font-bold text-on-surface">
                    {t('title')}
                </h1>

                <p className="text-on-surface-variant text-lg">
                    {t('message')}
                </p>

                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-medium text-on-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        {t('backToHome')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
