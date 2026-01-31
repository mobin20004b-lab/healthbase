import { getClinics } from '@/services/clinics';
import SearchPageClient from './SearchPageClient';
import { getTranslations } from 'next-intl/server';

interface SearchPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Search' });
    return {
        title: t('title'),
    };
}

export default async function SearchPage(props: SearchPageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const page = parseInt(typeof searchParams.page === 'string' ? searchParams.page : '1');
    const limit = 20;

    const { data: clinics, meta } = await getClinics({
        page,
        limit,
        city: typeof searchParams.city === 'string' ? searchParams.city : undefined,
        province: typeof searchParams.province === 'string' ? searchParams.province : undefined,
        specialty: typeof searchParams.specialty === 'string' ? searchParams.specialty : undefined,
        insurance: typeof searchParams.insurance === 'string' ? searchParams.insurance : undefined,
        q: typeof searchParams.q === 'string' ? searchParams.q : undefined,
        sort: typeof searchParams.sort === 'string' ? searchParams.sort : undefined,
        lang: params.locale,
    });

    return (
        <SearchPageClient
            clinics={clinics}
            meta={meta}
        />
    );
}
