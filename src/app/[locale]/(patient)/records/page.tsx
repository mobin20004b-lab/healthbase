import { setRequestLocale } from 'next-intl/server';
import { HealthPassport } from '@/web/components/patient/records/HealthPassport';
import { LabResultsTable } from '@/web/components/patient/records/LabResultsTable';
import { Card } from '@/web/components/ui/card';

import { getTranslations } from 'next-intl/server';

export default async function MedicalRecordsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  setRequestLocale(locale);
  const t = await getTranslations('Patient.records');


  // Mock Data
  const mockHealthData = {
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"]
  };

  const mockLabResults = [
    { id: "1", testName: "Hemoglobin", result: 14.5, unit: "g/dL", minRange: 13.8, maxRange: 17.2 },
    { id: "2", testName: "Cholesterol (Total)", result: 210, unit: "mg/dL", minRange: 125, maxRange: 200 },
    { id: "3", testName: "Glucose (Fasting)", result: 95, unit: "mg/dL", minRange: 70, maxRange: 99 },
    { id: "4", testName: "Vitamin D", result: 25, unit: "ng/mL", minRange: 30, maxRange: 100 },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-on-surface mb-2">
            {t("title")}
          </h1>
          <p className="text-lg text-on-surface-variant font-medium">
            View your health passport and recent lab results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <HealthPassport bloodType={mockHealthData.bloodType} allergies={mockHealthData.allergies} />
          </div>

          <div className="md:col-span-2">
            <Card variant="elevated" className="p-6">
              <h3 className="text-xl font-bold text-on-surface mb-6">{t("labResults")}</h3>
              <LabResultsTable results={mockLabResults} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
