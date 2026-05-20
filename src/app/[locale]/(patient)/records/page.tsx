import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { HealthPassport } from '@/web/components/patient/records/HealthPassport';
import { LabResultsTable, LabResult } from '@/web/components/patient/records/LabResultsTable';

// Mock Data
const mockHealthPassport = {
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension', 'Asthma']
};

const mockLabResults: LabResult[] = [
    {
        id: '1',
        testName: 'Hemoglobin A1C',
        result: 5.4,
        unit: '%',
        rangeMin: 4.0,
        rangeMax: 5.6,
        date: '2023-10-15'
    },
    {
        id: '2',
        testName: 'LDL Cholesterol',
        result: 110,
        unit: 'mg/dL',
        rangeMin: 0,
        rangeMax: 99,
        date: '2023-10-15'
    },
    {
        id: '3',
        testName: 'Vitamin D',
        result: 45,
        unit: 'ng/mL',
        rangeMin: 30,
        rangeMax: 100,
        date: '2023-08-22'
    },
    {
        id: '4',
        testName: 'TSH',
        result: 2.1,
        unit: 'mIU/L',
        rangeMin: 0.4,
        rangeMax: 4.0,
        date: '2023-08-22'
    }
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    const t = await getTranslations({ locale, namespace: 'PatientRecords' });
    return {
        title: `${t('title')} | Topmedica`,
    };
}

export default async function PatientRecordsPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const t = await getTranslations('PatientRecords');

    // In a real app, we would fetch user profile and records here
    await auth();

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-on-surface mb-2">
                    {t('title')}
                </h1>
                <p className="text-lg text-on-surface-variant font-medium">
                    {t('subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Health Passport */}
                <div className="lg:col-span-1">
                    <HealthPassport
                        bloodType={mockHealthPassport.bloodType}
                        allergies={mockHealthPassport.allergies}
                        chronicConditions={mockHealthPassport.chronicConditions}
                    />
                </div>

                {/* Right Column: Lab Results */}
                <div className="lg:col-span-2">
                    <LabResultsTable results={mockLabResults} />
                </div>
            </div>
        </div>
    );
}
