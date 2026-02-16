
import React from 'react';
import { Star } from 'lucide-react';

interface RatingVisualizerProps {
    rating: number;
    reviewCount: number;
    waitTime: number;
}

export default function RatingVisualizer({ rating, reviewCount, waitTime }: RatingVisualizerProps) {
    // Wait time logic
    const maxWait = 60;
    const percentage = Math.min((waitTime / maxWait) * 100, 100);

    let barColor = "bg-green-500";
    if (waitTime > 15) barColor = "bg-amber-500";
    if (waitTime > 30) barColor = "bg-red-500";

    return (
        <div className="flex flex-col gap-2 w-full">
             {/* Rating */}
             <div className="flex items-center gap-2">
                 <div className="flex items-center bg-surface-container px-2.5 py-1 rounded-full shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1.5" />
                    <span className="font-bold text-on-surface text-sm">{rating.toFixed(1)}</span>
                 </div>
                 <span className="text-xs text-on-surface-variant">({reviewCount} reviews)</span>
            </div>

            {/* Wait Time Bar */}
            <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant font-medium">Avg. Wait</span>
                    <span className={`font-bold ${waitTime > 30 ? 'text-red-600' : 'text-primary'}`}>
                        ~{waitTime} min
                    </span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
