import { MOCK_CLINICS } from '@/lib/constants/mock-data';
import { Star, Wallet, Calendar, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { useTranslations } from 'next-intl';

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const selectedIds = ids ? ids.split(',') : [];
  const selectedClinics = MOCK_CLINICS.filter((c) => selectedIds.includes(c.id!));

  if (selectedClinics.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-on-surface-variant">
        <p>No clinics selected for comparison.</p>
      </div>
    );
  }

  // Helper to render rating stars
  const renderStars = (rating: number) => {
    return (
        <div className="flex items-center gap-1">
             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
             <span className="font-medium text-on-surface">{rating}</span>
        </div>
    );
  };

  // Helper for wait time bar
  const renderWaitTime = (timeStr: string) => {
      // Very basic parsing: try to extract number
      const minutes = parseInt(timeStr) || 30;
      // Heuristic: < 15 min = good (green), < 45 = med (amber), > 45 = bad (red)
      let colorClass = "bg-green-500";
      if (minutes > 15) colorClass = "bg-amber-500";
      if (minutes > 45) colorClass = "bg-red-500";

      return (
          <div className="space-y-1">
              <span className="text-xs text-on-surface-variant">{timeStr}</span>
              <div className="h-1.5 w-24 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className={cn("h-full rounded-full", colorClass)} style={{ width: `${Math.min(minutes * 2, 100)}%` }} />
              </div>
          </div>
      )
  };

  return (
    <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-on-surface">Compare Clinics</h1>

        <div className="overflow-x-auto rounded-xl border border-outline-variant/20 shadow-sm bg-surface">
            <table className="w-full min-w-[800px] border-collapse">
                <thead>
                    <tr className="border-b border-outline-variant/20">
                        <th className="sticky left-0 z-10 w-48 bg-surface-container p-4 text-left font-semibold text-on-surface shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                            Clinic
                        </th>
                        {selectedClinics.map(clinic => (
                            <th key={clinic.id} className="min-w-[250px] p-4 align-top text-left">
                                <div className="space-y-3">
                                    <div className="h-32 w-full overflow-hidden rounded-lg bg-surface-container-highest">
                                        {clinic.image ? (
                                            <img src={clinic.image} alt={clinic.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center"><MapPin className="h-8 w-8 text-on-surface-variant/20"/></div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-on-surface">{clinic.name}</h3>
                                        <p className="text-sm text-on-surface-variant">{clinic.city}, {clinic.province}</p>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                    {/* Availability */}
                    <tr>
                        <td className="sticky left-0 z-10 bg-surface-container/50 p-4 font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Next Available
                            </div>
                        </td>
                         {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-4">
                                <span className={cn(
                                    "inline-flex items-center rounded-md px-2 py-1 text-sm font-medium",
                                    (clinic.nextAvailable?.toLowerCase().includes('tomorrow') || clinic.nextAvailable?.toLowerCase().includes('today'))
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                )}>
                                    {clinic.nextAvailable}
                                </span>
                            </td>
                         ))}
                    </tr>

                    {/* Rating & Wait Time */}
                    <tr>
                         <td className="sticky left-0 z-10 bg-surface-container/50 p-4 font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                Rating & Wait
                            </div>
                        </td>
                         {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        {renderStars(clinic.rating || 0)}
                                        <span className="text-xs text-on-surface-variant">({clinic.reviewCount} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-on-surface-variant" />
                                        {renderWaitTime(clinic.waitTime || "30 min")}
                                    </div>
                                </div>
                            </td>
                         ))}
                    </tr>

                     {/* Cost */}
                     <tr>
                         <td className="sticky left-0 z-10 bg-surface-container/50 p-4 font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                            <div className="flex items-center gap-2">
                                <Wallet className="h-4 w-4" />
                                Cost Level
                            </div>
                        </td>
                         {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-4">
                                <div className="font-semibold text-on-surface">{clinic.cost}</div>
                            </td>
                         ))}
                    </tr>

                     {/* Services */}
                     <tr>
                         <td className="sticky left-0 z-10 bg-surface-container/50 p-4 font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] align-top">
                             Services
                        </td>
                         {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-4 align-top">
                                <div className="flex flex-wrap gap-1">
                                    {clinic.serviceCategories?.map(s => (
                                        <span key={s} className="inline-flex items-center rounded-full border border-outline-variant px-2 py-0.5 text-xs text-on-surface-variant">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </td>
                         ))}
                    </tr>

                     {/* Insurance */}
                     <tr>
                         <td className="sticky left-0 z-10 bg-surface-container/50 p-4 font-medium text-on-surface-variant shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] align-top">
                             Insurance
                        </td>
                         {selectedClinics.map(clinic => (
                            <td key={clinic.id} className="p-4 align-top">
                                <div className="flex flex-wrap gap-1">
                                    {clinic.insurances?.map(s => (
                                        <span key={s} className="inline-flex items-center rounded-md bg-surface-container-high px-2 py-1 text-xs text-on-surface">
                                            {s}
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
