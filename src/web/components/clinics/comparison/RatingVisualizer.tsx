
import { Star, Clock } from 'lucide-react';

interface RatingVisualizerProps {
    rating: number;
    reviewCount: number;
    waitTime: number; // minutes
}

export function RatingVisualizer({ rating, reviewCount, waitTime }: RatingVisualizerProps) {
    // Wait time calculation: < 15min is great (green), < 30min is okay (amber), > 30min is long (red)
    let barColor = "bg-green-500";
    if (waitTime > 30) barColor = "bg-red-500";
    else if (waitTime > 15) barColor = "bg-amber-500";

    const maxWait = 60; // scale up to 60 mins
    const widthPercentage = Math.min((waitTime / maxWait) * 100, 100);

    return (
        <div className="flex flex-col gap-2 w-full">
             <div className="flex items-center gap-2">
                 <div className="flex items-center bg-surface-container px-2.5 py-1 rounded-full shadow-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1.5" />
                    <span className="font-bold text-on-surface">{rating.toFixed(1)}</span>
                 </div>
                 <span className="text-sm text-on-surface-variant">({reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1">
                <Clock className="w-3 h-3" />
                <span>Avg Wait: {waitTime} min</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                    className={`h-full ${barColor} rounded-full`}
                    style={{ width: `${widthPercentage}%` }}
                />
            </div>
        </div>
    );
}
