"use client";

import React from "react";
import type { ClinicWithRelations } from "@/services/clinics";
import { cn } from "@/lib/utils";
import { Star, MapPin, Calendar, Clock, Wallet, Shield, Stethoscope, Check } from "lucide-react";

interface CompareTableProps {
  clinics: ClinicWithRelations[];
}

export function CompareTable({ clinics }: CompareTableProps) {
  if (clinics.length === 0) {
    return (
        <div className="text-center py-12 text-on-surface-variant">
            <p>No clinics selected for comparison.</p>
        </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface shadow-sm">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-low">
             <th className="p-4 text-left font-semibold text-on-surface sticky left-0 bg-surface-container-low z-10 w-48 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Feature</th>
             {clinics.map(clinic => (
                 <th key={clinic.id} className="p-4 text-left font-semibold text-on-surface min-w-[200px] align-top">
                     <div className="flex flex-col gap-2">
                         <div className="relative h-24 w-full rounded-lg overflow-hidden bg-surface-container-highest">
                             {clinic.image ? (
                                 <img src={clinic.image} alt={clinic.name} className="h-full w-full object-cover" />
                             ) : (
                                 <div className="h-full w-full flex items-center justify-center text-on-surface-variant/20">
                                     <MapPin className="h-8 w-8" />
                                 </div>
                             )}
                         </div>
                         <span className="text-lg leading-tight mt-1">{clinic.name}</span>
                     </div>
                 </th>
             ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
           {/* Location */}
           <tr className="group hover:bg-surface-container-low/50 transition-colors">
               <td className="p-4 text-sm font-medium text-on-surface-variant sticky left-0 bg-surface group-hover:bg-surface-container-low/50 z-10 flex items-center gap-2 border-r border-outline-variant/10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                   <MapPin className="w-4 h-4 text-primary" />
                   Location
               </td>
               {clinics.map(clinic => (
                   <td key={clinic.id} className="p-4 text-on-surface">
                       {clinic.city}, {clinic.province}
                   </td>
               ))}
           </tr>

           {/* Rating */}
           <tr className="group hover:bg-surface-container-low/50 transition-colors">
               <td className="p-4 text-sm font-medium text-on-surface-variant sticky left-0 bg-surface group-hover:bg-surface-container-low/50 z-10 flex items-center gap-2 border-r border-outline-variant/10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                   <Star className="w-4 h-4 text-yellow-500" />
                   Rating
               </td>
               {clinics.map(clinic => (
                   <td key={clinic.id} className="p-4 text-on-surface">
                       <div className="flex items-center gap-2">
                           <span className="font-bold">{clinic.averageRating}</span>
                           <div className="flex">
                               {[1, 2, 3, 4, 5].map((star) => (
                                   <Star
                                       key={star}
                                       className={cn(
                                           "w-3 h-3",
                                           star <= Math.round(clinic.averageRating || 0)
                                               ? "fill-yellow-400 text-yellow-400"
                                               : "text-outline-variant"
                                       )}
                                   />
                               ))}
                           </div>
                           <span className="text-xs text-on-surface-variant">({clinic.reviewCount})</span>
                       </div>
                   </td>
               ))}
           </tr>

           {/* Availability */}
           <tr className="group hover:bg-surface-container-low/50 transition-colors">
               <td className="p-4 text-sm font-medium text-on-surface-variant sticky left-0 bg-surface group-hover:bg-surface-container-low/50 z-10 flex items-center gap-2 border-r border-outline-variant/10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                   <Calendar className="w-4 h-4 text-primary" />
                   Availability
               </td>
               {clinics.map(clinic => (
                   <td key={clinic.id} className="p-4 text-on-surface">
                       <span className={cn(
                           "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                           clinic.nextAvailable === 'Tomorrow' || clinic.nextAvailable === 'Today'
                               ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                               : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                       )}>
                           {clinic.nextAvailable}
                       </span>
                   </td>
               ))}
           </tr>

           {/* Wait Time */}
           <tr className="group hover:bg-surface-container-low/50 transition-colors">
               <td className="p-4 text-sm font-medium text-on-surface-variant sticky left-0 bg-surface group-hover:bg-surface-container-low/50 z-10 flex items-center gap-2 border-r border-outline-variant/10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                   <Clock className="w-4 h-4 text-primary" />
                   Avg. Wait Time
               </td>
               {clinics.map(clinic => {
                   // Calculate percentage max 120 mins
                   const percentage = Math.min((clinic.waitTime || 0) / 120 * 100, 100);
                   return (
                       <td key={clinic.id} className="p-4 text-on-surface">
                           <div className="flex flex-col gap-1 w-full max-w-[150px]">
                               <div className="flex justify-between text-xs">
                                   <span>{clinic.waitTime} mins</span>
                               </div>
                               <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                   <div
                                       className={cn(
                                           "h-full rounded-full",
                                           clinic.waitTime && clinic.waitTime < 30 ? "bg-green-500" :
                                           clinic.waitTime && clinic.waitTime < 60 ? "bg-amber-500" : "bg-error"
                                       )}
                                       style={{ width: `${percentage}%` }}
                                   />
                               </div>
                           </div>
                       </td>
                   );
               })}
           </tr>

           {/* Cost */}
           <tr className="group hover:bg-surface-container-low/50 transition-colors">
               <td className="p-4 text-sm font-medium text-on-surface-variant sticky left-0 bg-surface group-hover:bg-surface-container-low/50 z-10 flex items-center gap-2 border-r border-outline-variant/10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                   <Wallet className="w-4 h-4 text-primary" />
                   Cost
               </td>
               {clinics.map(clinic => (
                   <td key={clinic.id} className="p-4 text-on-surface">
                       <span className="font-mono font-bold text-on-surface-variant">
                           {clinic.cost}
                       </span>
                   </td>
               ))}
           </tr>

           {/* Services */}
           <tr className="group hover:bg-surface-container-low/50 transition-colors">
               <td className="p-4 text-sm font-medium text-on-surface-variant sticky left-0 bg-surface group-hover:bg-surface-container-low/50 z-10 flex items-center gap-2 border-r border-outline-variant/10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] align-top">
                   <Stethoscope className="w-4 h-4 text-primary" />
                   Services
               </td>
               {clinics.map(clinic => (
                   <td key={clinic.id} className="p-4 text-on-surface align-top">
                       <div className="flex flex-wrap gap-1">
                           {clinic.services?.map(service => (
                               <span key={service} className="text-xs bg-surface-container px-2 py-1 rounded-md text-on-surface-variant">
                                   {service}
                               </span>
                           ))}
                       </div>
                   </td>
               ))}
           </tr>

           {/* Insurances */}
           <tr className="group hover:bg-surface-container-low/50 transition-colors">
               <td className="p-4 text-sm font-medium text-on-surface-variant sticky left-0 bg-surface group-hover:bg-surface-container-low/50 z-10 flex items-center gap-2 border-r border-outline-variant/10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] align-top">
                   <Shield className="w-4 h-4 text-primary" />
                   Insurance
               </td>
               {clinics.map(clinic => (
                   <td key={clinic.id} className="p-4 text-on-surface align-top">
                       <div className="flex flex-col gap-1">
                           {clinic.insurances?.map(ins => (
                               <div key={ins} className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                                   <Check className="w-3 h-3 text-green-600" />
                                   {ins}
                               </div>
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
