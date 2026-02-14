
import React from 'react';
import { Wallet } from 'lucide-react';

interface CostVisualizerProps {
    costRange: string;
}

export function CostVisualizer({ costRange }: CostVisualizerProps) {
    return (
        <div className="flex items-center text-on-surface font-medium bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/30">
            <Wallet className="w-4 h-4 mr-2 text-primary" />
            {costRange}
        </div>
    );
}
