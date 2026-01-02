
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Card } from '@/web/components/ui/card';
import { } from 'next-intl';

interface ReviewFormProps {
    clinicId: string;
}

export function ReviewForm({ clinicId }: ReviewFormProps) {
    // const t = useTranslations('ClinicDetail'); // unused
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clinicId,
                    rating,
                    comment,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit review');
            }

            setSuccess(true);
            setTimeout(() => {
                router.push(`/clinics/${clinicId}`);
                router.refresh();
            }, 2000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <Card className="p-8 text-center bg-primary-container text-on-primary-container rounded-[var(--radius-2xl)]">
                <h3 className="text-2xl font-black mb-4">Thank you!</h3>
                <p className="font-bold">Your review has been submitted and is pending moderation.</p>
            </Card>
        );
    }

    return (
        <Card variant="bento" className="p-8 bg-surface-container-low border-outline-variant/20">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label className="block text-sm font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">
                        Rating
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="transition-transform hover:scale-125 focus:outline-none"
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setRating(star)}
                            >
                                <Star
                                    className={`h-10 w-10 ${star <= (hover || rating)
                                            ? 'text-primary fill-primary'
                                            : 'text-outline-variant/30'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">
                        Comment (Optional)
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full min-h-[150px] p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-on-surface resize-none"
                        placeholder="Share your experience..."
                    />
                </div>

                {error && (
                    <p className="text-error font-bold bg-error-container/20 p-4 rounded-xl text-center">
                        {error}
                    </p>
                )}

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="tonal"
                        className="rounded-2xl font-black px-8"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-2xl font-black px-10 shadow-xl shadow-primary/20"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
