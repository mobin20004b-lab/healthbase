"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { MOCK_CLINICS } from '@/lib/constants/mock-data';
import { Button } from '@/web/components/ui/button';
import { ArrowLeft, Check, X, Star, Wallet, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ids = searchParams.get('ids')?.split(',') || [];

  const clinics = MOCK_CLINICS.filter((c) => ids.includes(c.id));

  if (clinics.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-on-surface mb-4">No clinics selected to compare</h1>
        <Link href="/search">
          <Button variant="filled">Back to Search</Button>
        </Link>
      </div>
    );
  }

  const removeClinic = (id: string) => {
    const newIds = ids.filter((i) => i !== id);
    if (newIds.length === 0) {
      router.push('/search');
    } else {
      router.push(`/compare?ids=${newIds.join(',')}`);
    }
  };

  return (
    <div className="min-h-screen bg-surface p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/search">
            <Button variant="text" className="gap-2 pl-0">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-on-surface hidden md:block">Compare Clinics</h1>
          <div className="w-[100px]"></div> {/* Spacer */}
        </div>

        <div className="overflow-x-auto rounded-3xl border border-outline-variant/20 shadow-sm bg-surface-container-low">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 left-0 z-20 w-48 bg-surface-container p-4 text-left font-semibold text-on-surface-variant backdrop-blur-md border-b border-outline-variant/20">
                  Features
                </th>
                {clinics.map((clinic) => (
                  <th key={clinic.id} className="min-w-[250px] bg-surface-container-low p-4 text-left border-b border-outline-variant/20 border-l relative group">
                    <Button
                      variant="text"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-on-surface-variant hover:text-error"
                      onClick={() => removeClinic(clinic.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col items-center text-center space-y-3 pt-4">
                      <div className="h-20 w-20 rounded-full overflow-hidden bg-surface-container-highest">
                         {clinic.image && <img src={clinic.image} alt={clinic.name} className="h-full w-full object-cover" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-on-surface">{clinic.name}</h3>
                        <p className="text-sm text-on-surface-variant">{clinic.city}, {clinic.country}</p>
                      </div>
                       <Button variant="filled" className="w-full rounded-full">Book Now</Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {/* Rating */}
              <tr>
                <td className="sticky left-0 bg-surface-container/50 p-4 font-medium text-on-surface backdrop-blur-sm">Rating</td>
                {clinics.map((clinic) => (
                  <td key={clinic.id} className="p-4 bg-surface-container-low border-l border-outline-variant/20">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full font-bold">
                        <Star className="h-4 w-4 fill-current" />
                        {clinic.rating}
                      </div>
                      <span className="text-sm text-on-surface-variant underline decoration-dotted cursor-help" title="Based on patient reviews">{clinic.reviewCount} reviews</span>
                    </div>
                  </td>
                ))}
              </tr>

               {/* Availability */}
               <tr>
                <td className="sticky left-0 bg-surface-container/50 p-4 font-medium text-on-surface backdrop-blur-sm">Availability</td>
                {clinics.map((clinic) => (
                  <td key={clinic.id} className="p-4 bg-surface-container-low border-l border-outline-variant/20 text-center">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                        clinic.nextAvailable === "Tomorrow" || clinic.nextAvailable?.toLowerCase().includes('tomorrow')
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                        <Calendar className="h-4 w-4" />
                        {clinic.nextAvailable}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Wait Time */}
               <tr>
                <td className="sticky left-0 bg-surface-container/50 p-4 font-medium text-on-surface backdrop-blur-sm">Avg. Wait Time</td>
                {clinics.map((clinic) => (
                  <td key={clinic.id} className="p-4 bg-surface-container-low border-l border-outline-variant/20 text-center">
                    <div className="flex flex-col items-center gap-1">
                        <Clock className="h-5 w-5 text-on-surface-variant" />
                        <span className="font-medium">{clinic.waitTime}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Cost */}
              <tr>
                <td className="sticky left-0 bg-surface-container/50 p-4 font-medium text-on-surface backdrop-blur-sm">Price Level</td>
                {clinics.map((clinic) => (
                  <td key={clinic.id} className="p-4 bg-surface-container-low border-l border-outline-variant/20 text-center">
                    <div className="flex items-center justify-center gap-1 text-primary font-bold text-lg">
                        <Wallet className="h-5 w-5 mr-1" />
                        {clinic.cost}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Specialties */}
              <tr>
                <td className="sticky left-0 bg-surface-container/50 p-4 font-medium text-on-surface backdrop-blur-sm">Specialties</td>
                {clinics.map((clinic) => (
                  <td key={clinic.id} className="p-4 bg-surface-container-low border-l border-outline-variant/20">
                     <div className="flex flex-wrap justify-center gap-2">
                        {clinic.specialties?.map(s => (
                            <span key={s} className="px-2 py-1 bg-surface-container text-xs rounded-md text-on-surface-variant">{s}</span>
                        ))}
                     </div>
                  </td>
                ))}
              </tr>

              {/* Insurance */}
              <tr>
                <td className="sticky left-0 bg-surface-container/50 p-4 font-medium text-on-surface backdrop-blur-sm">Insurance</td>
                {clinics.map((clinic) => (
                  <td key={clinic.id} className="p-4 bg-surface-container-low border-l border-outline-variant/20 text-center">
                      <div className="text-sm text-on-surface-variant space-y-1">
                        {clinic.insurances?.map(i => (
                            <div key={i}>{i}</div>
                        ))}
                     </div>
                  </td>
                ))}
              </tr>

               {/* Verification */}
               <tr>
                <td className="sticky left-0 bg-surface-container/50 p-4 font-medium text-on-surface backdrop-blur-sm">Verification</td>
                {clinics.map((clinic) => (
                  <td key={clinic.id} className="p-4 bg-surface-container-low border-l border-outline-variant/20 text-center">
                      {clinic.isVerified ? (
                          <div className="flex flex-col items-center text-primary gap-1">
                              <ShieldCheck className="h-6 w-6" />
                              <span className="text-xs font-medium">Verified Clinic</span>
                          </div>
                      ) : (
                          <span className="text-on-surface-variant/50 text-sm">-</span>
                      )}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
