"use client";

import { useSearchParams } from 'next/navigation';
import { MOCK_CLINICS } from '@/lib/data/mock-clinics';
import { Button } from '@/web/components/ui/button';
import { Link } from '@/routing';
import { ArrowLeft, Star, Calendar, Wallet, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo, Suspense } from 'react';

function CompareContent() {
    const searchParams = useSearchParams();

    const clinics = useMemo(() => {
        const ids = searchParams.get('ids')?.split(',') || [];
        return MOCK_CLINICS.filter(c => ids.includes(c.id));
    }, [searchParams]);

    if (clinics.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h2 className="text-2xl font-bold">No clinics selected</h2>
                <Link href="/search">
                    <Button variant="outline">Back to Search</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <Link href="/search">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Search
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold mt-4">Compare Clinics</h1>
            </div>

            <div className="overflow-x-auto pb-4">
                <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                        <tr>
                            <th className="sticky left-0 bg-background z-20 w-48 p-4 text-left border-b border-outline-variant/20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                                <span className="text-on-surface-variant font-medium">Metric</span>
                            </th>
                            {clinics.map(clinic => (
                                <th key={clinic.id} className="p-4 text-left border-b border-outline-variant/20 min-w-[250px]">
                                    <div className="flex flex-col gap-3">
                                        <div className="h-40 w-full overflow-hidden rounded-xl bg-surface-container-highest relative">
                                             {clinic.image && <img src={clinic.image} alt={clinic.name} className="h-full w-full object-cover" />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{clinic.name}</h3>
                                            <p className="text-sm text-on-surface-variant">{clinic.city}</p>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Rating Row */}
                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                            <td className="sticky left-0 bg-background z-10 p-4 border-b border-outline-variant/20 font-medium text-on-surface-variant shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-primary" />
                                    Rating
                                </div>
                            </td>
                            {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 border-b border-outline-variant/20 align-top">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">{clinic.rating}</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={cn("h-4 w-4", i < Math.floor(clinic.rating || 0) ? "fill-amber-400 text-amber-400" : "text-outline-variant")} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-on-surface-variant mt-1">{clinic.reviewCount} reviews</p>
                                </td>
                            ))}
                        </tr>

                        {/* Availability Row */}
                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                            <td className="sticky left-0 bg-background z-10 p-4 border-b border-outline-variant/20 font-medium text-on-surface-variant shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    Availability
                                </div>
                            </td>
                             {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 border-b border-outline-variant/20 align-top">
                                    <span className={cn(
                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                        clinic.availability === 'Tomorrow' ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                    )}>
                                        {clinic.availability}
                                    </span>
                                </td>
                            ))}
                        </tr>

                        {/* Wait Time Row (Bar Chart) */}
                         <tr className="hover:bg-surface-container-low/50 transition-colors">
                            <td className="sticky left-0 bg-background z-10 p-4 border-b border-outline-variant/20 font-medium text-on-surface-variant shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    Wait Time
                                </div>
                            </td>
                             {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 border-b border-outline-variant/20 align-top">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Average</span>
                                            <span className="font-medium">{clinic.waitTime} days</span>
                                        </div>
                                        {/* Bar chart visualization */}
                                        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${Math.min(((clinic.waitTime || 0) / 30) * 100, 100)}%` }} // Assume 30 days max for scale
                                            />
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>

                         {/* Cost Row */}
                         <tr className="hover:bg-surface-container-low/50 transition-colors">
                            <td className="sticky left-0 bg-background z-10 p-4 border-b border-outline-variant/20 font-medium text-on-surface-variant shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                                <div className="flex items-center gap-2">
                                    <Wallet className="h-4 w-4 text-primary" />
                                    Cost Range
                                </div>
                            </td>
                             {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 border-b border-outline-variant/20 align-top">
                                    <div className="text-lg font-medium">{clinic.cost}</div>
                                </td>
                            ))}
                        </tr>

                        {/* Actions Row */}
                        <tr>
                            <td className="sticky left-0 bg-background z-10 p-4 font-medium text-on-surface-variant shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                            </td>
                            {clinics.map(clinic => (
                                <td key={clinic.id} className="p-4 align-top">
                                    <Button className="w-full">Book Now</Button>
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
        <Suspense fallback={<div className="container mx-auto py-8 text-center text-on-surface-variant">Loading comparison...</div>}>
            <CompareContent />
        </Suspense>
    );
}
