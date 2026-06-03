import { Card } from "@/web/components/ui/card";
import { useTranslations } from "next-intl";

interface HealthPassportProps {
  bloodType: string;
  allergies: string[];
}

export function HealthPassport({ bloodType, allergies }: HealthPassportProps) {
  const t = useTranslations("Patient.records");

  return (
    <Card variant="bento" className="p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-on-surface mb-4">{t("healthPassport")}</h3>
        <div className="space-y-4">
          <div>
            <span className="text-sm font-bold text-on-surface-variant block mb-1">
              {t("bloodType")}
            </span>
            <div className="text-2xl font-black text-primary">
              {bloodType}
            </div>
          </div>
          <div>
            <span className="text-sm font-bold text-on-surface-variant block mb-1">
              {t("allergies")}
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {allergies.length > 0 ? (
                allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-error/10 text-error rounded-full text-sm font-medium"
                  >
                    {allergy}
                  </span>
                ))
              ) : (
                <span className="text-sm text-on-surface-variant">None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
