
'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { useRouter } from '@/routing';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface FavoriteButtonProps {
    clinicId: string;
    initialIsFavorited?: boolean;
    showLabel?: boolean;
    className?: string;
}

export function FavoriteButton({
    clinicId,
    initialIsFavorited = false,
    showLabel = false,
    className
}: FavoriteButtonProps) {
    const t = useTranslations('ClinicDetail');
    const router = useRouter();
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const [isLoading, setIsLoading] = useState(false);

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoading) return;

        setIsLoading(true);
        try {
            const res = await fetch('/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clinicId }),
            });

            if (res.status === 401) {
                toast.error('Please login to save clinics');
                router.push('/auth/login');
                return;
            }

            if (!res.ok) {
                throw new Error('Failed to toggle favorite');
            }

            const data = await res.json();
            setIsFavorited(data.favorited);

            if (data.favorited) {
                toast.success('Added to favorites');
            } else {
                toast.info('Removed from favorites');
            }

            router.refresh();
        } catch (error) {
            console.error('Favorite Toggle Error:', error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant={isFavorited ? "tonal" : "outline"}
            size={showLabel ? "lg" : "icon"}
            onClick={toggleFavorite}
            disabled={isLoading}
            className={cn(
                "rounded-full transition-all duration-300",
                isFavorited && "text-primary border-primary bg-primary/10",
                !isFavorited && "text-on-surface-variant",
                showLabel && "gap-3 px-6 h-14 font-black shadow-lg",
                className
            )}
        >
            <Heart
                className={cn(
                    "h-6 w-6 transition-all duration-300",
                    isFavorited && "fill-primary scale-110",
                    isLoading && "animate-pulse"
                )}
            />
            {showLabel && (isFavorited ? t('saved') : t('save'))}
        </Button>
    );
}
