import { ClinicWithRelations } from "@/services/clinics";
import { useTranslations } from "next-intl";

interface ClinicServicesProps {
    clinic: ClinicWithRelations;
}

export function ClinicServices({ clinic }: ClinicServicesProps) {
    const t = useTranslations('ClinicDetail');

    if (!clinic.services || clinic.services.length === 0) {
        return (
            <div className="bg-surface rounded-3xl p-6 shadow-sm border border-outline-variant/10">
                <h2 className="text-xl font-bold mb-4">{t('services')}</h2>
                <p className="text-on-surface-variant text-center py-8">{t('noServices')}</p>
            </div>
        );
    }

    // Group services by category
    const servicesByCategory = clinic.services.reduce((acc, service) => {
        const categoryName = service.category?.name || 'Other';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(service);
        return acc;
    }, {} as Record<string, typeof clinic.services>);

    return (
        <div className="bg-surface rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <h2 className="text-xl font-bold mb-6">{t('services')}</h2>

            <div className="space-y-8">
                {Object.entries(servicesByCategory).map(([category, services]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold mb-3 text-primary">{category}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {services.map((service) => (
                                <div key={service.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
                                    <div>
                                        <h4 className="font-medium text-on-surface">{service.name}</h4>
                                        {service.description && (
                                            <p className="text-sm text-on-surface-variant mt-1">{service.description}</p>
                                        )}
                                    </div>
                                    <div className="mt-2 sm:mt-0 text-right">
                                        {(service.priceMin || service.priceMax) ? (
                                            <div className="text-sm font-semibold text-on-surface">
                                                {service.priceMin && (
                                                    <span>{service.priceMin.toLocaleString()}</span>
                                                )}
                                                {service.priceMin && service.priceMax && <span> - </span>}
                                                {service.priceMax && (
                                                    <span>{service.priceMax.toLocaleString()}</span>
                                                )}
                                                <span className="text-xs text-on-surface-variant ml-1">{service.currency}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-on-surface-variant italic">Call for price</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
