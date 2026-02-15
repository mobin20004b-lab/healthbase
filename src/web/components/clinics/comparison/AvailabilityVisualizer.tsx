import React from 'react';
import { Calendar } from 'lucide-react';

interface AvailabilityVisualizerProps {
  availability: string;
}

export function AvailabilityVisualizer({ availability }: AvailabilityVisualizerProps) {
  const isAvailableSoon = availability === 'Tomorrow' || availability === 'In 2 days';

  // Use Tailwind classes for styling based on availability
  const colorClass = isAvailableSoon
    ? 'text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
    : 'text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400';

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${colorClass}`}>
      <Calendar className="w-4 h-4 mr-1.5" />
      {availability}
    </div>
  );
}
