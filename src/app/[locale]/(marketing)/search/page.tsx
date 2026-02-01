import { getClinics } from '@/services/clinics';
import SearchPageClient from './SearchPageClient';

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const city = typeof searchParams.city === 'string' ? searchParams.city : undefined;
  const province = typeof searchParams.province === 'string' ? searchParams.province : undefined;

  // Handle array or string for multi-select
  const parseArray = (val: string | string[] | undefined) => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') return [val];
      return undefined;
  };

  const specialty = parseArray(searchParams.specialty);
  const insurance = parseArray(searchParams.insurance);

  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;

  const { data: clinics, meta } = await getClinics({
    q,
    city,
    province,
    specialty,
    insurance,
    page,
    limit: 10,
  });

  return <SearchPageClient clinics={clinics} meta={meta} />;
}
