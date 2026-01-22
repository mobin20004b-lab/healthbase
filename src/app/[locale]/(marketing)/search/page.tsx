
import { getClinics } from '@/lib/services/clinics';
import SearchContent from '@/web/components/clinics/search-content';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}

export default async function SearchPage({ searchParams, params }: SearchPageProps) {
  const { locale } = await params;
  const sp = await searchParams;

  const page = typeof sp.page === 'string' ? parseInt(sp.page) : 1;
  const limit = typeof sp.limit === 'string' ? parseInt(sp.limit) : 20;
  const q = typeof sp.q === 'string' ? sp.q : undefined;
  const city = typeof sp.city === 'string' ? sp.city : undefined;
  const province = typeof sp.province === 'string' ? sp.province : undefined;
  const specialty = typeof sp.specialty === 'string' ? sp.specialty : undefined;
  const insurance = typeof sp.insurance === 'string' ? sp.insurance : undefined;
  const sort = typeof sp.sort === 'string' ? sp.sort : undefined;

  const { data, meta } = await getClinics({
    page,
    limit,
    q,
    city,
    province,
    specialty,
    insurance,
    sort,
    lang: locale
  });

  return <SearchContent clinics={data} meta={meta} />;
}
