import { setRequestLocale } from 'next-intl/server';
import { HealthPassport } from '@/web/components/patient/records/HealthPassport';
import { LabResultsTable } from '@/web/components/patient/records/LabResultsTable';

export default async function MedicalRecordsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-on-surface mb-2">
            Medical Records
          </h1>
          <p className="text-lg text-on-surface-variant font-medium">
            View your health passport and lab results.
          </p>
        </div>

        <div className="space-y-8">
          <HealthPassport />
          <LabResultsTable />
        </div>
      </div>
    </div>
  );
}
