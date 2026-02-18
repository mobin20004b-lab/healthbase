
import React from 'react';
import { Wallet } from 'lucide-react';

interface CostVisualizerProps {
    level: number;
    range: string;
}

export default function CostVisualizer({ level, range }: CostVisualizerProps) {
    const renderDollarSigns = () => {
        const signs = [];
        for (let i = 1; i <= 4; i++) {
            signs.push(
                <span key={i} className={i <= level ? "text-primary font-bold" : "text-on-surface-variant/30"}>
                    $
                </span>
            );
        }
        return signs;
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center text-lg">
                <Wallet className="w-4 h-4 mr-2 text-on-surface-variant" />
                <div className="flex tracking-widest">
                    {renderDollarSigns()}
                </div>
            </div>
            <span className="text-xs text-on-surface-variant font-medium ml-6">
                {range}
            </span>
        </div>
    );
}
