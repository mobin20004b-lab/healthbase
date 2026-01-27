import { MOCK_CLINICS } from '@/lib/constants/mock-data';
import { Button } from '@/web/components/ui/button';
import { Link } from '@/routing';
import { ArrowLeft, Star, Wallet, Clock, Calendar, Check, X, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const selectedIds = ids?.split(',') || [];
  const clinics = MOCK_CLINICS.filter((c) => selectedIds.includes(c.id));

  if (clinics.length === 0) {
      return (
          <div className="container mx-auto py-12 px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-4 text-on-surface">No clinics selected to compare</h1>
              <p className="text-on-surface-variant mb-8">Please go back to the search page and select clinics to compare.</p>
              <Button asChild variant="filled">
                  <Link href="/search">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Search
                  </Link>
              </Button>
          </div>
      );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
        <div className="flex items-center gap-4">
             <Button asChild variant="outlined" size="icon" className="rounded-full">
                  <Link href="/search">
                      <ArrowLeft className="h-4 w-4" />
                  </Link>
             </Button>
             <div>
                 <h1 className="text-3xl font-bold text-on-surface">Compare Clinics</h1>
                 <p className="text-on-surface-variant">Comparing {clinics.length} selected clinics</p>
             </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-outline-variant/50 bg-surface shadow-sm">
            <table className="w-full border-collapse min-w-[800px]">
                <thead>
                    <tr>
                        <th className="p-6 text-left min-w-[200px] bg-surface-container-low sticky left-0 z-10 border-b border-r border-outline-variant/20">
                            <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Clinic</span>
                        </th>
                        {clinics.map(clinic => (
                            <th key={clinic.id} className="p-6 text-left min-w-[250px] border-b border-outline-variant/20 bg-surface">
                                <div className="space-y-3">
                                    <div className="relative h-32 w-full rounded-xl overflow-hidden bg-surface-container-highest">
                                        <Image
                                            src={clinic.image || ''}
                                            alt={clinic.name || 'Clinic'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-on-surface line-clamp-1">{clinic.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-on-surface-variant mt-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            <span>{clinic.city}</span>
                                        </div>
                                    </div>
                                    <Button asChild className="w-full" variant="outlined" size="sm">
                                        <Link href={`/clinics/${clinic.id}`}>View Profile</Link>
                                    </Button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                    {/* Rating */}
                    <tr>
                        <td className="p-6 bg-surface-container-low sticky left-0 z-10 border-r border-outline-variant/20 font-medium text-on-surface">
                            Rating & Reviews
                        </td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-6 bg-surface">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-md text-yellow-700 dark:text-yellow-400 font-bold">
                                        <Star className="h-4 w-4 fill-current" />
                                        {clinic.rating.toFixed(1)}
                                    </div>
                                    <span className="text-sm text-on-surface-variant underline decoration-dotted">
                                        {clinic.reviewCount} reviews
                                    </span>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Availability */}
                    <tr>
                        <td className="p-6 bg-surface-container-low sticky left-0 z-10 border-r border-outline-variant/20 font-medium text-on-surface">
                            Next Available
                        </td>
                        {clinics.map(clinic => {
                            const isSooner = clinic.nextAvailable.toLowerCase().includes('tomorrow') || clinic.nextAvailable.toLowerCase().includes('today');
                            return (
                                <td key={clinic.id} className="p-6 bg-surface">
                                    <div className={cn(
                                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
                                        isSooner
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                    )}>
                                        <Calendar className="h-4 w-4" />
                                        {clinic.nextAvailable}
                                    </div>
                                </td>
                            );
                        })}
                    </tr>

                    {/* Wait Time */}
                    <tr>
                        <td className="p-6 bg-surface-container-low sticky left-0 z-10 border-r border-outline-variant/20 font-medium text-on-surface">
                            Avg. Wait Time
                        </td>
                        {clinics.map(clinic => {
                             // Normalize wait time for bar (max 60 mins assumption)
                             const percentage = Math.min((clinic.waitTime / 60) * 100, 100);
                             // Color scale
                             const colorClass = clinic.waitTime < 20 ? "bg-green-500" : clinic.waitTime < 45 ? "bg-amber-500" : "bg-red-500";

                             return (
                                <td key={clinic.id} className="p-6 bg-surface">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-on-surface font-medium">
                                            <Clock className="h-4 w-4 text-on-surface-variant" />
                                            {clinic.waitTime} mins
                                        </div>
                                        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full", colorClass)}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                            );
                        })}
                    </tr>

                    {/* Cost */}
                    <tr>
                        <td className="p-6 bg-surface-container-low sticky left-0 z-10 border-r border-outline-variant/20 font-medium text-on-surface">
                            Cost Level
                        </td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-6 bg-surface">
                                <div className="flex items-center gap-2 text-on-surface font-medium">
                                    <Wallet className="h-4 w-4 text-on-surface-variant" />
                                    {clinic.cost}
                                </div>
                            </td>
                        ))}
                    </tr>

                     {/* Verified */}
                     <tr>
                        <td className="p-6 bg-surface-container-low sticky left-0 z-10 border-r border-outline-variant/20 font-medium text-on-surface">
                            Verified Clinic
                        </td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-6 bg-surface">
                                {clinic.isVerified ? (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <Check className="h-5 w-5" />
                                        <span className="text-sm font-medium">Verified</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-on-surface-variant/50">
                                        <X className="h-5 w-5" />
                                        <span className="text-sm">Not verified</span>
                                    </div>
                                )}
                            </td>
                        ))}
                    </tr>

                     {/* Insurance */}
                     <tr>
                        <td className="p-6 bg-surface-container-low sticky left-0 z-10 border-r border-outline-variant/20 font-medium text-on-surface align-top">
                            Insurance Accepted
                        </td>
                        {clinics.map(clinic => (
                            <td key={clinic.id} className="p-6 bg-surface align-top">
                                <div className="flex flex-wrap gap-2">
                                    {clinic.insurances.map(ins => (
                                        <span key={ins} className="inline-flex items-center px-2 py-1 rounded-md bg-surface-container border border-outline-variant text-xs text-on-surface-variant">
                                            {ins}
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
