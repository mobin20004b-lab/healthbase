import React from 'react';
import { Card } from '@/web/components/ui/card';
import { FileText } from 'lucide-react';

export function HealthPassport() {
    return (
        <Card variant="elevated" className="p-6 h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-black text-on-surface">Health Passport</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-on-surface-variant font-medium">Blood Type</p>
                        <p className="text-xl font-bold text-on-surface">O+</p>
                    </div>
                    <div>
                        <p className="text-sm text-on-surface-variant font-medium">Allergies</p>
                        <div className="flex gap-2 mt-1">
                             <span className="text-xs bg-error-container text-on-error-container px-2 py-1 rounded-full font-medium">
                                Penicillin
                            </span>
                             <span className="text-xs bg-error-container text-on-error-container px-2 py-1 rounded-full font-medium">
                                Peanuts
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20">
                 <p className="text-xs text-on-surface-variant text-center italic">Last updated: Today</p>
            </div>
        </Card>
    );
}
