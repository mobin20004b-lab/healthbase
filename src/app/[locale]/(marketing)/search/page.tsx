import SearchPageContent from './page-content';
import { getClinics } from '@/lib/services/clinics';
import { auth } from '@/auth';

// Force dynamic rendering because we use searchParams and DB calls
export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
};

export default async function SearchPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const page = parseInt(typeof searchParams.page === 'string' ? searchParams.page : '1');
  const limit = 20;
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const city = typeof searchParams.city === 'string' ? searchParams.city : undefined;
  const province = typeof searchParams.province === 'string' ? searchParams.province : undefined;
  const specialty = typeof searchParams.specialty === 'string' ? searchParams.specialty : undefined;
  const insurance = typeof searchParams.insurance === 'string' ? searchParams.insurance : undefined;
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';

  const session = await auth();

  let result = {
    data: [],
    meta: { page: 1, limit: 20, total: 0, totalPages: 0 }
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result = await getClinics({
      page,
      limit,
      q,
      city,
      province,
      specialty,
      insurance,
      sort,
      lang: params.locale,
      userId: session?.user?.id
    }) as any;
  } catch (error) {
    console.error("Failed to fetch clinics (likely DB connection issue):", error);
    // In production, we might want to throw or show an error page.
    // For now, return empty result to allow UI to render.
  }

  return <SearchPageContent clinics={result.data} meta={result.meta} />;
}
