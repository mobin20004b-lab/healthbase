"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star, MapPin, Calendar, Wallet, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClinicWithRelations } from "@/services/clinics";
import { Button } from "@/web/components/ui/button";
import { Link } from "@/routing";

interface CompareTableProps {
    clinics: ClinicWithRelations[];
}

export function CompareTable({ clinics }: CompareTableProps) {
    const t = useTranslations("Compare");
    const tClinics = useTranslations("Clinics");

    if (!clinics || clinics.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-on-surface-variant mb-4">{t("empty")}</p>
                <Button asChild>
                    <Link href="/search">{t("backToSearch")}</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface shadow-sm">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs uppercase bg-surface-container-high text-on-surface-variant">
                    <tr>
                        <th className="px-6 py-4 w-1/4 min-w-[150px]">Feature</th>
                        {clinics.map((clinic) => (
                            <th key={clinic.id} className="px-6 py-4 min-w-[250px]">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-outline-variant bg-surface-container">
                                        {clinic.image ? (
                                            <Image
                                                src={clinic.image}
                                                alt={clinic.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-surface-container">
                                                <MapPin className="h-6 w-6 text-on-surface-variant" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-base font-semibold text-center text-on-surface line-clamp-2">
                                        {clinic.name}
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                    {/* Rating Row */}
                    <tr className="bg-surface hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4 font-medium text-on-surface flex items-center gap-2">
                            <Star className="h-4 w-4 text-primary" />
                            {t("rating")}
                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-on-surface">{clinic.averageRating.toFixed(1)}</span>
                                    <span className="text-on-surface-variant text-xs">({clinic.reviewCount})</span>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Availability Row (Mocked logic for demo) */}
                    <tr className="bg-surface hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4 font-medium text-on-surface flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            {t("availability")}
                        </td>
                        {clinics.map((clinic, idx) => {
                            // Mock logic: alternate availability
                            const isTomorrow = idx % 2 === 0;
                            return (
                                <td key={clinic.id} className="px-6 py-4 text-center">
                                    <span
                                        className={cn(
                                            "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                            isTomorrow
                                                ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-400/20"
                                                : "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-400/20"
                                        )}
                                    >
                                        {isTomorrow ? "Tomorrow" : "3 weeks"}
                                    </span>
                                </td>
                            );
                        })}
                    </tr>

                    {/* Cost Row (Mocked logic) */}
                    <tr className="bg-surface hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4 font-medium text-on-surface flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-primary" />
                            {t("cost")}
                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-1 text-on-surface-variant">
                                    {/* Mock cost indicators */}
                                    <span className="font-bold text-on-surface">$$</span>$
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* City Row */}
                    <tr className="bg-surface hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4 font-medium text-on-surface flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            {t("city")}
                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="px-6 py-4 text-center text-on-surface-variant">
                                {clinic.city}, {clinic.province}
                            </td>
                        ))}
                    </tr>

                    {/* Services Row */}
                    <tr className="bg-surface hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4 font-medium text-on-surface flex items-center gap-2 align-top">
                            <Check className="h-4 w-4 text-primary" />
                            {t("services")}
                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="px-6 py-4 align-top">
                                <ul className="list-disc list-inside space-y-1 text-xs text-on-surface-variant text-start mx-auto max-w-[200px]">
                                    {clinic.services.slice(0, 5).map((service) => (
                                        <li key={service.id} className="truncate">
                                            {service.name}
                                        </li>
                                    ))}
                                    {clinic.services.length === 0 && (
                                        <li className="list-none text-center italic text-on-surface-variant/50">
                                            -
                                        </li>
                                    )}
                                    {clinic.services.length > 5 && (
                                        <li className="list-none text-primary font-medium cursor-pointer">
                                            +{clinic.services.length - 5} more
                                        </li>
                                    )}
                                </ul>
                            </td>
                        ))}
                    </tr>

                    {/* Actions Row */}
                    <tr className="bg-surface hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4 font-medium text-on-surface">

                        </td>
                        {clinics.map((clinic) => (
                            <td key={clinic.id} className="px-6 py-4 text-center">
                                <Button size="sm" variant="filled" className="w-full" asChild>
                                    <Link href={`/clinics/${clinic.id}`}>
                                        {tClinics("viewDetails")}
                                    </Link>
                                </Button>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
