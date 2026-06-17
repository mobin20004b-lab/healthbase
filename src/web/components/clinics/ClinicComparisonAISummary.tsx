"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Card } from '@/web/components/ui/card';
import { ClinicWithRelations } from '@/services/clinics';

interface ClinicComparisonAISummaryProps {
    clinics: ClinicWithRelations[];
}

export default function ClinicComparisonAISummary({ clinics }: ClinicComparisonAISummaryProps) {
    if (clinics.length < 2) return null;

    // Hardcoded mock insights based on index
    const generateInsights = () => {
        const insights = [];
        if (clinics[0]) {
            insights.push(
                <>
                    <strong className="text-primary">{clinics[0].name}</strong> generally shows the strongest patient satisfaction and shortest average wait times based on recent community feedback.
                </>
            );
        }
        if (clinics[1]) {
            insights.push(
                <>
                    <strong className="text-primary">{clinics[1].name}</strong> offers the most competitive estimated cost and the quickest next-available appointment among your selections.
                </>
            );
        }
        if (clinics.length > 2 && clinics[2]) {
            insights.push(
                <>
                    <strong className="text-primary">{clinics[2].name}</strong> provides the widest array of specialized services, though you may need to book further in advance.
                </>
            );
        }
        return insights;
    };

    const mockInsights = generateInsights();

    return (
        <Card variant="filled" className="mb-8 overflow-hidden bg-primary/5 border border-primary/20 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
            <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary-container text-on-primary-container p-2 rounded-xl">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-on-surface">AI Summary</h2>
                    <span className="text-xs bg-surface-container-high px-2 py-1 rounded-full text-on-surface-variant ml-2 border border-outline-variant/20">Beta</span>
                </div>

                <p className="text-on-surface-variant mb-6 font-medium">
                    Based on verified reviews, wait times, and cost estimates, here is a quick comparison of your selected clinics:
                </p>

                <div className="space-y-4">
                    {mockInsights.map((insight, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                                {index + 1}
                            </div>
                            <p className="text-on-surface leading-relaxed text-sm md:text-base">
                                {insight}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/10 text-xs text-on-surface-variant/70 flex justify-between items-center">
                    <span>AI-generated summaries are for informational purposes only.</span>
                    <button className="text-primary hover:underline font-medium">Why is this recommended?</button>
                </div>
            </div>
        </Card>
    );
}
