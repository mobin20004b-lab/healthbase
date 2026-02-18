"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { ClinicWithRelations } from '@/services/clinics';
import { MapPin } from 'lucide-react';
import { getClinicComparisonDetails } from './comparison/mock-data';
import AvailabilityVisualizer from './comparison/AvailabilityVisualizer';
import RatingVisualizer from './comparison/RatingVisualizer';
import CostVisualizer from './comparison/CostVisualizer';

interface CompareTableProps {
    clinics: ClinicWithRelations[];
}

export default function CompareTable({ clinics }: CompareTableProps) {
    // Memoize the augmented clinic data so we don't recalculate on every render
    const clinicsWithDetails = useMemo(() => {
        return clinics.map(clinic => ({
            ...clinic,
            details: getClinicComparisonDetails(clinic.id)
        }));
    }, [clinics]);

    if (clinics.length === 0) {
        return <div className="text-center p-10 text-on-surface-variant">No clinics selected for comparison.</div>;
    }

    const gridTemplateColumns = `200px repeat(${clinics.length}, 1fr)`;

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div
                className="grid gap-1 min-w-[800px]"
                style={{ gridTemplateColumns }}
            >
                {/* Header Row: Clinic Info */}
                <div className="font-bold text-on-surface p-4 flex items-center bg-surface/50 sticky left-0 backdrop-blur-sm z-30 border-b border-outline-variant/20">
                    Clinic
                </div>
                {clinicsWithDetails.map(clinic => (
                    <div key={clinic.id} className="p-4 flex flex-col gap-3 border-b border-outline-variant/10">
                        <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-surface-container-highest shadow-sm group">
                             {clinic.image ? (
                                <Image src={clinic.image} alt={clinic.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="300px" />
                             ) : (
                                <div className="flex items-center justify-center h-full text-on-surface-variant/30"><MapPin className="w-10 h-10"/></div>
                             )}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-primary leading-tight line-clamp-2">{clinic.name}</h3>
                            <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                                <MapPin className="w-3.5 h-3.5" /> {clinic.city}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Rating & Wait Time Row */}
                <div className="font-semibold text-on-surface-variant p-4 bg-surface-container-low/50 flex items-center sticky left-0 backdrop-blur-sm z-20 border-b border-outline-variant/20">
                    Rating & Wait
                </div>
                {clinicsWithDetails.map(clinic => (
                    <div key={clinic.id} className="p-4 bg-surface-container-low/50 flex items-center border-b border-outline-variant/10">
                         <RatingVisualizer
                            rating={clinic.averageRating}
                            reviewCount={clinic.reviewCount}
                            waitTime={clinic.details.waitTime}
                         />
                    </div>
                ))}

                {/* Availability Row */}
                <div className="font-semibold text-on-surface-variant p-4 flex items-center sticky left-0 bg-surface/50 backdrop-blur-sm z-20 border-b border-outline-variant/20">
                    Next Available
                </div>
                {clinicsWithDetails.map(clinic => (
                    <div key={clinic.id} className="p-4 flex items-center border-b border-outline-variant/10">
                        <AvailabilityVisualizer availability={clinic.details.nextAvailable} />
                    </div>
                ))}

                 {/* Cost Row */}
                <div className="font-semibold text-on-surface-variant p-4 bg-surface-container-low/50 flex items-center sticky left-0 backdrop-blur-sm z-20 border-b border-outline-variant/20">
                    Estimated Cost
                </div>
                {clinicsWithDetails.map(clinic => (
                    <div key={clinic.id} className="p-4 bg-surface-container-low/50 flex items-center border-b border-outline-variant/10">
                        <CostVisualizer level={clinic.details.costLevel} range={clinic.details.costRange} />
                    </div>
                ))}

                 {/* Services Row */}
                 <div className="font-semibold text-on-surface-variant p-4 flex items-start pt-4 sticky left-0 bg-surface/50 backdrop-blur-sm z-20 border-b border-outline-variant/20">
                    Services
                </div>
                {clinicsWithDetails.map(clinic => (
                    <div key={clinic.id} className="p-4 flex flex-wrap gap-1.5 content-start border-b border-outline-variant/10">
                        {clinic.services && clinic.services.length > 0 ? (
                            <>
                                {clinic.services.slice(0, 5).map(service => (
                                    <span key={service.id} className="text-xs bg-surface-container-high px-2 py-1 rounded-full text-on-surface-variant border border-outline-variant/20">
                                        {service.name}
                                    </span>
                                ))}
                                {clinic.services.length > 5 && (
                                     <span className="text-xs px-2 py-1 text-on-surface-variant font-medium">+{clinic.services.length - 5} more</span>
                                )}
                            </>
                        ) : (
                            <span className="text-sm text-on-surface-variant italic">No specific services listed</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
