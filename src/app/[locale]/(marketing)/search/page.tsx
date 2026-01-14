"use client";

import React, { useState } from "react";
import { ClinicCard } from "@/web/components/clinics/clinic-card";
import { MOCK_CLINICS } from "@/lib/data/mock-clinics";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/web/components/ui/button";
import { Map, List } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import SearchFilters from "@/web/components/clinics/SearchFilters";

export default function SearchPage() {
    const t = useTranslations("Search");
    const searchParams = useSearchParams();
    const [showMap, setShowMap] = useState(false);

    // Filter Logic
    const filteredClinics = MOCK_CLINICS.filter((clinic) => {
        const q = searchParams.get("q")?.toLowerCase();
        const city = searchParams.get("city");
        const province = searchParams.get("province");
        const specialty = searchParams.get("specialty");
        const insurance = searchParams.get("insurance");

        if (q && !clinic.name.toLowerCase().includes(q) && !clinic.description?.toLowerCase().includes(q)) return false;
        if (city && clinic.city !== city) return false;
        if (province && clinic.province !== province) return false;
        if (specialty && !clinic.specialties.includes(specialty)) return false;
        if (insurance && !clinic.insurances.includes(insurance)) return false;

        return true;
    });

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
            {/* Mobile Map Toggle */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <Button
                    size="lg"
                    className="rounded-full shadow-xl"
                    onClick={() => setShowMap(!showMap)}
                >
                    {showMap ? (
                        <>
                            <List className="mr-2 h-5 w-5" /> {t("showList")}
                        </>
                    ) : (
                        <>
                            <Map className="mr-2 h-5 w-5" /> {t("showMap")}
                        </>
                    )}
                </Button>
            </div>

            {/* Mobile Filters Sheet Trigger - Could be in a sub-header */}
             <div className="lg:hidden p-4 border-b border-outline-variant/20 bg-surface sticky top-0 z-40">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outlined" className="w-full">
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh] overflow-y-auto rounded-t-3xl p-0">
                         <div className="p-4">
                             <SearchFilters />
                         </div>
                    </SheetContent>
                </Sheet>
            </div>


            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar (Filters) - Desktop */}
                <aside className="hidden lg:block w-80 p-6 overflow-y-auto border-r border-outline-variant/20 bg-surface h-full">
                    <SearchFilters />
                </aside>

                {/* Main Content (List & Map) */}
                <main className="flex-1 flex relative">
                    {/* List View */}
                    <div className={`flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300 ${showMap ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
                        <div className="mb-4 flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-on-surface">
                                {filteredClinics.length} {t("resultsFound")}
                            </h1>
                            {/* Sort Dropdown could go here */}
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {filteredClinics.map((clinic) => (
                                <ClinicCard
                                    key={clinic.id}
                                    clinic={clinic}
                                    rating={clinic.rating}
                                    reviewCount={clinic.reviewCount}
                                    nextAvailable={clinic.nextAvailable}
                                />
                            ))}
                            {filteredClinics.length === 0 && (
                                <div className="text-center py-20">
                                    <p className="text-on-surface-variant text-lg">No clinics found matching your criteria.</p>
                                    <Button variant="text" onClick={() => window.history.back()} className="mt-4">
                                        Go Back
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Map View */}
                    <div className={`
                        absolute inset-0 lg:static lg:block bg-surface-variant/30 transition-transform duration-300 z-10
                        ${showMap ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-1/2'}
                    `}>
                        {/* Placeholder Map */}
                        <div className="h-full w-full flex items-center justify-center text-on-surface-variant bg-surface-container-high">
                            <div className="text-center">
                                <Map className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium">Interactive Map</p>
                                <p className="text-sm opacity-70">Coming soon in Phase 4</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
