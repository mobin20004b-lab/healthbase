import React from 'react';
import { Calendar } from 'lucide-react';

interface AvailabilityVisualizerProps {
    availability: string;
    color: 'green' | 'amber' | 'red';
}

export default function AvailabilityVisualizer({ availability, color }: AvailabilityVisualizerProps) {
    let bgColor = 'bg-green-100 dark:bg-green-900/30';
    let textColor = 'text-green-700 dark:text-green-400';

    if (color === 'amber') {
        bgColor = 'bg-amber-100 dark:bg-amber-900/30';
        textColor = 'text-amber-700 dark:text-amber-400';
    } else if (color === 'red') {
        bgColor = 'bg-red-100 dark:bg-red-900/30';
        textColor = 'text-red-700 dark:text-red-400';
    }

    return (
        <div className={`flex items-center ${bgColor} ${textColor} px-2.5 py-1 rounded-md text-sm font-medium`}>
            <Calendar className="w-4 h-4 mr-1.5" />
            {availability}
        </div>
    );
}
