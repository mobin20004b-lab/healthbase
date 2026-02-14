import { ClinicWithRelations } from "@/services/clinics";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

interface ClinicInsuranceProps {
    clinic: ClinicWithRelations;
}

export function ClinicInsurance({ clinic }: ClinicInsuranceProps) {
    const t = useTranslations('Clinics');

    if (!clinic.insurances || clinic.insurances.length === 0) {
        return null;
    }

    return (
        <div className="bg-surface rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <h2 className="text-xl font-bold mb-4">{t('insurance')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {clinic.insurances.map((insurance) => (
                    <div key={insurance.id} className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-low border border-outline-variant/10">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium text-on-surface">{insurance.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
