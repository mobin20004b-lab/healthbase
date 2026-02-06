import { getClinicsByIds } from "@/services/clinics";
import CompareTable from "@/web/components/clinics/CompareTable";
import { Link } from "@/routing";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/web/components/ui/button";
import { getTranslations } from "next-intl/server";

interface ComparePageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ ids?: string }>;
}

export default async function ComparePage({ params, searchParams }: ComparePageProps) {
    const { locale } = await params;
    const { ids } = await searchParams;
    const t = await getTranslations({ locale, namespace: "Compare" });

    if (!ids) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4 text-on-surface">{t('noSelection')}</h1>
                <p className="text-on-surface-variant mb-8">{t('selectPrompt')}</p>
                <Button asChild>
                    <Link href="/search">{t('goToSearch')}</Link>
                </Button>
            </div>
        );
    }

    const idList = ids.split(",");
    const clinics = await getClinicsByIds(idList, locale);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/search" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4">
                    <ArrowLeft className="h-4 w-4" />
                    {t('back')}
                </Link>
                <h1 className="text-4xl font-bold text-on-surface">{t('title')}</h1>
                <p className="text-on-surface-variant mt-2">{t('subtitle', { count: clinics.length })}</p>
            </div>

            {clinics.length > 0 ? (
                <CompareTable clinics={clinics} />
            ) : (
                <div className="text-center py-20 bg-surface-container-low rounded-xl">
                    <p>No clinics found with the provided IDs.</p>
                </div>
            )}
        </div>
    );
}
