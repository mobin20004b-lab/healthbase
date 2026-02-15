import React from 'react';
import { Wallet } from 'lucide-react';

interface CostVisualizerProps {
  costRange: string;
}

export function CostVisualizer({ costRange }: CostVisualizerProps) {
  return (
    <div className="flex items-center text-on-surface font-medium">
      <Wallet className="w-4 h-4 mr-2 text-primary" />
      {costRange}
    </div>
  );
}
