import React from 'react';
import { getClinicsByIds } from '@/services/clinics';
import { CompareTable } from '@/web/components/clinics/CompareTable';
import { Button } from '@/web/components/ui/button';
import { Link } from '@/routing';
import { ArrowLeft } from 'lucide-react';

interface ComparePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const idsParam = params.ids;

  let ids: string[] = [];
  if (typeof idsParam === 'string') {
    ids = idsParam.split(',').filter(Boolean);
  }

  const clinics = await getClinicsByIds(ids);

  // Serialize clinics to remove Dates and pass clean objects to Client Component
  const serializableClinics = JSON.parse(JSON.stringify(clinics));

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/search">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
           <h1 className="text-3xl font-bold text-on-surface">Compare Clinics</h1>
           <p className="text-on-surface-variant">Comparing {clinics.length} selected clinics</p>
        </div>
      </div>

      <CompareTable clinics={serializableClinics} />
    </div>
  );
}
