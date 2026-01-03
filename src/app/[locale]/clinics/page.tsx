import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, Star, BadgeCheck, Filter, ArrowRight } from 'lucide-react';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import { cn } from '@/lib/utils';
import { Button } from '@/web/components/ui/button';
import { Card } from '@/web/components/ui/card';
import { FavoriteButton } from '@/web/components/clinic/FavoriteButton';
import { Link } from '@/routing'; // Localized Link

interface PageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Fetch clinics from API with filters
async function getClinics(locale: string, searchParams: Record<string, string | string[] | undefined>) {
    try {
        const query = new URLSearchParams();
        query.set('lang', locale);
        Object.entries(searchParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => query.append(key, v));
            } else if (value !== undefined) {
                query.set(key, value);
            }
        });
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/clinics?${query.toString()}`, {
            cache: 'no-store'
        });
        if (!res.ok) return { data: [], meta: { total: 0 } };
        return res.json();
    } catch (error) {
        console.error('Error fetching clinics:', error);
        return { data: [], meta: { total: 0 } };
    }
}

export default async function ClinicsPage({ params, searchParams }: PageProps) {
    const { locale } = await params;
    const resolvedSearchParams = await searchParams;

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations('Clinics');
    const { data: clinics, meta } = await getClinics(locale, resolvedSearchParams);

    return (
        <div className="min-h-screen bg-background">
            {/* Header section with M3 Expressive tokens */}
            <div className="relative isolate overflow-hidden bg-surface-container-low py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-6xl">
                            {t('title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-on-surface-variant font-medium">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>
                {/* M3 Expressive decorative background elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-primary/10 blur-[100px] m3-shape-flower animate-pulse opacity-60" />
                    <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-tertiary/10 blur-[80px] m3-shape-flower opacity-40" />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-80 flex-shrink-0">
                        <SearchFilters />
                    </aside>

                    {/* Clinic List - Bento Grid Layout */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                            {clinics.length === 0 ? (
                                <Card variant="bento" className="col-span-full text-center py-24 bg-surface-container-lowest">
                                    <div className="mx-auto h-12 w-12 text-on-surface-variant mb-4 opacity-20">
                                        <Filter className="h-full w-full" />
                                    </div>
                                    <p className="text-on-surface-variant text-lg font-bold">{t('noResults')}</p>
                                </Card>
                            ) : (
                                clinics.map((clinic: { id: string; name: string; isVerified: boolean; isFavorited: boolean; city?: string; province?: string; averageRating: number; description?: string; services?: { id: string; name: string }[] }, index: number) => (
                                    <Link
                                        key={clinic.id}
                                        href={`/clinics/${clinic.id}`}
                                        className={cn(
                                            "block h-full transition-all",
                                            index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                                        )}
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
                                                            {clinic.province && (
                                                                <>
                                                                    {clinic.province}
                                                                    {clinic.city && ' - '}
                                                                </>
                                                            )}
                                                            {clinic.city}
                                                        </p>
                                                    )}
                                                </div>
                                                {clinic.averageRating > 0 && (
                                                    <div className="flex items-center gap-1.5 rounded-2xl bg-secondary-container/50 px-3 py-1.5 border border-secondary/10">
                                                        <Star className="h-4 w-4 text-secondary fill-secondary" />
                                                        <span className="text-sm font-black text-on-secondary-container">
                                                            {clinic.averageRating.toFixed(1)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {clinic.description && (
                                                <p className="text-base text-on-surface-variant line-clamp-2 mb-8 flex-1 leading-relaxed font-medium">
                                                    {clinic.description}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                                                <div className="flex flex-wrap gap-2">
                                                    {clinic.services?.slice(0, 3).map((service: { id: string; name: string }) => (
                                                        <span
                                                            key={service.id}
                                                            className="inline-flex items-center rounded-xl bg-surface-container-lowest border border-outline-variant/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-tight text-on-surface-variant group-hover:bg-primary/5 group-hover:text-primary transition-all"
                                                        >
                                                            {service.name}
                                                        </span>
                                                    ))}
                                                    {clinic.services && clinic.services.length > 3 && (
                                                        <span className="text-[10px] font-bold text-on-surface-variant/40 pt-2 ml-1 uppercase">
                                                            +{clinic.services.length - 3} {t('more') || 'more'}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <FavoriteButton
                                                        clinicId={clinic.id}
                                                        initialIsFavorited={clinic.isFavorited}
                                                        className="scale-90"
                                                    />
                                                    <Button size="icon" variant="tonal" className="m3-shape-flower group-hover:rotate-12 transition-all">
                                                        <ArrowRight className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))
                            )}
                        </div>

                        {/* Pagination placeholder */}
                        {meta?.totalPages > 1 && (
                            <div className="mt-16 flex justify-center">
                                <Card className="inline-flex p-1.5 bg-surface-container-low shadow-lg shadow-on-surface/5">
                                    <Button variant="ghost" size="sm" className="rounded-xl">1</Button>
                                    <Button variant="ghost" size="sm" className="rounded-xl">2</Button>
                                    <Button variant="ghost" size="sm" className="rounded-xl">...</Button>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
