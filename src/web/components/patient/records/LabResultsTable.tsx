'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/web/components/ui/card';
import { cn } from '@/lib/utils';

interface LabResult {
  id: string;
  testName: string;
  result: number;
  min: number;
  max: number;
}

const mockResults: LabResult[] = [
  { id: '1', testName: 'Hemoglobin', result: 14.5, min: 13.8, max: 17.2 },
  { id: '2', testName: 'Cholesterol (Total)', result: 190, min: 0, max: 200 },
  { id: '3', testName: 'Fasting Glucose', result: 110, min: 70, max: 99 }, // High
  { id: '4', testName: 'Vitamin D', result: 25, min: 30, max: 100 }, // Low
];

interface LabResultsTableProps {
  className?: string;
}

export function LabResultsTable({ className }: LabResultsTableProps) {
  const t = useTranslations('Patient.records');

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="p-6 border-b border-outline-variant/30">
        <h2 className="text-xl font-bold text-on-surface">{t('labResults')}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-surface-variant/30">
            <tr>
              <th className="p-4 text-sm font-bold text-on-surface-variant">{t('testName')}</th>
              <th className="p-4 text-sm font-bold text-on-surface-variant">{t('result')}</th>
              <th className="p-4 text-sm font-bold text-on-surface-variant w-[200px]">{t('normalRange')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {mockResults.map((item) => {
              // Calculate percentage for the marker
              // To handle cases where result is out of bounds visually
              const displayMin = item.min - (item.max - item.min) * 0.2; // Add 20% padding to left
              const displayMax = item.max + (item.max - item.min) * 0.2; // Add 20% padding to right

              // Map actual result to percentage within display range
              let percentage = ((item.result - displayMin) / (displayMax - displayMin)) * 100;
              percentage = Math.max(0, Math.min(100, percentage)); // Clamp between 0 and 100

              // Calculate normal range segment within the display range
              const normalStartPercent = ((item.min - displayMin) / (displayMax - displayMin)) * 100;
              const normalEndPercent = ((item.max - displayMin) / (displayMax - displayMin)) * 100;
              const normalWidthPercent = normalEndPercent - normalStartPercent;

              const isNormal = item.result >= item.min && item.result <= item.max;

              return (
                <tr key={item.id} className="hover:bg-surface-variant/10 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-on-surface">{item.testName}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "font-bold text-lg",
                      isNormal ? "text-primary" : "text-error"
                    )}>
                      {item.result}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 w-full max-w-[200px]">
                      {/* Gradient Bar Container */}
                      <div className="relative h-2 w-full rounded-full bg-surface-variant/50 overflow-hidden">
                        {/* Normal Range Highlight inside the bar */}
                        <div
                          className="absolute h-full bg-primary/40 rounded-full"
                          style={{
                            left: `${normalStartPercent}%`,
                            width: `${normalWidthPercent}%`
                          }}
                        />
                      </div>

                      {/* Marker Container (to align the triangle) */}
                      <div className="relative h-2 w-full mt-1">
                        <div
                          className="absolute top-0 -ml-[6px]" // -ml-[6px] centers the 12px wide triangle
                          style={{ left: `${percentage}%` }}
                        >
                          <div className={cn(
                            "w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent",
                            isNormal ? "border-b-on-surface" : "border-b-error"
                          )} />
                        </div>
                      </div>

                      {/* Range Text Labels */}
                      <div className="flex justify-between text-[10px] font-medium text-on-surface-variant mt-1 px-1">
                        <span>{item.min}</span>
                        <span>{item.max}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
