
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvailabilityVisualizerProps {
    availability: string;
}

export function AvailabilityVisualizer({ availability }: AvailabilityVisualizerProps) {
    const isSoon = availability === "Tomorrow" || availability === "In 2 days";
    return (
        <div className={cn(
            "flex items-center px-2.5 py-1 rounded-md text-sm font-medium w-fit",
            isSoon
                ? "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                : "text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
        )}>
            <Calendar className="w-4 h-4 mr-1.5" />
            {availability}
        </div>
    );
}
