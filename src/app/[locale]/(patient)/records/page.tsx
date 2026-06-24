import { setRequestLocale } from 'next-intl/server';
import { HealthPassport } from '@/web/components/patient/records/HealthPassport';
import { LabResultsTable } from '@/web/components/patient/records/LabResultsTable';

export default async function MedicalRecords({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  setRequestLocale(locale);

  // This is a server component, useTranslations can be used here or we can just render the components
  // The components themselves are client components that use useTranslations

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-on-surface mb-2">
            Medical Records
          </h1>
          <p className="text-lg text-on-surface-variant font-medium">
            View your health passport and lab results.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <HealthPassport />
          </div>
          <div className="md:col-span-2">
            <LabResultsTable />
          </div>
        </div>

      </div>
    </div>
  );
}
