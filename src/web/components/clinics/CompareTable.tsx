"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/routing';
import { X, Star, Calendar, Wallet, MapPin } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { cn } from '@/lib/utils';
import type { ClinicWithRelations } from '@/services/clinics';

interface CompareTableProps {
    clinics: ClinicWithRelations[];
}

export function CompareTable({ clinics }: CompareTableProps) {
    const t = useTranslations('Clinics');

    // Helper to remove a clinic from the URL
    const getRemoveUrl = (idToRemove: string) => {
         const remainingIds = clinics.filter(c => c.id !== idToRemove).map(c => c.id);
         if (remainingIds.length === 0) return '/search';
         return `/compare?ids=${remainingIds.join(',')}`;
    };

    if (clinics.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-semibold mb-4">No clinics selected</h2>
                <Button asChild>
                    <Link href="/search">Return to Search</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[800px] grid grid-cols-[200px_repeat(3,1fr)]">
                {/* Header Row */}
                <div className="sticky top-0 z-20 bg-surface p-4 font-bold text-lg border-b border-outline-variant/20 flex items-center">
                    <span className="text-primary">Comparison</span>
                </div>
                {clinics.map(clinic => (
                    <div key={clinic.id} className="sticky top-0 z-20 bg-surface p-4 border-b border-outline-variant/20 flex flex-col items-center text-center gap-2 relative">
                         <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 text-on-surface-variant hover:text-error"
                         >
                            <Link href={getRemoveUrl(clinic.id)}>
                                <X className="h-4 w-4" />
                            </Link>
                         </Button>

                         <div className="relative h-20 w-20 rounded-full overflow-hidden bg-surface-container-highest mb-2 shadow-sm border border-outline-variant/20">
                             {clinic.image ? (
                                 <Image src={clinic.image} alt={clinic.name} fill className="object-cover" />
                             ) : (
                                 <div className="flex items-center justify-center h-full w-full"><MapPin className="h-8 w-8 opacity-50"/></div>
                             )}
                         </div>
                         <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem] flex items-center justify-center">{clinic.name}</h3>
                         <Button asChild size="sm" variant="tonal" className="w-full mt-2">
                            <Link href={`/clinics/${clinic.id}`}>View Profile</Link>
                         </Button>
                    </div>
                ))}
                {/* Fill empty columns if less than 3 */}
                {[...Array(3 - clinics.length)].map((_, i) => (
                    <div key={`empty-${i}`} className="sticky top-0 z-20 bg-surface/50 p-4 border-b border-outline-variant/20 hidden md:flex items-center justify-center text-on-surface-variant/50 font-medium">
                        Empty Slot
                    </div>
                ))}


                {/* Rating Row */}
                <div className="p-4 font-medium text-on-surface-variant border-b border-outline-variant/10 bg-surface-container-low/30">Rating</div>
                {clinics.map(clinic => (
                    <div key={`rating-${clinic.id}`} className="p-4 border-b border-outline-variant/10 flex flex-col items-center justify-center bg-surface/50">
                        <div className="flex items-center gap-1 font-bold text-lg">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            {clinic.averageRating.toFixed(1)}
                        </div>
                        <div className="text-xs text-on-surface-variant">{clinic.reviewCount} reviews</div>
                        {/* Mock wait time bar */}
                        <div className="w-full h-1.5 bg-surface-container-highest rounded-full mt-2 overflow-hidden max-w-[120px]">
                             <div className="h-full bg-primary/80" style={{ width: `${(clinic.averageRating / 5) * 100}%` }}></div>
                        </div>
                        <span className="text-[10px] text-on-surface-variant mt-1">Satisfaction Score</span>
                    </div>
                ))}
                {[...Array(3 - clinics.length)].map((_, i) => <div key={`empty-rating-${i}`} className="hidden md:block border-b border-outline-variant/10 bg-surface/50"></div>)}

                {/* Availability Row */}
                <div className="p-4 font-medium text-on-surface-variant border-b border-outline-variant/10 bg-surface-container-low/30">Availability</div>
                {clinics.map(clinic => {
                    // Mock availability randomly
                    const isSoon = Math.random() > 0.5;
                    return (
                        <div key={`avail-${clinic.id}`} className="p-4 border-b border-outline-variant/10 flex justify-center items-center bg-surface/50">
                            <div className={cn(
                                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
                                isSoon
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            )}>
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{isSoon ? "Tomorrow" : "Next Week"}</span>
                            </div>
                        </div>
                    );
                })}
                 {[...Array(3 - clinics.length)].map((_, i) => <div key={`empty-avail-${i}`} className="hidden md:block border-b border-outline-variant/10 bg-surface/50"></div>)}

                {/* Location Row */}
                <div className="p-4 font-medium text-on-surface-variant border-b border-outline-variant/10 bg-surface-container-low/30">Location</div>
                {clinics.map(clinic => (
                    <div key={`loc-${clinic.id}`} className="p-4 border-b border-outline-variant/10 text-center text-sm flex items-center justify-center bg-surface/50">
                        {clinic.city}, {clinic.province}
                    </div>
                ))}
                 {[...Array(3 - clinics.length)].map((_, i) => <div key={`empty-loc-${i}`} className="hidden md:block border-b border-outline-variant/10 bg-surface/50"></div>)}

                 {/* Insurance Row */}
                <div className="p-4 font-medium text-on-surface-variant border-b border-outline-variant/10 bg-surface-container-low/30">Insurance</div>
                {clinics.map(clinic => (
                    <div key={`ins-${clinic.id}`} className="p-4 border-b border-outline-variant/10 text-center text-sm flex items-center justify-center bg-surface/50">
                        {clinic.insurances && clinic.insurances.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-1">
                                {clinic.insurances.slice(0, 3).map(ins => (
                                    <span key={ins.id} className="bg-surface-container px-1.5 py-0.5 rounded text-xs">{ins.name}</span>
                                ))}
                                {clinic.insurances.length > 3 && <span className="text-xs text-on-surface-variant">+{clinic.insurances.length - 3}</span>}
                            </div>
                        ) : (
                            <span className="text-on-surface-variant italic">None listed</span>
                        )}
                    </div>
                ))}
                 {[...Array(3 - clinics.length)].map((_, i) => <div key={`empty-ins-${i}`} className="hidden md:block border-b border-outline-variant/10 bg-surface/50"></div>)}

                {/* Services Row */}
                 <div className="p-4 font-medium text-on-surface-variant border-b border-outline-variant/10 bg-surface-container-low/30">Top Services</div>
                {clinics.map(clinic => (
                    <div key={`serv-${clinic.id}`} className="p-4 border-b border-outline-variant/10 text-center text-sm bg-surface/50">
                        <ul className="list-disc list-inside text-left inline-block">
                             {clinic.services.slice(0, 3).map(service => (
                                 <li key={service.id} className="truncate max-w-[150px]">{service.name}</li>
                             ))}
                        </ul>
                    </div>
                ))}
                 {[...Array(3 - clinics.length)].map((_, i) => <div key={`empty-serv-${i}`} className="hidden md:block border-b border-outline-variant/10 bg-surface/50"></div>)}

                 {/* Cost Row */}
                 <div className="p-4 font-medium text-on-surface-variant border-b border-outline-variant/10 bg-surface-container-low/30">Est. Cost</div>
                {clinics.map(clinic => {
                    // Mock Cost or calc
                     const min = clinic.services.length > 0 ? Math.min(...clinic.services.map(s => s.priceMin || 0).filter(p => p > 0)) : 0;
                     const max = clinic.services.length > 0 ? Math.max(...clinic.services.map(s => s.priceMax || 0).filter(p => p > 0)) : 0;
                     const costString = min > 0 ? `$${min} - $${max}` : "Contact for pricing";

                    return (
                        <div key={`cost-${clinic.id}`} className="p-4 border-b border-outline-variant/10 text-center text-sm font-medium flex items-center justify-center bg-surface/50">
                            <div className="flex items-center justify-center gap-1">
                                <Wallet className="h-4 w-4 text-on-surface-variant" />
                                <span>{costString}</span>
                            </div>
                        </div>
                    );
                })}
                 {[...Array(3 - clinics.length)].map((_, i) => <div key={`empty-cost-${i}`} className="hidden md:block border-b border-outline-variant/10 bg-surface/50"></div>)}

            </div>
        </div>
    );
}
