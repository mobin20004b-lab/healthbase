import { setRequestLocale } from 'next-intl/server';
import { HealthPassport } from '@/web/components/patient/records/HealthPassport';
import { LabResultsTable, LabResult } from '@/web/components/patient/records/LabResultsTable';

export default async function MedicalRecordsPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);

    // Mock data for Health Passport
    const healthPassportData = {
        bloodType: "O+",
        allergies: ["Penicillin", "Peanuts"],
        majorConditions: ["Type 2 Diabetes", "Hypertension"],
        emergencyContact: {
            name: "Jane Doe",
            phone: "+1 (555) 123-4567",
            relation: "Spouse"
        }
    };

    // Mock data for Lab Results
    const labResultsData: LabResult[] = [
        {
            id: "1",
            testName: "Hemoglobin A1c",
            result: 6.8,
            unit: "%",
            minNormal: 4.0,
            maxNormal: 5.6,
            date: "2023-10-15"
        },
        {
            id: "2",
            testName: "LDL Cholesterol",
            result: 110,
            unit: "mg/dL",
            minNormal: 0,
            maxNormal: 99,
            date: "2023-10-15"
        },
        {
            id: "3",
            testName: "HDL Cholesterol",
            result: 55,
            unit: "mg/dL",
            minNormal: 40,
            maxNormal: 60,
            date: "2023-10-15"
        },
        {
            id: "4",
            testName: "Triglycerides",
            result: 140,
            unit: "mg/dL",
            minNormal: 0,
            maxNormal: 149,
            date: "2023-10-15"
        },
        {
            id: "5",
            testName: "Fasting Glucose",
            result: 105,
            unit: "mg/dL",
            minNormal: 70,
            maxNormal: 99,
            date: "2023-10-15"
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-black text-on-surface mb-2">
                        Medical Records
                    </h1>
                    <p className="text-lg text-on-surface-variant font-medium">
                        Your secure health history and lab results.
                    </p>
                </div>

                <div className="space-y-8">
                    <section>
                        <HealthPassport {...healthPassportData} />
                    </section>

                    <section>
                        <LabResultsTable results={labResultsData} />
                    </section>
                </div>

            </div>
        </div>
    );
}
