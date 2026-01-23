import { getClinics } from '@/lib/services/clinics';
import { SearchResults } from '@/web/components/clinics/SearchResults';
import { auth } from '@/auth';

interface SearchPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        page?: string;
        limit?: string;
        city?: string;
        province?: string;
        specialty?: string;
        insurance?: string;
        q?: string;
        sort?: string;
    }>;
}

export default async function SearchPage(props: SearchPageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const session = await auth();

    const page = parseInt(searchParams.page || '1');
    const limit = parseInt(searchParams.limit || '20');

    const { data, meta } = await getClinics({
        page,
        limit,
        city: searchParams.city,
        province: searchParams.province,
        specialty: searchParams.specialty,
        insurance: searchParams.insurance,
        q: searchParams.q,
        sort: searchParams.sort,
        lang: params.locale,
        userId: session?.user?.id
    });

    return <SearchResults data={data} meta={meta} />;
}
