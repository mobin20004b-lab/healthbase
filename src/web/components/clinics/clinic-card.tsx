"use client";

import React from "react";
import type { Clinic } from "@prisma/client";
import { Card } from "@/web/components/ui/card";
import { Button } from "@/web/components/ui/button";
import { MapPin, Star, Calendar, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClinicCardProps {
    clinic: Clinic;
    rating?: number;
    reviewCount?: number;
    nextAvailable?: string; // e.g., "Tomorrow", "In 3 days"
    onCompareChange?: (checked: boolean) => void;
    className?: string;
}

export function ClinicCard({
    clinic,
    rating = 0,
    reviewCount = 0,
    nextAvailable = "Tomorrow",
    onCompareChange,
    className,
}: ClinicCardProps) {
    return (
        <Card
            className={cn(
                "group relative flex flex-col sm:flex-row overflow-hidden border-none bg-surface-container-low/80 backdrop-blur transition-all hover:shadow-lg",
                className
            )}
        >
            {/* Image Section */}
            <div className="relative h-48 w-full sm:h-auto sm:w-48 shrink-0 overflow-hidden bg-surface-container-highest">
                {clinic.image ? (
                    <img
                        src={clinic.image}
                        alt={clinic.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-on-surface-variant/20">
                        <MapPin className="h-12 w-12" />
                    </div>
                )}

                {/* Mobile: Compare Checkbox overlay */}
                <div className="absolute top-2 right-2 sm:hidden">
                    <label className="flex items-center justify-center h-8 w-8 rounded-full bg-surface/80 backdrop-blur text-primary shadow-sm cursor-pointer">
                        <input
                            type="checkbox"
                            className="peer h-4 w-4 rounded border-primary text-primary focus:ring-primary accent-primary"
                            onChange={(e) => onCompareChange?.(e.target.checked)}
                        />
                    </label>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-on-surface group-hover:text-primary transition-colors">
                                {clinic.name}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-on-surface-variant mt-1">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{clinic.city || "Unknown City"}, {clinic.country}</span>
                            </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-xs font-medium text-on-surface">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{rating.toFixed(1)}</span>
                            <span className="text-on-surface-variant">({reviewCount})</span>
                        </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {/* Availability Pill */}
                        <div className={cn(
                            "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
                            nextAvailable === "Tomorrow"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        )}>
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Available {nextAvailable}</span>
                        </div>

                        {clinic.isVerified && (
                            <div className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                <Check className="h-3.5 w-3.5" />
                                <span>Verified</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions Footer - Desktop */}
                <div className="mt-4 flex items-center justify-between border-t border-outline-variant/20 pt-4">
                    <label className="hidden sm:flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-outline text-primary focus:ring-primary accent-primary"
                            onChange={(e) => onCompareChange?.(e.target.checked)}
                        />
                        <span>Compare</span>
                    </label>

                    <Button variant="tonal" size="sm" className="ml-auto group/btn">
                        View Profile
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
