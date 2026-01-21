import { getClinics } from '@/lib/services/clinics';
import SearchPageContent from './page-content';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams();

  Object.entries(resolvedParams).forEach(([key, value]) => {
    if (typeof value === 'string') {
      params.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    }
  });

  const clinics = await getClinics(params);

  // Serialize dates to prevent client component errors
  // We use JSON.parse(JSON.stringify()) to strip out Dates and undefined
  // The client component will receive string dates but that's fine for display usually,
  // or we can just let it be.
  // However, Clinic type has Date fields.
  // Next.js serialization warns about Date objects.

  return <SearchPageContent initialClinics={JSON.parse(JSON.stringify(clinics))} />;
}
