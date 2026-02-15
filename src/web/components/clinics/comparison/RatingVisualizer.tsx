import React from 'react';
import { Star, Clock } from 'lucide-react';

interface RatingVisualizerProps {
  rating: number;
  reviewCount: number;
  waitTime: number; // in minutes
}

export function RatingVisualizer({ rating, reviewCount, waitTime }: RatingVisualizerProps) {
  // Determine color based on wait time
  let waitTimeColor = 'bg-red-500';
  if (waitTime <= 15) waitTimeColor = 'bg-green-500';
  else if (waitTime <= 30) waitTimeColor = 'bg-amber-500';

  // Calculate width for the bar (max 60 mins for full bar, logical cap)
  const widthPercentage = Math.min((waitTime / 60) * 100, 100);

  return (
    <div className="flex flex-col gap-2 w-full max-w-[180px]">
      {/* Rating Row */}
      <div className="flex items-center gap-2">
         <div className="flex items-center bg-surface-container px-2.5 py-1 rounded-full shadow-sm border border-outline-variant/20">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1.5" />
            <span className="font-bold text-sm text-on-surface">{rating.toFixed(1)}</span>
         </div>
         <span className="text-xs text-on-surface-variant">({reviewCount})</span>
      </div>

      {/* Wait Time Bar */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex justify-between text-xs text-on-surface-variant">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> Wait Time</span>
            <span className="font-medium">{waitTime} min</span>
        </div>
        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full ${waitTimeColor}`}
                style={{ width: `${widthPercentage}%` }}
            />
        </div>
      </div>
    </div>
  );
}
