
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Heart } from 'lucide-react';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import FavoritesList from '@/web/components/favorites/FavoritesList';

async function getFavorites() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/favorites`, {
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}

export default async function FavoritesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const session = await auth();
    if (!session) {
        notFound();
    }

    const t = await getTranslations('Clinics');
    const favorites = await getFavorites();

    return (
        <div className="min-h-screen bg-background">
            <div className="relative isolate overflow-hidden bg-surface-container-low py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-6xl flex items-center gap-4">
                            <Heart className="h-12 w-12 text-primary fill-primary" />
                            {t('favorites') || 'Saved Clinics'}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-on-surface-variant font-medium">
                            Manage your saved healthcare providers
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-primary/10 blur-[100px] m3-shape-flower animate-pulse opacity-60" />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <FavoritesList
                    favorites={favorites}
                    locale={locale}
                    translations={{
                        verified: t('verified')
                    }}
                />
            </div>
        </div>
    );
}
