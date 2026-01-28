import { MOCK_CLINICS } from '@/lib/constants/mock-data';
// import { Card } from '@/web/components/ui/card';
import { Button } from '@/web/components/ui/button';
import { Check, ArrowLeft } from 'lucide-react';
import { Link } from '@/routing';

interface ComparePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedSearchParams = await searchParams;
  const idsParam = resolvedSearchParams.ids;
  const ids = typeof idsParam === 'string' ? idsParam.split(',') : [];

  const clinics = MOCK_CLINICS.filter(c => ids.includes(c.id));

  // Mock translations
  const t = (key: string) => {
       const messages: Record<string, string> = {
          title: 'Compare Clinics',
          backToSearch: 'Back to Search',
          empty: 'No clinics selected for comparison.',
          attributes: 'Attributes',
          rating: 'Rating',
          nextAvailable: 'Next Available',
          waitTime: 'Avg. Wait Time',
          cost: 'Consultation Cost',
          insurance: 'Insurance Accepted',
          specialties: 'Specialties',
          services: 'Services',
          verified: 'Verified',
       };
       return messages[key] || key;
  };

  if (clinics.length === 0) {
      return (
          <div className="container mx-auto py-12 px-4 text-center">
              <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
              <p className="text-on-surface-variant mb-6">{t('empty')}</p>
              <Button asChild>
                  <Link href="/search">{t('backToSearch')}</Link>
              </Button>
          </div>
      );
  }

  return (
    <div className="container mx-auto py-8 px-4">
       <div className="mb-6">
           <Button variant="ghost" asChild className="pl-0 gap-2 hover:bg-transparent hover:text-primary">
               <Link href="/search">
                   <ArrowLeft className="h-4 w-4" />
                   {t('backToSearch')}
               </Link>
           </Button>
       </div>

       <h1 className="text-3xl font-bold text-on-surface mb-8">{t('title')}</h1>

       <div className="overflow-x-auto pb-4">
           <table className="w-full min-w-[600px] border-collapse">
               <thead>
                   <tr>
                       <th className="p-4 text-left min-w-[200px] bg-surface-container sticky left-0 z-10 border-b border-outline-variant/20">
                           {t('attributes')}
                       </th>
                       {clinics.map(clinic => (
                           <th key={clinic.id} className="p-4 text-left min-w-[250px] border-b border-outline-variant/20 bg-surface-container/50">
                               <div className="flex flex-col gap-2">
                                   <div className="h-24 w-full overflow-hidden rounded-xl bg-surface-variant">
                                       <img src={clinic.image} alt={clinic.name} className="h-full w-full object-cover" />
                                   </div>
                                   <span className="text-lg font-bold text-on-surface">{clinic.name}</span>
                                   <span className="text-sm text-on-surface-variant">{clinic.city}, {clinic.province}</span>
                               </div>
                           </th>
                       ))}
                   </tr>
               </thead>
               <tbody className="divide-y divide-outline-variant/20">
                   {/* Rating */}
                   <tr>
                       <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface">{t('rating')}</td>
                       {clinics.map(clinic => (
                           <td key={clinic.id} className="p-4">
                               <div className="flex items-center gap-1">
                                   <span className="font-bold text-lg">{clinic.rating}</span>
                                   <span className="text-sm text-on-surface-variant">({clinic.reviewCount})</span>
                               </div>
                           </td>
                       ))}
                   </tr>

                   {/* Verified */}
                   <tr>
                       <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface">{t('verified')}</td>
                       {clinics.map(clinic => (
                           <td key={clinic.id} className="p-4">
                               {clinic.isVerified ? (
                                   <span className="inline-flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded-md text-xs font-bold">
                                       <Check className="h-3 w-3" /> Verified
                                   </span>
                               ) : (
                                   <span className="text-on-surface-variant/50">-</span>
                               )}
                           </td>
                       ))}
                   </tr>

                   {/* Next Available */}
                    <tr>
                       <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface">{t('nextAvailable')}</td>
                       {clinics.map(clinic => (
                           <td key={clinic.id} className="p-4 font-medium text-green-600 dark:text-green-400">
                               {clinic.nextAvailable}
                           </td>
                       ))}
                   </tr>

                   {/* Wait Time */}
                   <tr>
                       <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface">{t('waitTime')}</td>
                       {clinics.map(clinic => (
                           <td key={clinic.id} className="p-4">
                               {clinic.waitTime}
                           </td>
                       ))}
                   </tr>

                   {/* Cost */}
                   <tr>
                       <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface">{t('cost')}</td>
                       {clinics.map(clinic => (
                           <td key={clinic.id} className="p-4">
                               {clinic.cost}
                           </td>
                       ))}
                   </tr>

                    {/* Insurance */}
                   <tr>
                       <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface align-top">{t('insurance')}</td>
                       {clinics.map(clinic => (
                           <td key={clinic.id} className="p-4 align-top">
                               <div className="flex flex-wrap gap-1">
                                   {clinic.insurances?.map(ins => (
                                       <span key={ins} className="px-2 py-0.5 rounded-full bg-surface-variant text-xs text-on-surface-variant border border-outline-variant/50">
                                           {ins}
                                       </span>
                                   ))}
                               </div>
                           </td>
                       ))}
                   </tr>

                    {/* Specialties */}
                   <tr>
                       <td className="p-4 font-bold text-on-surface-variant sticky left-0 z-10 bg-surface align-top">{t('specialties')}</td>
                       {clinics.map(clinic => (
                           <td key={clinic.id} className="p-4 align-top">
                               <div className="flex flex-wrap gap-1">
                                   {clinic.specialties?.map(spec => (
                                       <span key={spec} className="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-xs border border-primary/20">
                                           {spec}
                                       </span>
                                   ))}
                               </div>
                           </td>
                       ))}
                   </tr>
               </tbody>
           </table>
       </div>
    </div>
  );
}
