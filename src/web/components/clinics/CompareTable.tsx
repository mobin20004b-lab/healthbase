"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Star, MapPin, Calendar, Wallet, Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/web/components/ui/button";
import { Link } from "@/routing";
import type { Clinic, Service } from "@prisma/client";

// Extended type based on API response
export interface ComparableClinic extends Clinic {
  averageRating: number;
  services: Service[];
  isVerified: boolean;
  // Next available is not in DB yet, will mock
}

interface CompareTableProps {
  clinics: ComparableClinic[];
}

export function CompareTable({ clinics }: CompareTableProps) {
  const t = useTranslations("Clinics"); // Assuming translation namespace
  // Use "Search" or "Common" if "Clinics" lacks specific keys, but we'll stick to generic or defined ones.
  // Actually, I'll use hardcoded fallbacks or simple keys.

  if (clinics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-on-surface-variant mb-4">No clinics selected for comparison.</p>
        <Link href="/search">
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-outline-variant/50 bg-surface shadow-sm">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-20 w-48 bg-surface-container-high p-4 text-left font-bold text-on-surface shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
              <span className="sr-only">Features</span>
            </th>
            {clinics.map((clinic) => (
              <th key={clinic.id} className="min-w-[280px] p-4 align-top">
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-surface-container-highest">
                    {clinic.image ? (
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
                    {clinic.isVerified && (
                      <div className="absolute right-2 top-2 rounded-full bg-primary-container p-1 text-on-primary-container shadow-sm">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <Link href={`/clinics/${clinic.id}`} className="hover:underline">
                        <h3 className="text-xl font-bold text-on-surface">{clinic.name}</h3>
                    </Link>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {clinic.city || "Unknown"}, {clinic.country}
                    </p>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {/* Rating Row */}
          <tr>
            <th className="sticky left-0 z-10 bg-surface-container-low p-4 text-left text-sm font-bold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
              Rating & Reviews
            </th>
            {clinics.map((clinic) => (
              <td key={clinic.id} className="p-4 align-top">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-md bg-yellow-100 px-2 py-0.5 text-sm font-bold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      {clinic.averageRating.toFixed(1)}
                    </div>
                    <span className="text-sm text-on-surface-variant">
                      (120+ reviews) {/* Mocked count as API doesn't return count yet in this view easily, or assumes logic */}
                    </span>
                  </div>
                  {/* Mock Wait Time Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-on-surface-variant">
                      <span>Wait Time</span>
                      <span className="font-medium">~15 min</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-surface-variant">
                      <div className="h-full w-[20%] rounded-full bg-green-500" />
                    </div>
                  </div>
                </div>
              </td>
            ))}
          </tr>

          {/* Availability Row */}
          <tr>
            <th className="sticky left-0 z-10 bg-surface-container-low p-4 text-left text-sm font-bold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
              Availability
            </th>
            {clinics.map((clinic, i) => (
              <td key={clinic.id} className="p-4 align-top">
                {/* Mock availability logic based on index for variety */}
                {i % 2 === 0 ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Calendar className="h-5 w-5" />
                    <span className="font-bold">Tomorrow</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">In 3 days</span>
                  </div>
                )}
              </td>
            ))}
          </tr>

          {/* Cost Row */}
          <tr>
            <th className="sticky left-0 z-10 bg-surface-container-low p-4 text-left text-sm font-bold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
              Estimated Cost
            </th>
            {clinics.map((clinic) => {
                // Calculate range from services
                const prices = clinic.services
                    .flatMap(s => [s.priceMin, s.priceMax])
                    .filter((p): p is number => p !== null);
                const min = prices.length ? Math.min(...prices) : 0;
                const max = prices.length ? Math.max(...prices) : 0;

                return (
                  <td key={clinic.id} className="p-4 align-top">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-on-surface-variant" />
                        <span className="font-medium text-on-surface">
                            {prices.length > 0
                                ? `$${min} - $${max}`
                                : "Contact for pricing"}
                        </span>
                    </div>
                  </td>
                );
            })}
          </tr>

          {/* Services Row */}
          <tr>
            <th className="sticky left-0 z-10 bg-surface-container-low p-4 text-left text-sm font-bold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
              Top Services
            </th>
            {clinics.map((clinic) => (
              <td key={clinic.id} className="p-4 align-top">
                <ul className="space-y-1">
                  {clinic.services.slice(0, 3).map((service) => (
                    <li key={service.id} className="flex items-start gap-2 text-sm text-on-surface">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{service.name}</span>
                    </li>
                  ))}
                  {clinic.services.length === 0 && (
                      <li className="text-sm text-on-surface-variant italic">No services listed</li>
                  )}
                  {clinic.services.length > 3 && (
                      <li className="text-xs text-on-surface-variant font-medium pt-1">
                          +{clinic.services.length - 3} more
                      </li>
                  )}
                </ul>
              </td>
            ))}
          </tr>

           {/* Action Row */}
           <tr>
            <th className="sticky left-0 z-10 bg-surface-container-low p-4 text-left text-sm font-bold text-on-surface-variant shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
            </th>
            {clinics.map((clinic) => (
              <td key={clinic.id} className="p-4 align-top">
                 <Link href={`/clinics/${clinic.id}`}>
                    <Button className="w-full">
                        View Profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                 </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
