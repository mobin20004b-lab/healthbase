import React from 'react';
import { MOCK_CLINICS } from '@/lib/constants/mock-data';
import { Link } from '@/routing';
import { Button } from '@/web/components/ui/button';
import { ArrowLeft, Star, Calendar, Wallet, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ComparePage(props: Props) {
  const searchParams = await props.searchParams;
  const idsString = searchParams.ids;
  const ids = typeof idsString === 'string' ? idsString.split(',') : [];

  const selectedClinics = MOCK_CLINICS.filter(clinic => ids.includes(clinic.id));

  // Placeholder for translations
  const t = {
    back: 'Back to Search',
    title: 'Compare Clinics',
    noSelection: 'No clinics selected',
    features: 'Features',
    availability: 'Next Availability',
    rating: 'Patient Rating',
    waitTime: 'Avg. Wait Time',
    cost: 'Cost Level',
    location: 'Location',
    verified: 'Verified Status',
    specialties: 'Specialties',
    insurances: 'Insurance Accepted',
  };

  if (selectedClinics.length === 0) {
      return (
          <div className="container mx-auto py-12 px-4 text-center">
              <h1 className="text-2xl font-bold mb-4">{t.noSelection}</h1>
              <Button asChild>
                  <Link href="/search">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t.back}
                  </Link>
              </Button>
          </div>
      );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/search">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-on-surface">{t.title}</h1>
      </div>

      <div className="overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface shadow-sm">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 bg-surface-container-low">
              <th className="sticky left-0 z-10 w-48 bg-surface-container-low p-4 text-left font-semibold text-on-surface border-r border-outline-variant/10">
                {t.features}
              </th>
              {selectedClinics.map(clinic => (
                <th key={clinic.id} className="w-64 p-4 text-left align-top border-r border-outline-variant/10 last:border-r-0">
                   <div className="flex flex-col gap-3">
                       <div className="relative h-32 w-full overflow-hidden rounded-lg bg-surface-container-highest">
                           <img src={clinic.image} alt={clinic.name} className="h-full w-full object-cover" />
                       </div>
                       <div>
                           <h3 className="text-lg font-bold text-on-surface">{clinic.name}</h3>
                           <p className="text-sm text-on-surface-variant">{clinic.city}</p>
                       </div>
                   </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
             {/* Availability */}
             <tr className="hover:bg-surface-container-lowest/50">
                 <td className="sticky left-0 bg-surface p-4 font-medium text-on-surface-variant flex items-center gap-2 border-r border-outline-variant/10">
                     <Calendar className="w-4 h-4 text-primary" /> {t.availability}
                 </td>
                 {selectedClinics.map(clinic => (
                     <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                         <span className={cn(
                             "inline-flex items-center rounded-md px-2 py-1 text-sm font-medium",
                             clinic.nextAvailable === 'Tomorrow' || clinic.nextAvailable === 'Today'
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                         )}>
                             {clinic.nextAvailable}
                         </span>
                     </td>
                 ))}
             </tr>

             {/* Rating */}
             <tr className="hover:bg-surface-container-lowest/50">
                 <td className="sticky left-0 bg-surface p-4 font-medium text-on-surface-variant flex items-center gap-2 border-r border-outline-variant/10">
                     <Star className="w-4 h-4 text-yellow-500" /> {t.rating}
                 </td>
                 {selectedClinics.map(clinic => (
                     <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                         <div className="flex items-center gap-2">
                             <span className="text-lg font-bold">{clinic.rating}</span>
                             <div className="flex text-yellow-400">
                                 {[...Array(5)].map((_, i) => (
                                     <Star key={i} className={cn("w-3 h-3", i < Math.round(clinic.rating || 0) ? "fill-current" : "text-gray-300")} />
                                 ))}
                             </div>
                             <span className="text-xs text-on-surface-variant">({clinic.reviewCount})</span>
                         </div>
                     </td>
                 ))}
             </tr>

             {/* Wait Time */}
             <tr className="hover:bg-surface-container-lowest/50">
                 <td className="sticky left-0 bg-surface p-4 font-medium text-on-surface-variant flex items-center gap-2 border-r border-outline-variant/10">
                     <Clock className="w-4 h-4 text-primary" /> {t.waitTime}
                 </td>
                 {selectedClinics.map(clinic => (
                     <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                         <div className="space-y-1">
                             <span className="text-sm font-medium">{clinic.waitTime}</span>
                             <div className="h-1.5 w-full max-w-[120px] rounded-full bg-surface-container-highest">
                                 <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: clinic.waitTime?.includes('min') ? '20%' : '80%' // Mock logic
                                    }}
                                 />
                             </div>
                         </div>
                     </td>
                 ))}
             </tr>

             {/* Cost */}
             <tr className="hover:bg-surface-container-lowest/50">
                 <td className="sticky left-0 bg-surface p-4 font-medium text-on-surface-variant flex items-center gap-2 border-r border-outline-variant/10">
                     <Wallet className="w-4 h-4 text-primary" /> {t.cost}
                 </td>
                 {selectedClinics.map(clinic => (
                     <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                         <div className="flex gap-1">
                             {['$', '$$', '$$$'].map((lvl) => (
                                 <span key={lvl} className={cn(
                                     "text-sm font-bold",
                                     clinic.cost && clinic.cost.length >= lvl.length ? "text-on-surface" : "text-outline-variant"
                                 )}>
                                     $
                                 </span>
                             ))}
                         </div>
                     </td>
                 ))}
             </tr>

             {/* Verified */}
             <tr className="hover:bg-surface-container-lowest/50">
                 <td className="sticky left-0 bg-surface p-4 font-medium text-on-surface-variant flex items-center gap-2 border-r border-outline-variant/10">
                     <Check className="w-4 h-4 text-primary" /> {t.verified}
                 </td>
                 {selectedClinics.map(clinic => (
                     <td key={clinic.id} className="p-4 border-r border-outline-variant/10 last:border-r-0">
                         {clinic.isVerified ? (
                             <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
                                 <Check className="w-4 h-4" /> Verified Clinic
                             </div>
                         ) : (
                             <span className="text-sm text-on-surface-variant">-</span>
                         )}
                     </td>
                 ))}
             </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
