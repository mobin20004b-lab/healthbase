import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/web/components/ui/card';
import { Activity, ShieldAlert, Droplet } from 'lucide-react';

interface HealthPassportProps {
    bloodType: string;
    allergies: string[];
    chronicConditions: string[];
}

export function HealthPassport({ bloodType, allergies, chronicConditions }: HealthPassportProps) {
    const t = useTranslations('PatientRecords');

    return (
        <Card variant="default" className="h-full">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                    <Activity className="w-6 h-6 text-primary" />
                    {t('healthPassportTitle')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-error/10 text-error mt-1">
                            <Droplet className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wide">
                                {t('bloodType')}
                            </h4>
                            <p className="text-lg font-black text-on-surface">
                                {bloodType}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-amber-500/10 text-amber-600 mt-1">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wide">
                                {t('allergies')}
                            </h4>
                            {allergies.length > 0 ? (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {allergies.map((allergy, index) => (
                                        <span key={index} className="px-3 py-1 bg-surface-container-high rounded-full text-sm font-medium text-on-surface">
                                            {allergy}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-on-surface-variant mt-2">None</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wide">
                                {t('chronicConditions')}
                            </h4>
                            {chronicConditions.length > 0 ? (
                                <ul className="list-disc list-inside text-sm text-on-surface mt-2 space-y-1">
                                    {chronicConditions.map((condition, index) => (
                                        <li key={index} className="font-medium">{condition}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-on-surface-variant mt-2">None</p>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
