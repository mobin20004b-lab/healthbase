"use client";

import React from "react";
import { ClinicWithRelations } from "@/services/clinics";
import { Star, MapPin, Wallet, Calendar, Check } from "lucide-react";
import { Button } from "@/web/components/ui/button";
import { Link } from "@/routing";

interface CompareTableProps {
  clinics: ClinicWithRelations[];
}

export function CompareTable({ clinics }: CompareTableProps) {
  if (clinics.length === 0) {
    return <div className="text-center p-8 text-on-surface-variant">No clinics selected for comparison.</div>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface shadow-sm">
      <table className="w-full min-w-[600px] border-collapse text-left">
        <thead>
          <tr className="border-b border-outline-variant/20">
            <th className="sticky left-0 z-20 w-48 bg-surface p-4 font-semibold text-on-surface shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
              {/* Empty top-left cell */}
            </th>
            {clinics.map((clinic) => (
              <th key={clinic.id} className="min-w-[250px] p-4 align-top">
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface-container-highest">
                    {clinic.image ? (
                        <img src={clinic.image} alt={clinic.name} className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <MapPin className="h-8 w-8 text-on-surface-variant/20" />
                        </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">{clinic.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                         <MapPin className="h-3 w-3" />
                         <span>{clinic.city}</span>
                    </div>
                  </div>
                  <Button asChild variant="filled" size="sm" className="w-full">
                    <Link href={`/clinics/${clinic.id}`}>View Profile</Link>
                  </Button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {/* Availability */}
          <tr>
            <th className="sticky left-0 z-10 bg-surface p-4 text-sm font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
              Next Availability
            </th>
            {clinics.map((clinic) => (
              <td key={clinic.id} className="p-4">
                 <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium text-green-600 dark:text-green-400">Tomorrow</span>
                 </div>
              </td>
            ))}
          </tr>

          {/* Rating */}
          <tr>
            <th className="sticky left-0 z-10 bg-surface p-4 text-sm font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
              Patient Rating
            </th>
            {clinics.map((clinic) => (
              <td key={clinic.id} className="p-4">
                <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-on-surface">{clinic.averageRating}</span>
                    <span className="text-xs text-on-surface-variant">({clinic.reviewCount} reviews)</span>
                </div>
              </td>
            ))}
          </tr>

          {/* Cost */}
          <tr>
             <th className="sticky left-0 z-10 bg-surface p-4 text-sm font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
               Consultation Cost
             </th>
             {clinics.map((clinic) => {
                 const minPrice = clinic.services[0]?.priceMin || 0; // Simplified
                 return (
                  <td key={clinic.id} className="p-4">
                      <div className="flex items-center gap-2 text-sm text-on-surface">
                          <Wallet className="h-4 w-4 text-secondary" />
                          <span>
                              {minPrice > 0
                                ? `${minPrice.toLocaleString()} IRR`
                                : "Contact for price"}
                          </span>
                      </div>
                  </td>
                 );
             })}
          </tr>

          {/* Insurances */}
           <tr>
             <th className="sticky left-0 z-10 bg-surface p-4 text-sm font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] align-top">
               Insurance Accepted
             </th>
             {clinics.map((clinic) => (
               <td key={clinic.id} className="p-4 align-top">
                 <ul className="space-y-1">
                    {clinic.insurances.length > 0 ? (
                        clinic.insurances.map(i => (
                            <li key={i.id} className="flex items-start gap-2 text-sm text-on-surface">
                                <Check className="h-3.5 w-3.5 mt-0.5 text-primary" />
                                <span>{i.name}</span>
                            </li>
                        ))
                    ) : (
                        <li className="text-sm text-on-surface-variant italic">None listed</li>
                    )}
                 </ul>
               </td>
             ))}
           </tr>

           {/* Services */}
           <tr>
             <th className="sticky left-0 z-10 bg-surface p-4 text-sm font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] align-top">
               Top Services
             </th>
             {clinics.map((clinic) => (
               <td key={clinic.id} className="p-4 align-top">
                 <div className="flex flex-wrap gap-2">
                    {clinic.services.map(s => (
                        <span key={s.id} className="inline-flex items-center rounded-md bg-surface-container px-2 py-1 text-xs font-medium text-on-surface-variant">
                            {s.name}
                        </span>
                    ))}
                 </div>
               </td>
             ))}
           </tr>
        </tbody>
      </table>
    </div>
  );
}
