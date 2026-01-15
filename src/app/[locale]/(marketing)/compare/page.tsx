"use client";

import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/routing';
import { MOCK_CLINICS } from '@/lib/data/mock-clinics';
import { Button } from '@/web/components/ui/button';
import { Card } from '@/web/components/ui/card';
import { ArrowLeft, Star, MapPin, Wallet, Clock, Calendar, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Clinic } from '@prisma/client';

export default function ComparePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const ids = searchParams.get('ids')?.split(',') || [];

    const clinics = MOCK_CLINICS.filter(c => ids.includes(c.id));

    if (clinics.length < 2) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
                <h1 className="text-2xl font-bold mb-4">Select clinics to compare</h1>
                <p className="text-on-surface-variant mb-6">Please go back and select at least 2 clinics.</p>
                <Button onClick={() => router.push('/search')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Search
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:py-8 lg:px-8 max-w-7xl">
            <div className="mb-6 flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold text-on-surface">Compare Clinics</h1>
            </div>

            <div className="overflow-x-auto pb-6">
                <div className="min-w-[800px]">
                    {/* Header Row (Sticky) */}
                    <div className="sticky top-0 z-10 grid grid-cols-[200px_repeat(3,1fr)] gap-4 pb-4">
                        <div className="flex items-end pb-2 font-bold text-lg text-on-surface-variant">
                            Attributes
                        </div>
                        {clinics.map((clinic) => (
                            <Card key={clinic.id} className="p-4 flex flex-col items-center text-center relative overflow-hidden bg-surface-container/90 backdrop-blur border-none shadow-md">
                                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-surface-variant">
                                    {clinic.image ? (
                                        <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <MapPin className="w-8 h-8 m-auto text-on-surface-variant/50" />
                                    )}
                                </div>
                                <h3 className="font-bold text-on-surface line-clamp-2 min-h-[3rem]">{clinic.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-1 mb-3">
                                    <MapPin className="h-3 w-3" />
                                    {clinic.city}
                                </div>
                                <Button className="w-full text-xs h-8" size="sm">
                                    Book Now
                                </Button>
                            </Card>
                        ))}
                    </div>

                    {/* Comparison Rows */}
                    <div className="space-y-4">
                        {/* Rating */}
                        <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-4 items-center p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                            <div className="font-semibold text-on-surface-variant flex items-center gap-2">
                                <Star className="h-4 w-4" /> Rating
                            </div>
                            {clinics.map(clinic => (
                                <div key={clinic.id} className="text-center">
                                    <div className="flex items-center justify-center gap-2 font-bold text-lg">
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        {clinic.rating?.toFixed(1)}
                                    </div>
                                    <div className="text-xs text-on-surface-variant">{clinic.reviewCount} reviews</div>
                                    {/* Simple Bar Chart Visualizer */}
                                    <div className="mt-2 h-1.5 w-full bg-surface-variant rounded-full overflow-hidden max-w-[120px] mx-auto">
                                        <div
                                            className="h-full bg-yellow-400 rounded-full"
                                            style={{ width: `${((clinic.rating || 0) / 5) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Availability */}
                        <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-4 items-center p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                            <div className="font-semibold text-on-surface-variant flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Next Available
                            </div>
                            {clinics.map(clinic => (
                                <div key={clinic.id} className="text-center">
                                    <span className={cn(
                                        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                                        clinic.nextAvailable === 'Tomorrow' || clinic.nextAvailable === 'Today'
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                    )}>
                                        {clinic.nextAvailable}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Cost */}
                        <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-4 items-center p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                            <div className="font-semibold text-on-surface-variant flex items-center gap-2">
                                <Wallet className="h-4 w-4" /> Price Range
                            </div>
                            {clinics.map(clinic => (
                                <div key={clinic.id} className="text-center flex flex-col items-center gap-1">
                                    <span className="font-mono text-lg font-bold text-on-surface">{clinic.priceRange}</span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3].map(i => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "w-4 h-1.5 rounded-full",
                                                    i <= (clinic.priceRange?.length || 0)
                                                        ? "bg-primary"
                                                        : "bg-surface-variant"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Wait Time */}
                        <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-4 items-center p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                            <div className="font-semibold text-on-surface-variant flex items-center gap-2">
                                <Clock className="h-4 w-4" /> Avg. Wait Time
                            </div>
                            {clinics.map(clinic => (
                                <div key={clinic.id} className="text-center">
                                    <span className="font-medium text-on-surface">{clinic.waitTime}</span>
                                </div>
                            ))}
                        </div>

                         {/* Specialties */}
                         <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-4 items-start p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                            <div className="font-semibold text-on-surface-variant flex items-center gap-2 pt-1">
                                <Check className="h-4 w-4" /> Specialties
                            </div>
                            {clinics.map(clinic => (
                                <div key={clinic.id} className="text-center">
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {clinic.specialties?.map(s => (
                                            <span key={s} className="text-xs px-2 py-0.5 bg-surface-variant rounded text-on-surface-variant">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                         {/* Insurances */}
                         <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-4 items-start p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                            <div className="font-semibold text-on-surface-variant flex items-center gap-2 pt-1">
                                <Check className="h-4 w-4" /> Insurance
                            </div>
                            {clinics.map(clinic => (
                                <div key={clinic.id} className="text-center">
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {clinic.insurances?.map(i => (
                                            <span key={i} className="text-xs px-2 py-0.5 bg-surface-variant rounded text-on-surface-variant">{i}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
