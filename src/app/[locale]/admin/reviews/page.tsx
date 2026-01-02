
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Card } from '@/web/components/ui/card';
import { BadgeCheck, XCircle, Clock, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { ReviewModerationActions } from '@/web/components/admin/ReviewModerationActions';

// Fetch pending reviews
async function getPendingReviews() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/reviews?status=PENDING`, {
        cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function AdminReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const t = await getTranslations('Admin.reviews');

    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/');
    }

    const reviews = await getPendingReviews();

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <header className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-on-surface leading-tight">{t('title')}</h1>
                        <p className="text-xl text-on-surface-variant font-bold mt-2">
                            {t('subtitle')}
                        </p>
                    </div>
                </header>

                {reviews.length === 0 ? (
                    <Card className="p-20 text-center bg-surface-container-low border-dashed border-2 border-outline-variant/30 rounded-[var(--radius-3xl)]">
                        <CheckCircle className="h-16 w-16 text-primary/30 mx-auto mb-6" />
                        <p className="text-2xl font-bold text-on-surface-variant">{t('noPending')}</p>
                    </Card>
                ) : (
                    <div className="grid gap-8">
                        {reviews.map((review: any) => (
                            <Card key={review.id} variant="bento" className="p-8 bg-surface-container-lowest border-outline-variant/10 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning-container text-on-warning-container text-xs font-black uppercase tracking-widest">
                                        <Clock className="h-4 w-4" />
                                        {t('pending')}
                                    </span>
                                </div>

                                <div className="flex flex-col md:flex-row gap-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center m3-shape-flower">
                                                <span className="text-lg font-black text-primary">{review.user?.name?.[0] || 'U'}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-on-surface">{review.user?.name || t('anonymous')}</h3>
                                                <p className="text-sm font-bold text-on-surface-variant">{t('for')} <span className="text-primary">{review.clinicId}</span></p>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <BadgeCheck key={i} className={`h-5 w-5 ${i < review.rating ? 'text-primary fill-primary' : 'text-outline-variant/30'}`} />
                                            ))}
                                        </div>

                                        <p className="text-lg text-on-surface font-medium leading-relaxed italic border-l-4 border-primary/20 pl-6 my-6">
                                            &quot;{review.comment}&quot;
                                        </p>

                                        <p className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">
                                            {t('submitted')}: {new Date(review.createdAt).toLocaleDateString(locale)}
                                        </p>
                                    </div>

                                    <div className="md:w-64 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-outline-variant/10 pt-8 md:pt-0 md:pl-8">
                                        <ReviewModerationActions reviewId={review.id} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
