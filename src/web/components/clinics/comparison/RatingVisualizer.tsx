
import React from 'react';
import { Star } from 'lucide-react';

interface RatingVisualizerProps {
    rating: number;
    reviewCount: number;
    waitTime: number; // in minutes
}

export function RatingVisualizer({ rating, reviewCount, waitTime }: RatingVisualizerProps) {
    let barColor = 'bg-error dark:bg-red-400'; // Default Red > 30
    if (waitTime <= 15) {
        barColor = 'bg-green-600 dark:bg-green-400';
    } else if (waitTime <= 30) {
        barColor = 'bg-amber-500 dark:bg-amber-400';
    }

    // Assuming 60 mins is max for the bar visualization purpose
    const widthPercentage = Math.min((waitTime / 60) * 100, 100);

    return (
        <div className="flex flex-col gap-2 w-full">
            {/* Rating Section */}
            <div className="flex items-center gap-2">
                 <div className="flex items-center bg-surface-container px-2.5 py-1 rounded-full shadow-sm border border-outline-variant/20">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1.5" />
                    <span className="font-bold text-on-surface text-sm">{rating.toFixed(1)}</span>
                 </div>
                 <span className="text-xs text-on-surface-variant">({reviewCount} reviews)</span>
            </div>

            {/* Wait Time Bar */}
            <div className="w-full mt-1">
                <div className="flex justify-between text-xs text-on-surface-variant mb-1">
                    <span>Avg. Wait</span>
                    <span className="font-medium text-on-surface">{waitTime} min</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${barColor}`}
                        style={{ width: `${widthPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
