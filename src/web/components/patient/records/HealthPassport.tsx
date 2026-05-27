import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/web/components/ui/card';
import { Droplet, AlertTriangle, HeartPulse, User } from 'lucide-react';

interface HealthPassportProps {
    bloodType: string;
    allergies: string[];
    majorConditions: string[];
    emergencyContact: {
        name: string;
        phone: string;
        relation: string;
    };
}

export function HealthPassport({ bloodType, allergies, majorConditions, emergencyContact }: HealthPassportProps) {
    return (
        <Card variant="elevated" className="border-l-4 border-l-primary overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
                <div className="flex items-center gap-2">
                    <User className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">Health Passport</CardTitle>
                </div>
                <p className="text-sm text-on-surface-variant">Critical emergency data</p>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Blood Type */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-error">
                            <Droplet className="w-5 h-5 fill-current" />
                            <span className="font-bold uppercase tracking-wider text-xs">Blood Type</span>
                        </div>
                        <div className="text-2xl font-black text-on-surface">{bloodType}</div>
                    </div>

                    {/* Allergies */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-warning">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-xs text-on-surface-variant">Allergies</span>
                        </div>
                        {allergies.length > 0 ? (
                            <ul className="list-disc list-inside text-sm font-medium text-on-surface">
                                {allergies.map((allergy, i) => (
                                    <li key={i}>{allergy}</li>
                                ))}
                            </ul>
                        ) : (
                            <span className="text-sm text-on-surface-variant italic">None reported</span>
                        )}
                    </div>

                    {/* Conditions */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary">
                            <HeartPulse className="w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-xs text-on-surface-variant">Conditions</span>
                        </div>
                        {majorConditions.length > 0 ? (
                            <ul className="list-disc list-inside text-sm font-medium text-on-surface">
                                {majorConditions.map((condition, i) => (
                                    <li key={i}>{condition}</li>
                                ))}
                            </ul>
                        ) : (
                            <span className="text-sm text-on-surface-variant italic">None reported</span>
                        )}
                    </div>

                    {/* Emergency Contact */}
                    <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-outline-variant/30 pt-4 md:pt-0 md:pl-6">
                        <div className="flex items-center gap-2">
                            <span className="font-bold uppercase tracking-wider text-xs text-on-surface-variant">Emergency Contact</span>
                        </div>
                        <div className="text-sm font-bold text-on-surface">{emergencyContact.name}</div>
                        <div className="text-sm text-on-surface-variant">{emergencyContact.relation}</div>
                        <div className="text-sm text-primary font-medium mt-1">{emergencyContact.phone}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
