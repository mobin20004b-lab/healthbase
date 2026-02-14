import { ClinicWithRelations } from "@/services/clinics";
import { useTranslations } from "next-intl";
import { Star, User } from "lucide-react";
import { Button } from "@/web/components/ui/button";

interface ClinicReviewsProps {
    clinic: ClinicWithRelations;
}

export function ClinicReviews({ clinic }: ClinicReviewsProps) {
    const t = useTranslations('ClinicDetail');

    const reviews = clinic.reviews || [];

    return (
        <div className="bg-surface rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{t('reviews')}</h2>
                <Button variant="outline" size="sm">
                    {t('writeReview')}
                </Button>
            </div>

            {reviews.length === 0 ? (
                <p className="text-on-surface-variant text-center py-8">{t('noReviews')}</p>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b border-outline-variant/10 last:border-0 pb-6 last:pb-0">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant overflow-hidden">
                                        {review.user?.image ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={review.user.image} alt={review.user.name || "User"} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-on-surface">{review.user?.name || "Anonymous User"}</p>
                                        <p className="text-xs text-on-surface-variant">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded text-xs font-bold text-yellow-700 dark:text-yellow-500">
                                    <Star className="w-3 h-3 fill-current mr-1" />
                                    {review.rating}
                                </div>
                            </div>
                            {review.comment && (
                                <p className="text-on-surface-variant text-sm leading-relaxed mt-2">
                                    {review.comment}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
