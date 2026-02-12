import React from 'react';
import { Wallet } from 'lucide-react';

interface CostVisualizerProps {
    costLevel: number; // 1 to 4
}

export default function CostVisualizer({ costLevel }: CostVisualizerProps) {
    const symbols = Array.from({ length: 4 }).map((_, i) => i < costLevel ? '$' : '').filter(Boolean).join('');

    let costText = 'Low';
    let textColor = 'text-green-600 dark:text-green-400';

    if (costLevel === 2) {
        costText = 'Moderate';
        textColor = 'text-amber-600 dark:text-amber-400';
    } else if (costLevel >= 3) {
        costText = 'Premium';
        textColor = 'text-red-600 dark:text-red-400';
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center text-on-surface font-medium">
                <Wallet className="w-4 h-4 mr-2 text-primary" />
                <span className="font-bold">{symbols}</span>
            </div>
            <span className={`text-xs ${textColor} font-medium`}>{costText}</span>
        </div>
    );
}
