"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_CLINICS } from '@/lib/constants/mock-data';
import { Button } from '@/web/components/ui/button';
import { ArrowLeft, Star, Calendar, Wallet, Clock, Check, X } from 'lucide-react';
import { useRouter } from '@/routing';
import { cn } from '@/lib/utils';

function CompareContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const idsString = searchParams.get('ids');
    const ids = idsString ? idsString.split(',') : [];

    const clinics = MOCK_CLINICS.filter(c => ids.includes(c.id!));

    if (clinics.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center h-[60vh] gap-4 animate-in fade-in zoom-in duration-500">
                 <h1 className="text-2xl font-bold text-on-surface">No clinics selected</h1>
                 <p className="text-on-surface-variant">Please select clinics from the search page to compare.</p>
                 <Button onClick={() => router.push('/search')}>Go to Search</Button>
             </div>
        )
    }

    return (
        <div className="container mx-auto p-4 py-8 animate-in slide-in-from-bottom-4 duration-500">
            <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" /> Back to Search
            </Button>

            <h1 className="text-3xl font-bold mb-8 text-on-surface">Compare Clinics</h1>

            <div className="overflow-x-auto border border-outline-variant/20 rounded-2xl bg-surface shadow-sm">
                <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                        <tr>
                            <th className="p-6 text-left w-48 bg-surface-container-low sticky left-0 z-20 border-b border-r border-outline-variant/20 backdrop-blur-md">
                                <span className="text-on-surface font-bold">Features</span>
                            </th>
                            {clinics.map(clinic => (
                                <th key={clinic.id} className="p-6 text-left min-w-[250px] border-b border-r border-outline-variant/20 last:border-r-0 bg-surface/50">
                                    <div className="flex flex-col gap-3">
                                        <div className="h-24 w-full rounded-xl overflow-hidden bg-surface-container-high relative">
                                             <img src={clinic.image} alt={clinic.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-xl text-on-surface block mb-1">{clinic.name}</span>
                                            <span className="text-sm font-normal text-on-surface-variant block">{clinic.city}, {clinic.province}</span>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                        {/* Rating Row */}
                        <tr className="group hover:bg-surface-container-lowest transition-colors">
                            <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface group-hover:bg-surface-container-lowest border-r border-outline-variant/20">
                                Rating & Reviews
                            </td>
                            {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center bg-surface-container px-2.5 py-1 rounded-lg">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1.5" />
                                            <span className="font-bold text-on-surface">{clinic.rating}</span>
                                        </div>
                                        <span className="text-sm text-on-surface-variant underline decoration-dotted cursor-help">
                                            {clinic.reviewCount} reviews
                                        </span>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {/* Availability Row */}
                        <tr className="group hover:bg-surface-container-lowest transition-colors">
                            <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface group-hover:bg-surface-container-lowest border-r border-outline-variant/20">
                                Next Available
                            </td>
                             {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                                    <div className={cn(
                                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border",
                                        clinic.nextAvailable === 'Tomorrow' || clinic.nextAvailable?.includes('day')
                                            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                                            : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                                    )}>
                                        <Calendar className="h-4 w-4" />
                                        {clinic.nextAvailable}
                                    </div>
                                </td>
                            ))}
                        </tr>

                         {/* Wait Time Row (Bar Chart) */}
                         <tr className="group hover:bg-surface-container-lowest transition-colors">
                            <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface group-hover:bg-surface-container-lowest border-r border-outline-variant/20">
                                Avg. Wait Time
                            </td>
                             {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-on-surface">
                                            <Clock className="h-4 w-4 text-on-surface-variant" />
                                            <span className="font-medium">{clinic.waitTime} mins</span>
                                        </div>
                                        {/* CSS Bar */}
                                        <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden max-w-[180px]">
                                            <div
                                                className={cn("h-full rounded-full transition-all duration-1000 ease-out", clinic.waitTime! < 20 ? "bg-green-500" : "bg-amber-500")}
                                                style={{ width: `${Math.min((clinic.waitTime! / 60) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {/* Cost Row */}
                        <tr className="group hover:bg-surface-container-lowest transition-colors">
                            <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface group-hover:bg-surface-container-lowest border-r border-outline-variant/20">
                                Cost Estimate
                            </td>
                             {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                                    <div className="flex items-center gap-2">
                                        <Wallet className="h-4 w-4 text-on-surface-variant" />
                                        <span className="font-mono text-sm font-medium text-on-surface">
                                            {(clinic.cost!.min / 1000).toLocaleString()} - {(clinic.cost!.max / 1000).toLocaleString()} k
                                        </span>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {/* Insurances Row */}
                         <tr className="group hover:bg-surface-container-lowest transition-colors">
                            <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface group-hover:bg-surface-container-lowest border-r border-outline-variant/20">
                                Insurance
                            </td>
                             {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                                    <div className="flex flex-wrap gap-1.5">
                                        {clinic.insurances?.length ? clinic.insurances.map(ins => (
                                            <span key={ins} className="text-xs px-2.5 py-1 bg-surface-container text-on-surface rounded-full border border-outline-variant/20">
                                                {ins}
                                            </span>
                                        )) : <span className="text-sm text-on-surface-variant/50 italic">None</span>}
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {/* Action Row */}
                         <tr className="bg-surface-container-low">
                             <td className="p-4 sticky left-0 z-10 bg-surface-container-low border-r border-outline-variant/20"></td>
                             {clinics.map(clinic => (
                                 <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                                     <Button className="w-full rounded-xl" size="lg">Book Now</Button>
                                 </td>
                             ))}
                         </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <div className="animate-pulse text-on-surface-variant font-medium">Loading comparison...</div>
            </div>
        }>
            <CompareContent />
        </Suspense>
    );
}
