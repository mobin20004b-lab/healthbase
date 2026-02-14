
import { getClinicById } from "@/services/clinics";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ClinicHeader } from "@/web/components/clinics/detail/clinic-header";
import { ClinicServices } from "@/web/components/clinics/detail/clinic-services";
import { ClinicInsurance } from "@/web/components/clinics/detail/clinic-insurance";
import { ClinicReviews } from "@/web/components/clinics/detail/clinic-reviews";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id, locale } = await params;
    const clinic = await getClinicById(id, locale);

    if (!clinic) {
        return {
            title: 'Clinic Not Found | TopMedica',
        };
    }

    return {
        title: `${clinic.name} | TopMedica`,
        description: clinic.description || `Find verified healthcare at ${clinic.name}.`,
    };
}

export default async function ClinicDetailPage({ params }: Props) {
    const { id, locale } = await params;
    setRequestLocale(locale);

    const clinic = await getClinicById(id, locale);

    if (!clinic) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <ClinicHeader clinic={clinic} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <ClinicServices clinic={clinic} />
                    <ClinicReviews clinic={clinic} />
                </div>
                <div className="space-y-6">
                    <ClinicInsurance clinic={clinic} />
                </div>
            </div>
        </div>
    );
}
