
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/web/components/ui/card';

interface CarePlanProps {
    progress: number; // 0-100
    title: string;
    subtitle: string;
    className?: string;
}

export function CarePlan({ progress, title, subtitle, className }: CarePlanProps) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Card variant="bento" className={cn("p-6 flex flex-col items-center justify-center bg-surface-container-lowest", className)}>
             <div className="relative flex items-center justify-center w-32 h-32 mb-4">
                 {/* Background Circle */}
                 <svg className="w-full h-full transform -rotate-90">
                     <circle
                         cx="50%"
                         cy="50%"
                         r={radius}
                         stroke="currentColor"
                         strokeWidth="8"
                         fill="transparent"
                         className="text-surface-variant/30"
                     />
                     {/* Progress Circle */}
                     <circle
                         cx="50%"
                         cy="50%"
                         r={radius}
                         stroke="currentColor"
                         strokeWidth="8"
                         fill="transparent"
                         strokeDasharray={circumference}
                         strokeDashoffset={strokeDashoffset}
                         strokeLinecap="round"
                         className="text-tertiary transition-all duration-1000 ease-out m3-motion"
                     />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                     <span className="text-2xl font-black text-on-surface">{progress}%</span>
                 </div>
             </div>
             <div className="text-center">
                 <h3 className="text-lg font-bold text-on-surface">{title}</h3>
                 <p className="text-sm text-on-surface-variant font-medium">{subtitle}</p>
             </div>
        </Card>
    );
}
