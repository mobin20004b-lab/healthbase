import { CompareTable } from '@/web/components/clinics/CompareTable';
import { getClinicsByIds } from '@/services/clinics';
import { buttonVariants } from '@/web/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/routing';
import { cn } from '@/lib/utils';

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const idArray = ids ? ids.split(',') : [];
  const clinics = await getClinicsByIds(idArray);

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <Link
                href="/search"
                className={cn(
                    buttonVariants({ variant: "text" }),
                    "mb-4 pl-0 gap-2 hover:bg-transparent text-primary inline-flex"
                )}
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Search
            </Link>
            <h1 className="text-3xl font-bold text-on-surface mb-2">Compare Clinics</h1>
            <p className="text-on-surface-variant">
                Comparing {clinics.length} clinic{clinics.length !== 1 ? 's' : ''} side by side.
            </p>
        </div>
        <CompareTable clinics={clinics} />
      </div>
    </div>
  );
}
