
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card } from '@/web/components/ui/card';
import { Button } from '@/web/components/ui/button';
import { Check, X, AlertTriangle, Star } from 'lucide-react';
import { revalidatePath } from 'next/cache';

async function updateReviewStatus(reviewId: string, status: 'APPROVED' | 'REJECTED') {
    "use server"
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') return;

    await prisma.review.update({
        where: { id: reviewId },
        data: { status }
    });
    revalidatePath('/[locale]/admin/reviews');
}

export default async function AdminReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const t = await getTranslations('Admin.reviews');

    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/');
    }

    const reviews = await prisma.review.findMany({
        where: { status: 'PENDING' },
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true, email: true } },
            clinic: { select: { name: true } }
        }
    });

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-on-surface mb-2">{t('title')}</h1>
                <p className="text-on-surface-variant">{t('subtitle')}</p>
            </header>

            {reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
                    <Check className="h-12 w-12 mb-4 opacity-50" />
                    <p>{t('no_pending')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {reviews.map((review) => (
                        <Card key={review.id} variant="elevated" className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-on-surface">{review.user.name || review.user.email}</span>
                                            <span className="text-on-surface-variant text-sm">reviewed</span>
                                            <span className="font-bold text-primary">{review.clinic.name}</span>
                                        </div>
                                        <div className="flex items-center bg-primary/10 px-2 py-1 rounded-lg">
                                            <Star className="h-4 w-4 text-primary fill-primary mr-1" />
                                            <span className="font-bold text-primary">{review.rating}</span>
                                        </div>
                                    </div>

                                    <p className="text-on-surface mb-4 leading-relaxed bg-surface-container-low p-4 rounded-xl">
                                        "{review.comment}"
                                    </p>

                                    {/* Detailed scores not in schema yet, commenting out
                                    <div className="flex gap-4 text-xs text-on-surface-variant font-mono">
                                        <span>Wait: {review.waiting_time_score}/5</span>
                                        <span>Clean: {review.cleanliness_score}/5</span>
                                        <span>Staff: {review.staff_friendliness_score}/5</span>
                                    </div>
                                    */}
                                </div>

                                <div className="flex md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0 md:pl-6">
                                    <form action={updateReviewStatus.bind(null, review.id, 'APPROVED')}>
                                        <Button variant="filled" size="sm" type="submit" className="w-full bg-success text-on-success hover:bg-success/90">
                                            <Check className="h-4 w-4 mr-2" />
                                            {t('approve')}
                                        </Button>
                                    </form>
                                    <form action={updateReviewStatus.bind(null, review.id, 'REJECTED')}>
                                        <Button variant="outlined" size="sm" type="submit" className="w-full text-error border-error hover:bg-error/10">
                                            <X className="h-4 w-4 mr-2" />
                                            {t('reject')}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
