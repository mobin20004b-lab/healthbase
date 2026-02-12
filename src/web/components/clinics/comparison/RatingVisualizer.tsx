import React from 'react';
import { Star } from 'lucide-react';

interface RatingVisualizerProps {
    averageRating: number;
    reviewCount: number;
    waitTimeScore: number; // 0-100
}

export default function RatingVisualizer({ averageRating, reviewCount, waitTimeScore }: RatingVisualizerProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
                <div className="flex items-center bg-surface-container px-2.5 py-1 rounded-full shadow-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1.5" />
                    <span className="font-bold text-on-surface">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-on-surface-variant">({reviewCount} reviews)</span>
            </div>

            <div className="w-full">
                <div className="flex justify-between text-xs text-on-surface-variant mb-1">
                    <span>Wait Time Experience</span>
                    <span className="font-medium">{waitTimeScore}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${waitTimeScore}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
