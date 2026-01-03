
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, BadgeCheck, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Card } from '@/web/components/ui/card';
import { FavoriteButton } from '@/web/components/clinic/FavoriteButton';
import { auth } from '@/auth';
import { redirect, Link } from '@/routing';

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
        redirect(`/${locale}/auth/login`);
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
                {favorites.length === 0 ? (
                    <Card variant="bento" className="text-center py-24 bg-surface-container-lowest">
                        <div className="mx-auto h-12 w-12 text-on-surface-variant mb-4 opacity-20">
                            <Heart className="h-full w-full" />
                        </div>
                        <p className="text-on-surface-variant text-lg font-bold">You haven&apos;t saved any clinics yet.</p>
                        <Link href={`/${locale}/clinics`} className="mt-6 inline-block">
                            <Button variant="default" className="rounded-full px-8">
                                Browse Clinics
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favorites.map((clinic: { id: string; name: string; isVerified?: boolean; city?: string; province?: string; description?: string; services?: { id: string; name: string }[] }) => (
                            <Link
                                key={clinic.id}
                                href={`/${locale}/clinics/${clinic.id}`}
                                className="block h-full transition-all"
                            >
                                <Card variant="bento" className="group p-6 h-full transition-all hover:bg-surface-container-high hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-2xl font-black text-on-surface group-hover:text-primary transition-colors">
                                                    {clinic.name}
                                                </h3>
                                                {clinic.isVerified && (
                                                    <div className="flex items-center gap-1 bg-primary-container text-on-primary-container text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                        <BadgeCheck className="h-3.5 w-3.5" />
                                                        {t('verified')}
                                                    </div>
                                                )}
                                            </div>
                                        {(clinic.city || clinic.province) && (
                                                <p className="mt-2 flex items-center gap-2 text-sm text-on-surface-variant font-bold">
                                                    <MapPin className="h-4 w-4 text-primary" />
                                                {clinic.province && `${clinic.province} - `}{clinic.city}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {clinic.description && (
                                        <p className="text-base text-on-surface-variant line-clamp-2 mb-8 flex-1 leading-relaxed font-medium">
                                            {clinic.description}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                                        <div className="flex flex-wrap gap-2">
                                            {clinic.services?.slice(0, 2).map((service) => (
                                                <span
                                                    key={service.id}
                                                    className="inline-flex items-center rounded-xl bg-surface-container-lowest border border-outline-variant/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-tight text-on-surface-variant group-hover:bg-primary/5 group-hover:text-primary transition-all"
                                                >
                                                    {service.name}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <FavoriteButton
                                                clinicId={clinic.id}
                                                initialIsFavorited={true}
                                                className="scale-90"
                                            />
                                            <Button size="icon" variant="tonal" className="m3-shape-flower group-hover:rotate-12 transition-all">
                                                <ArrowRight className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
