"use client";

import { useSearchParams } from 'next/navigation';
import { MOCK_CLINICS } from '@/lib/constants/mock-data';
import { Button } from '@/web/components/ui/button';
import { Star, Calendar, Wallet, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids')?.split(',') || [];

  const selectedClinics = MOCK_CLINICS.filter(c => ids.includes(c.id));

  if (selectedClinics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center p-4">
        <div className="rounded-full bg-surface-container-high p-4">
            <ArrowLeft className="h-8 w-8 text-on-surface-variant" />
        </div>
        <h1 className="text-2xl font-bold text-on-surface">No clinics selected</h1>
        <p className="text-on-surface-variant max-w-md">
            Please go back to the search page and select up to 3 clinics to compare them side-by-side.
        </p>
        <Button asChild variant="filled">
          <Link href="/search">Go to Search</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
        <div className="flex items-center gap-4">
            <Button variant="outlined" size="icon" asChild>
                <Link href="/search">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
            <h1 className="text-3xl font-bold text-on-surface">Compare Clinics</h1>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-outline-variant/20 bg-surface shadow-sm">
            <table className="w-full border-collapse min-w-[800px]">
                <thead>
                    <tr className="border-b border-outline-variant/20">
                        <th className="sticky left-0 z-10 w-48 bg-surface p-6 text-left align-top text-sm font-medium text-on-surface-variant backdrop-blur-md">
                            <span className="sr-only">Clinic Info</span>
                        </th>
                        {selectedClinics.map(clinic => (
                            <th key={clinic.id} className="w-1/3 min-w-[250px] p-6 text-left align-top">
                                <div className="space-y-4">
                                    <div className="relative h-40 w-full overflow-hidden rounded-xl bg-surface-container-high">
                                        {clinic.image ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={clinic.image}
                                                alt={clinic.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-on-surface-variant/20">
                                                <MapPin className="h-12 w-12" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-on-surface">{clinic.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-on-surface-variant mt-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            <span>{clinic.city}, {clinic.province}</span>
                                        </div>
                                    </div>
                                    <Button className="w-full" variant="tonal">View Profile</Button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                    {/* Availability */}
                    <tr>
                        <th className="sticky left-0 bg-surface/95 p-6 text-left text-sm font-semibold text-on-surface backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                Availability
                            </div>
                        </th>
                        {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-6 align-top">
                                <div className={cn(
                                    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
                                    clinic.nextAvailable === "Tomorrow" || clinic.nextAvailable === "Today"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                )}>
                                    {clinic.nextAvailable}
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Rating */}
                    <tr>
                        <th className="sticky left-0 bg-surface/95 p-6 text-left text-sm font-semibold text-on-surface backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-primary" />
                                Rating & Reviews
                            </div>
                        </th>
                        {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-6 align-top">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-on-surface">{clinic.rating}</span>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={cn("h-4 w-4 fill-current", i >= Math.round(clinic.rating) && "text-outline-variant fill-none")} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-on-surface-variant">{clinic.reviewCount} verified reviews</p>

                                    {/* Visual Bar for Wait Time */}
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs text-on-surface-variant mb-1">
                                            <span>Wait Time</span>
                                            <span>{clinic.waitTime}</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: '80%' }} /* Dynamic based on inverse wait time ideally */
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Cost */}
                    <tr>
                        <th className="sticky left-0 bg-surface/95 p-6 text-left text-sm font-semibold text-on-surface backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-primary" />
                                Cost
                            </div>
                        </th>
                        {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-6 align-top">
                                <div className="space-y-1">
                                    <span className="text-lg font-medium text-on-surface">{clinic.cost}</span>
                                    <p className="text-xs text-on-surface-variant">Estimated range</p>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Specialties */}
                    <tr>
                        <th className="sticky left-0 bg-surface/95 p-6 text-left text-sm font-semibold text-on-surface backdrop-blur-sm">
                            Specialties
                        </th>
                        {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-6 align-top">
                                <div className="flex flex-wrap gap-2">
                                    {clinic.specialties?.map(s => (
                                        <span key={s} className="rounded-md bg-surface-container px-2 py-1 text-xs font-medium text-on-surface-variant">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Insurance */}
                    <tr>
                        <th className="sticky left-0 bg-surface/95 p-6 text-left text-sm font-semibold text-on-surface backdrop-blur-sm">
                            Insurance Accepted
                        </th>
                        {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-6 align-top">
                                <ul className="list-disc list-inside space-y-1 text-sm text-on-surface-variant">
                                    {clinic.insurances?.map(ins => (
                                        <li key={ins}>{ins}</li>
                                    ))}
                                </ul>
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
        <Suspense fallback={<div className="p-8 text-center">Loading comparison...</div>}>
            <CompareContent />
        </Suspense>
    );
}
