
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/web/components/ui/card';
import { Check } from 'lucide-react';

interface Medication {
    id: string;
    name: string;
    dosage: string;
    time: string;
    taken: boolean;
}

const initialMeds: Medication[] = [
    { id: '1', name: 'Lisinopril', dosage: '10mg', time: '08:00 AM', taken: true },
    { id: '2', name: 'Metformin', dosage: '500mg', time: '01:00 PM', taken: false },
    { id: '3', name: 'Atorvastatin', dosage: '20mg', time: '09:00 PM', taken: false },
];

export function MedicationTracker({ className }: { className?: string }) {
    const [meds, setMeds] = useState(initialMeds);

    const toggleMed = (id: string) => {
        // Haptic feedback if available
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(20);
        }

        setMeds(meds.map(med =>
            med.id === id ? { ...med, taken: !med.taken } : med
        ));
    };

    return (
        <Card variant="bento" className={cn("p-6 bg-surface-container-lowest flex flex-col h-full", className)}>
            <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-on-surface">Medications</h3>
                 <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">
                     {meds.filter(m => m.taken).length}/{meds.length} Taken
                 </span>
            </div>

            <div className="space-y-3">
                {meds.map((med) => (
                    <div
                        key={med.id}
                        onClick={() => toggleMed(med.id)}
                        className={cn(
                            "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 group m3-motion",
                            med.taken
                                ? "bg-primary/5 border-primary/20"
                                : "bg-surface border-outline-variant/30 hover:border-primary/50"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-6 h-6 rounded-md m3-shape-squircle flex items-center justify-center border transition-all duration-200",
                                med.taken
                                    ? "bg-primary border-primary"
                                    : "border-on-surface-variant/40 group-hover:border-primary"
                            )}>
                                {med.taken && <Check className="w-4 h-4 text-on-primary" />}
                            </div>
                            <div>
                                <div className={cn("font-bold text-sm", med.taken ? "text-primary line-through opacity-70" : "text-on-surface")}>
                                    {med.name}
                                </div>
                                <div className="text-xs text-on-surface-variant font-medium">
                                    {med.dosage} • {med.time}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
