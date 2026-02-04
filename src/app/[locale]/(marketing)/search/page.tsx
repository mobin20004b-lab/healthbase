
import { getClinics } from '@/services/clinics';
import SearchFilters from '@/web/components/clinics/SearchFilters';
import SearchContent from '@/web/components/clinics/SearchContent';
import { auth } from '@/auth';

interface SearchPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
    const { locale } = await params;
    const sp = await searchParams;
    const session = await auth();

    const { data, meta } = await getClinics(sp, locale, session?.user?.id);

    return (
        <div className="relative flex h-[calc(100vh-64px)] overflow-hidden">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden w-80 shrink-0 border-r border-outline-variant/20 overflow-y-auto p-4 lg:block">
                <SearchFilters />
            </div>

            {/* Main Content Area */}
            <SearchContent clinics={data} meta={meta} />
        </div>
    );
}
