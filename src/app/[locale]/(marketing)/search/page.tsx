import { getClinics } from '@/lib/services/clinics';
import SearchPageContent from '@/web/components/clinics/search-page-content';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;

  const q = typeof params.q === 'string' ? params.q : undefined;
  const city = typeof params.city === 'string' ? params.city : undefined;
  const province = typeof params.province === 'string' ? params.province : undefined;
  const specialty = typeof params.specialty === 'string' ? params.specialty : undefined;
  const insurance = typeof params.insurance === 'string' ? params.insurance : undefined;

  const clinics = await getClinics({
    q,
    city,
    province,
    specialty,
    insurance,
  });

  return <SearchPageContent clinics={clinics} />;
}
