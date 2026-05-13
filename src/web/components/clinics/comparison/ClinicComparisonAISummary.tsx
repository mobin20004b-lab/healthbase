"use client";

import React, { useMemo } from 'react';
import { ClinicWithRelations } from '@/services/clinics';
import { getClinicComparisonDetails } from './mock-data';
import { Sparkles } from 'lucide-react';

interface ClinicComparisonAISummaryProps {
    clinics: ClinicWithRelations[];
}

export default function ClinicComparisonAISummary({ clinics }: ClinicComparisonAISummaryProps) {
    const summary = useMemo(() => {
        if (clinics.length < 2) return null;

        const augmented = clinics.map(clinic => ({
            ...clinic,
            details: getClinicComparisonDetails(clinic.id)
        }));

        // Basic "AI" logic to find strengths
        let bestWaitTime = augmented[0];
        let lowestCost = augmented[0];
        let highestRated = augmented[0];

        augmented.forEach(c => {
            if (c.details.waitTime < bestWaitTime.details.waitTime) bestWaitTime = c;
            if (c.details.costLevel < lowestCost.details.costLevel) lowestCost = c;
            if ((c.averageRating || 0) > (highestRated.averageRating || 0)) highestRated = c;
        });

        const points = [];

        if (bestWaitTime.id === lowestCost.id && bestWaitTime.id === highestRated.id) {
             points.push(`**${bestWaitTime.name}** stands out as the best overall choice, offering the lowest estimated cost, shortest wait time, and highest patient rating.`);
        } else {
             if (highestRated.averageRating > 0) {
                 points.push(`**${highestRated.name}** is the most highly rated by patients.`);
             }
             if (bestWaitTime.details.waitTime < 15) {
                 points.push(`For the fastest service, **${bestWaitTime.name}** has excellent wait times.`);
             } else if (bestWaitTime.id !== highestRated.id) {
                 points.push(`**${bestWaitTime.name}** offers the shortest wait time among these options.`);
             }
             if (lowestCost.details.costLevel < 3) {
                 points.push(`**${lowestCost.name}** is the most budget-friendly option.`);
             }
        }

        return points;
    }, [clinics]);

    if (!summary || summary.length === 0) return null;

    return (
        <div className="mb-8 p-6 bg-primary-container/30 border border-primary/20 rounded-2xl relative overflow-hidden">
            <div className="absolute -top-4 -right-4 text-primary/10">
                <Sparkles className="w-24 h-24" />
            </div>
            <div className="relative z-10">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5" />
                    AI Comparison Summary
                </h2>
                <ul className="space-y-2 text-on-surface-variant">
                    {summary.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                             <span className="text-primary mt-1">•</span>
                             <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-on-surface">$1</strong>') }} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
