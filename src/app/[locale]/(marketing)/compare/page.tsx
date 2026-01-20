"use client";

import { useSearchParams } from 'next/navigation';
import { MOCK_CLINICS } from '@/lib/constants/mock-data';
import { Button } from '@/web/components/ui/button';
import { Card } from '@/web/components/ui/card';
import { Star, Clock, Wallet, Check, X, ArrowLeft } from 'lucide-react';
import { useRouter } from '@/routing';
import { cn } from '@/lib/utils';
import type { Clinic } from '@prisma/client';
import { Suspense } from 'react';

// Sub-component to handle search params
function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ids = searchParams.get('ids')?.split(',') || [];

  const clinics = MOCK_CLINICS.filter((c) => ids.includes(c.id!));

  if (clinics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold text-on-surface">No clinics selected</h2>
        <Button onClick={() => router.push('/search')}>Go to Search</Button>
      </div>
    );
  }

  // Helper to format currency
  const formatMoney = (amount: number, currency: string) => {
      return new Intl.NumberFormat('fa-IR', { style: 'currency', currency: currency }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-3xl font-bold text-on-surface">Compare Clinics</h1>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-background z-10 w-48 p-4 text-left border-b border-outline-variant/20">
                <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Features</span>
              </th>
              {clinics.map((clinic) => (
                <th key={clinic.id} className="p-4 text-left border-b border-outline-variant/20 min-w-[250px]">
                    <div className="space-y-3">
                        <div className="h-32 w-full overflow-hidden rounded-xl bg-surface-container-highest">
                             <img src={clinic.image || ''} alt={clinic.name || ''} className="h-full w-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-on-surface">{clinic.name}</h3>
                        <p className="text-sm text-on-surface-variant">{clinic.city}, {clinic.country}</p>
                        <Button className="w-full" variant="filled" size="sm">Book Now</Button>
                    </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {/* Rating Row */}
            <tr>
              <td className="sticky left-0 bg-background z-10 p-4 font-semibold text-on-surface">
                  <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      Rating
                  </div>
              </td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-on-surface">{clinic.rating}</span>
                        <div className="flex flex-col">
                             <div className="flex">
                                 {[1, 2, 3, 4, 5].map((star) => (
                                     <Star
                                        key={star}
                                        className={cn(
                                            "h-4 w-4",
                                            star <= Math.round(clinic.rating!) ? "fill-yellow-400 text-yellow-400" : "text-outline-variant"
                                        )}
                                     />
                                 ))}
                             </div>
                             <span className="text-xs text-on-surface-variant">{clinic.reviewCount} reviews</span>
                        </div>
                    </div>
                </td>
              ))}
            </tr>

            {/* Availability Row */}
            <tr>
              <td className="sticky left-0 bg-background z-10 p-4 font-semibold text-on-surface">
                  <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Availability
                  </div>
              </td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4">
                    <div className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                        clinic.nextAvailable === "Tomorrow" || clinic.nextAvailable === "Today"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                        {clinic.nextAvailable}
                    </div>
                    <div className="mt-2 text-sm text-on-surface-variant">
                        Wait time: <span className="font-bold text-on-surface">{clinic.waitTime}</span>
                    </div>
                </td>
              ))}
            </tr>

            {/* Cost Row */}
            <tr>
              <td className="sticky left-0 bg-background z-10 p-4 font-semibold text-on-surface">
                  <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      Cost (Est.)
                  </div>
              </td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4">
                    <div className="space-y-1">
                         <div className="text-sm text-on-surface-variant">Range:</div>
                         <div className="font-bold text-on-surface">
                             {formatMoney(clinic.cost!.min, clinic.cost!.currency)} - {formatMoney(clinic.cost!.max, clinic.cost!.currency)}
                         </div>
                    </div>
                </td>
              ))}
            </tr>

            {/* Insurance Row */}
            <tr>
              <td className="sticky left-0 bg-background z-10 p-4 font-semibold text-on-surface">Insurance</td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4 align-top">
                    <div className="flex flex-wrap gap-2">
                        {clinic.insurances?.map((ins) => (
                            <span key={ins} className="px-2 py-1 rounded-md bg-surface-container-high text-xs text-on-surface-variant">
                                {ins}
                            </span>
                        ))}
                    </div>
                </td>
              ))}
            </tr>

            {/* Services Row */}
             <tr>
              <td className="sticky left-0 bg-background z-10 p-4 font-semibold text-on-surface">Services</td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4 align-top">
                    <ul className="space-y-1">
                        {clinic.serviceCategories?.map((cat) => (
                            <li key={cat} className="flex items-center gap-2 text-sm text-on-surface-variant">
                                <Check className="h-4 w-4 text-primary" />
                                {cat}
                            </li>
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
