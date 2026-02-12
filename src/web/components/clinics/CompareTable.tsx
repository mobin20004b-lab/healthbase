"use client";

import React from 'react';
import Image from 'next/image';
import { ClinicWithRelations } from '@/services/clinics';
import { MapPin } from 'lucide-react';
import AvailabilityVisualizer from '@/web/components/clinics/comparison/AvailabilityVisualizer';
import RatingVisualizer from '@/web/components/clinics/comparison/RatingVisualizer';
import CostVisualizer from '@/web/components/clinics/comparison/CostVisualizer';
import { getClinicComparisonDetails } from '@/web/components/clinics/comparison/mock-data';

interface CompareTableProps {
    clinics: ClinicWithRelations[];
}

export default function CompareTable({ clinics }: CompareTableProps) {
    if (clinics.length === 0) {
        return <div className="text-center p-10 text-on-surface-variant">No clinics selected for comparison.</div>;
    }

    // Prepare enriched data with mock comparison details
    const enrichedClinics = clinics.map(clinic => ({
        ...clinic,
        details: getClinicComparisonDetails(clinic.id)
    }));

    const gridTemplateColumns = `200px repeat(${clinics.length}, minmax(280px, 1fr))`;

    return (
        <div className="w-full border border-outline-variant/20 rounded-3xl overflow-hidden shadow-sm bg-surface">
            <div className="overflow-auto max-h-[80vh] custom-scrollbar">
                <div
                    className="grid"
                    style={{ gridTemplateColumns }}
                >
                    {/* --- Row 1: Clinic Headers --- */}

                    {/* Top-Left Sticky Cell */}
                    <div className="p-4 flex items-center font-bold text-on-surface bg-surface sticky top-0 left-0 z-30 border-b border-r border-outline-variant/20 shadow-[4px_4px_10px_rgba(0,0,0,0.05)]">
                        Clinic
                    </div>

                    {/* Clinic Columns Sticky Header */}
                    {enrichedClinics.map(clinic => (
                        <div key={clinic.id} className="p-4 flex flex-col gap-3 bg-surface sticky top-0 z-20 border-b border-outline-variant/20 shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
                            <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-surface-container-highest shadow-sm">
                                {clinic.image ? (
                                    <Image src={clinic.image} alt={clinic.name} fill className="object-cover" sizes="300px" />
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


                    {/* --- Row 2: Rating --- */}
                    <div className="p-4 font-semibold text-on-surface-variant bg-surface sticky left-0 z-10 border-r border-b border-outline-variant/20">
                        Patient Rating
                    </div>
                    {enrichedClinics.map(clinic => (
                        <div key={`rating-${clinic.id}`} className="p-4 flex items-center border-b border-outline-variant/10">
                            <RatingVisualizer
                                averageRating={clinic.averageRating}
                                reviewCount={clinic.reviewCount}
                                waitTimeScore={clinic.details.waitTimeScore}
                            />
                        </div>
                    ))}

                    {/* --- Row 3: Availability --- */}
                    <div className="p-4 font-semibold text-on-surface-variant bg-surface sticky left-0 z-10 border-r border-b border-outline-variant/20">
                        Next Available
                    </div>
                    {enrichedClinics.map(clinic => (
                        <div key={`avail-${clinic.id}`} className="p-4 flex items-center border-b border-outline-variant/10">
                            <AvailabilityVisualizer
                                availability={clinic.details.availability}
                                color={clinic.details.availabilityColor}
                            />
                        </div>
                    ))}

                    {/* --- Row 4: Cost --- */}
                    <div className="p-4 font-semibold text-on-surface-variant bg-surface sticky left-0 z-10 border-r border-b border-outline-variant/20">
                        Estimated Cost
                    </div>
                    {enrichedClinics.map(clinic => (
                        <div key={`cost-${clinic.id}`} className="p-4 flex items-center border-b border-outline-variant/10">
                            <CostVisualizer costLevel={clinic.details.costLevel} />
                        </div>
                    ))}

                     {/* --- Row 5: Services --- */}
                    <div className="p-4 font-semibold text-on-surface-variant bg-surface sticky left-0 z-10 border-r border-outline-variant/20">
                        Services
                    </div>
                    {enrichedClinics.map(clinic => (
                        <div key={`services-${clinic.id}`} className="p-4 flex flex-wrap gap-1.5 content-start">
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
        </div>
    );
}
