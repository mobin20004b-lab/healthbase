import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, Globe, BadgeCheck, Star, Edit } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Card } from '@/web/components/ui/card';
import { FavoriteButton } from '@/web/components/clinic/FavoriteButton';

// Fetch single clinic from API
async function getClinic(id: string, locale: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/clinics/${id}?lang=${locale}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('Error fetching clinic:', error);
        return null;
    }
}

export default async function ClinicDetailPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations('ClinicDetail');
    const clinic = await getClinic(id, locale);

    if (!clinic) {
        notFound();
    }

    const avgRating = clinic.reviews?.length > 0
        ? clinic.reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / clinic.reviews.length
        : 0;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header - Spatial UI with M3 Expressive shapes */}
            <div className="relative isolate overflow-hidden bg-surface-container-low border-b border-outline-variant/30 py-16 sm:py-24">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] m3-shape-flower opacity-60 animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-tertiary/10 blur-[100px] m3-shape-flower opacity-30" />
                </div>

                <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-6xl flex items-center gap-6 flex-wrap leading-tight">
                                {clinic.name}
                                {clinic.isVerified && (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-primary-container px-5 py-2 text-sm font-black text-on-primary-container shadow-lg shadow-primary/5">
                                        <BadgeCheck className="h-5 w-5" />
                                        {t('verified')}
                                    </span>
                                )}
                            </h1>
                            {clinic.address && (
                                <p className="mt-8 flex items-center gap-3 text-xl text-on-surface-variant font-bold">
                                    <MapPin className="h-7 w-7 text-primary" />
                                    {clinic.address}{clinic.city && `, ${clinic.city}`}
                                </p>
                            )}

                            {/* Contact Quick Actions */}
                            <div className="mt-12 flex flex-wrap gap-4">
                                {clinic.phone && (
                                    <Link href={`tel:${clinic.phone}`}>
                                        <Button size="lg" className="rounded-2xl shadow-2xl shadow-primary/20 gap-3">
                                            <Phone className="h-5 w-5" />
                                            {clinic.phone}
                                        </Button>
                                    </Link>
                                )}
                                {clinic.website && (
                                    <Link href={clinic.website} target="_blank" rel="noopener noreferrer">
                                        <Button size="lg" variant="tonal" className="rounded-2xl gap-3">
                                            <Globe className="h-5 w-5" />
                                            {t('website') || 'Website'}
                                        </Button>
                                    </Link>
                                )}
                                <FavoriteButton
                                    clinicId={clinic.id}
                                    initialIsFavorited={clinic.isFavorited}
                                    showLabel
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* Rating Card - Spatial UI */}
                        {avgRating > 0 && (
                            <Card className="flex items-center gap-5 bg-surface-container-highest/60 backdrop-blur-3xl border-white/20 p-8 shadow-2xl rounded-[var(--radius-2xl)]">
                                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center m3-shape-flower shadow-inner">
                                    <Star className="h-8 w-8 text-primary fill-primary" />
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-5xl font-black text-on-surface tracking-tighter">{avgRating.toFixed(1)}</span>
                                        <span className="text-sm font-black text-on-surface-variant/50">/ 5</span>
                                    </div>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                        {clinic.reviews?.length} {t('reviews') || 'Reviews'}
                                    </span>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        {clinic.description && (
                            <Card variant="bento" className="p-10 bg-surface-container-lowest shadow-sm leading-relaxed text-lg font-medium text-on-surface">
                                {clinic.description}
                            </Card>
                        )}

                        {/* Services List - Bento Style */}
                        <Card variant="bento" className="p-10 bg-surface-container-lowest">
                            <h2 className="text-3xl font-black text-on-surface mb-10 flex items-center gap-4">
                                <BadgeCheck className="h-8 w-8 text-primary" />
                                {t('services')}
                            </h2>
                            {clinic.services?.length > 0 ? (
                                <div className="grid gap-6">
                                    {clinic.services.map((service: { id: string; name: string; category?: string; priceMin?: number; priceMax?: number; currency?: string }) => (
                                        <div key={service.id} className="flex items-center justify-between p-6 rounded-2xl bg-surface-container-low/40 border border-outline-variant/10 hover:border-primary/20 transition-all group">
                                            <div>
                                                <p className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">{service.name}</p>
                                                {service.category && (
                                                    <p className="text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest mt-1">{service.category}</p>
                                                )}
                                            </div>
                                            {(service.priceMin || service.priceMax) && (
                                                <div className="text-right">
                                                    <p className="text-2xl font-black text-on-surface tracking-tighter">
                                                        {service.priceMin?.toLocaleString()} - {service.priceMax?.toLocaleString()}
                                                    </p>
                                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{service.currency}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center bg-surface-container-low/20 rounded-3xl border-2 border-dashed border-outline-variant/30">
                                    <p className="text-on-surface-variant font-bold">{t('noServices')}</p>
                                </div>
                            )}
                        </Card>

                        {/* Reviews Section */}
                        <Card variant="bento" className="p-10 bg-surface-container-lowest">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-black text-on-surface">{t('reviews')}</h2>
                                <Link href={`/clinics/${id}/review`}>
                                    <Button variant="tertiary" className="rounded-2xl gap-2 font-black">
                                        <Edit className="h-4 w-4" />
                                        {t('writeReview')}
                                    </Button>
                                </Link>
                            </div>
                            {clinic.reviews?.length > 0 ? (
                                <div className="space-y-8">
                                    {clinic.reviews.map((review: { id: string; rating: number; user?: { name?: string }; comment?: string }) => (
                                        <div key={review.id} className="space-y-4">
                                            <div className="flex items-center gap-5">
                                                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-inner m3-shape-flower">
                                                    <span className="text-xl font-black text-primary">
                                                        {review.user?.name?.[0] || 'U'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-on-surface">{review.user?.name || 'Anonymous'}</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-outline-variant/30'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="text-base text-on-surface-variant font-medium leading-relaxed bg-surface-container-low/20 p-6 rounded-2xl border border-outline-variant/10 italic">
                                                    &quot;{review.comment}&quot;
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center bg-surface-container-low/20 rounded-3xl border-2 border-dashed border-outline-variant/30">
                                    <p className="text-on-surface-variant font-bold">{t('noReviews')}</p>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Sidebar Information Card */}
                    <aside className="space-y-8">
                        <Card variant="bento" className="p-10 bg-surface-container-low sticky top-24 shadow-2xl shadow-on-surface/5 border-outline-variant/20">
                            <h3 className="text-2xl font-black text-on-surface mb-8 border-b border-outline-variant/20 pb-6">{t('address')}</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/20 transition-transform hover:scale-110">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <p className="text-lg text-on-surface-variant font-bold leading-snug">
                                        {clinic.address || 'Not provided'}<br />
                                        <span className="text-primary">{clinic.city}</span>
                                    </p>
                                </div>

                                {clinic.phone && (
                                    <div className="pt-8 border-t border-outline-variant/20">
                                        <h3 className="text-sm font-black text-on-surface-variant/50 uppercase tracking-[0.2em] mb-4">{t('phone')}</h3>
                                        <div className="flex gap-4 items-center">
                                            <div className="h-10 w-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-secondary/20">
                                                <Phone className="h-5 w-5 text-secondary" />
                                            </div>
                                            <a href={`tel:${clinic.phone}`} className="text-2xl font-black text-primary hover:opacity-80 transition-all tracking-tight">
                                                {clinic.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
