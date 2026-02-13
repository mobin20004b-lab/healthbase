
import { Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CostVisualizerProps {
    cost: string; // $, $$, $$$
}

export function CostVisualizer({ cost }: CostVisualizerProps) {
    return (
        <div className="flex items-center text-on-surface font-medium">
            <Wallet className="w-4 h-4 mr-2 text-primary" />
            <div className="flex gap-0.5">
                {["$", "$$", "$$$"].map((symbol, i) => (
                    <span key={i} className={cn(
                        cost.length > i ? "text-on-surface" : "text-on-surface-variant/30"
                    )}>
                        $
                    </span>
                ))}
            </div>
        </div>
    );
}
