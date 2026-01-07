
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/web/components/ui/card';

interface ActivityData {
  day: string;
  value: number; // 0-100
}

const data: ActivityData[] = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 70 },
  { day: 'Wed', value: 30 },
  { day: 'Thu', value: 85 },
  { day: 'Fri', value: 50 },
  { day: 'Sat', value: 60 },
  { day: 'Sun', value: 90 },
];

export function ActivityChart({ className }: { className?: string }) {
  const maxVal = 100;

  return (
    <Card variant="bento" className={cn("p-6 flex flex-col h-full bg-surface-container-lowest", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-on-surface">Weekly Activity</h3>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-on-surface-variant font-medium">Steps</span>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 h-48 w-full">
        {data.map((item, i) => {
          const heightPercent = (item.value / maxVal) * 100;
          return (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                {/* Tooltip-ish value */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-primary mb-1">
                    {item.value}k
                </div>
                {/* Bar */}
                <div
                    className="w-full max-w-[24px] rounded-t-lg bg-surface-variant/30 relative overflow-hidden group-hover:bg-primary/20 transition-colors"
                    style={{ height: '100%' }}
                >
                    <div
                        className="absolute bottom-0 left-0 w-full rounded-t-lg bg-primary transition-all duration-1000 ease-out m3-motion"
                        style={{ height: `${heightPercent}%` }}
                    />
                </div>
                {/* Label */}
                <span className="text-xs font-bold text-on-surface-variant/70">{item.day[0]}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
