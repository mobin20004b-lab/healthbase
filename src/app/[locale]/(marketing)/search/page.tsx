import { getClinics } from '@/services/clinics';
import SearchPageClient from './SearchPageClient';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;

  const getString = (val: string | string[] | undefined) => {
    if (Array.isArray(val)) return val[0];
    return val;
  };

  const clinics = await getClinics({
    city: getString(resolvedParams.city),
    province: getString(resolvedParams.province),
    specialty: getString(resolvedParams.specialty),
    insurance: getString(resolvedParams.insurance),
    q: getString(resolvedParams.q),
  });

  return <SearchPageClient clinics={clinics} />;
}
