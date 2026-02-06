"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ClinicWithRelations } from "@/services/clinics";
import { buttonVariants } from "@/web/components/ui/button";
import { Link } from "@/routing";
import { Check, X, MapPin, Wallet, Calendar, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompareTableProps {
    clinics: ClinicWithRelations[];
}

export default function CompareTable({ clinics }: CompareTableProps) {
    const t = useTranslations("Compare"); // Assuming a Compare namespace exists or fallback

    // Helper to render a row
    const renderRow = (label: string, renderCell: (clinic: ClinicWithRelations) => React.ReactNode) => (
        <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors">
            <td className="p-4 font-medium text-on-surface-variant align-top w-48 bg-surface/95 backdrop-blur sticky left-0 z-10 border-r border-outline-variant/20">
                {label}
            </td>
            {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4 align-top min-w-[250px]">
                    {renderCell(clinic)}
                </td>
            ))}
        </tr>
    );

    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface shadow-sm pb-2">
            <table className="w-full text-sm text-left border-collapse min-w-max">
                <thead>
                    <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="p-4 font-bold text-on-surface w-48 sticky left-0 z-20 bg-surface-container-low border-r border-outline-variant/20">
                            <span className="sr-only">Labels</span>
                        </th>
                        {clinics.map((clinic) => (
                            <th key={clinic.id} className="p-4 min-w-[250px] align-top">
                                <div className="flex flex-col gap-3">
                                    <div className="relative h-32 w-full overflow-hidden rounded-xl bg-surface-container-highest">
                                        {clinic.image ? (
                                            <Image
                                                src={clinic.image}
                                                alt={clinic.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-on-surface-variant/20">
                                                <MapPin className="h-8 w-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-on-surface line-clamp-2 min-h-[3.5rem]">{clinic.name}</h3>
                                        <div className="flex items-center gap-1 text-on-surface-variant text-xs mt-1">
                                            <MapPin className="h-3 w-3" />
                                            <span>{clinic.city}, {clinic.country}</span>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Availability */}
                    {renderRow("Availability", (clinic) => (
                         // Mock logic for demo
                         <div className={cn(
                             "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
                             "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                         )}>
                             <Calendar className="h-3.5 w-3.5" />
                             <span>Available Tomorrow</span>
                         </div>
                    ))}

                    {/* Rating */}
                    {renderRow("Rating", (clinic) => (
                        <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-1.5">
                                 <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-md">
                                     <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                     <span className="font-bold">{clinic.averageRating.toFixed(1)}</span>
                                 </div>
                                 <span className="text-on-surface-variant text-xs">({clinic.reviewCount} reviews)</span>
                             </div>
                             {/* Mock Wait Time Bar */}
                             <div className="space-y-1">
                                 <div className="flex justify-between text-xs text-on-surface-variant">
                                     <span>Wait Time</span>
                                     <span>~15 min</span>
                                 </div>
                                 <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                     <div className="h-full bg-primary w-[20%] rounded-full" />
                                 </div>
                             </div>
                        </div>
                    ))}

                    {/* Cost Estimation */}
                    {renderRow("Cost Estimation", (clinic) => (
                        <div className="flex items-center gap-2 text-on-surface">
                            <Wallet className="h-4 w-4 text-on-surface-variant" />
                            <span>$$ - Moderate</span>
                        </div>
                    ))}

                    {/* Services */}
                    {renderRow("Services", (clinic) => (
                        <div className="flex flex-wrap gap-1">
                            {clinic.services.length > 0 ? (
                                clinic.services.slice(0, 5).map(s => (
                                    <span key={s.id} className="inline-block px-2 py-0.5 rounded-md bg-surface-container text-xs text-on-surface-variant">
                                        {s.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-on-surface-variant/50 italic text-xs">No services listed</span>
                            )}
                            {clinic.services.length > 5 && (
                                <span className="text-xs text-primary font-medium">+{clinic.services.length - 5} more</span>
                            )}
                        </div>
                    ))}

                    {/* Verified Status */}
                    {renderRow("Verified", (clinic) => (
                        clinic.isVerified ? (
                            <div className="flex items-center gap-1.5 text-primary text-xs font-medium">
                                <Check className="h-4 w-4" />
                                <span>Verified Clinic</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-on-surface-variant/50 text-xs">
                                <X className="h-4 w-4" />
                                <span>Not Verified</span>
                            </div>
                        )
                    ))}

                    {/* Action */}
                    <tr className="bg-surface-container-low/50">
                        <td className="p-4 sticky left-0 z-10 bg-surface-container-low/50 border-r border-outline-variant/20"></td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="p-4">
                                <Link
                                    href={`/clinics/${clinic.id}`}
                                    className={cn(buttonVariants({ variant: "filled" }), "w-full")}
                                >
                                    View Profile
                                </Link>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
