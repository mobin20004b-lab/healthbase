import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/auth';
import { HealthPassport } from '@/web/components/patient/records/HealthPassport';
import { LabResultsTable } from '@/web/components/patient/records/LabResultsTable';

export default async function PatientRecords({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  setRequestLocale(locale);

  const session = await auth();
  const userFirstName = session?.user?.name?.split(' ')[0] || 'Patient';

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <div className="mb-8">
            <h1 className="text-3xl font-black text-on-surface mb-2">
                Medical Records
            </h1>
            <p className="text-lg text-on-surface-variant font-medium">
                View your health history, {userFirstName}.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar / Health Passport */}
            <div className="md:col-span-1">
                <HealthPassport />
            </div>

            {/* Main Content / Lab Results */}
            <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-on-surface mb-4">Recent Lab Results</h2>
                <LabResultsTable />
            </div>
        </div>

      </div>
    </div>
  );
}
