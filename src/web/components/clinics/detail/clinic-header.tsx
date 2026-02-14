import { ClinicWithRelations } from "@/services/clinics";
import { Badge } from "@/web/components/ui/badge";
import { MapPin, Phone, Star, CheckCircle, Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ClinicHeaderProps {
    clinic: ClinicWithRelations;
}

export function ClinicHeader({ clinic }: ClinicHeaderProps) {
    const t = useTranslations('ClinicDetail');
    const tClinics = useTranslations('Clinics');
    const tNav = useTranslations('Navigation');

    return (
        <div className="bg-surface rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-48 shrink-0 rounded-2xl overflow-hidden bg-surface-container-highest">
                    {clinic.image ? (
                        <Image
                            src={clinic.image}
                            alt={clinic.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-on-surface-variant/20">
                            <MapPin className="w-12 h-12" />
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
                                    {clinic.name}
                                </h1>
                                {clinic.isVerified && (
                                    <Badge variant="success" className="gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        {t('verified')}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
                                <MapPin className="w-4 h-4" />
                                <span>{clinic.city}, {clinic.province}</span>
                            </div>
                            {clinic.averageRating > 0 && (
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-md">
                                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600 mr-1" />
                                        <span className="font-bold text-yellow-700 dark:text-yellow-500">
                                            {clinic.averageRating.toFixed(1)}
                                        </span>
                                    </div>
                                    <span className="text-sm text-on-surface-variant">
                                        ({clinic.reviewCount} {tClinics('reviews')})
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-sm text-on-surface-variant border-t border-outline-variant/10 pt-4">
                        {clinic.address && (
                            <p className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                {clinic.address}
                            </p>
                        )}
                        {clinic.phone && (
                            <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4 shrink-0" />
                                <a href={`tel:${clinic.phone}`} className="hover:text-primary transition-colors" dir="ltr">
                                    {clinic.phone}
                                </a>
                            </p>
                        )}
                         {clinic.website && (
                            <p className="flex items-center gap-2">
                                <Globe className="w-4 h-4 shrink-0" />
                                <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-dotted">
                                    {clinic.website.replace(/^https?:\/\//, '')}
                                </a>
                            </p>
                        )}
                    </div>
                </div>
            </div>

             {clinic.description && (
                <div className="mt-6 pt-6 border-t border-outline-variant/10">
                    <h2 className="text-lg font-semibold mb-2">{tNav('about')}</h2>
                    <p className="text-on-surface-variant leading-relaxed">
                        {clinic.description}
                    </p>
                </div>
            )}
        </div>
    );
}
