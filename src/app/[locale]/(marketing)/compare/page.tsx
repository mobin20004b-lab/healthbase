import { MOCK_CLINICS } from '@/lib/constants/mock-data';
import { Button } from '@/web/components/ui/button';
import { Star, Clock, Calendar, Check, ArrowLeft, Building2, BadgeCheck } from 'lucide-react';
import { Link } from '@/routing';

// This is a Server Component
export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const clinicIds = ids?.split(',') || [];
  const clinics = MOCK_CLINICS.filter((c) => clinicIds.includes(c.id));

  // If no clinics selected, show empty state
  if (clinics.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4 text-on-surface">No clinics selected</h1>
        <p className="text-on-surface-variant mb-8">Please select clinics from the search page to compare.</p>
        <Link href="/search">
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/search" className="inline-flex items-center text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Link>
        <h1 className="text-3xl font-bold text-on-surface">Compare Clinics</h1>
      </div>

      <div className="overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="p-4 min-w-[200px] sticky left-0 bg-surface-container-low z-10 border-b border-r border-outline-variant/20">
                <span className="font-bold text-on-surface-variant">Features</span>
              </th>
              {clinics.map((clinic) => (
                <th key={clinic.id} className="p-4 min-w-[250px] border-b border-outline-variant/20 align-top">
                  <div className="space-y-3">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden bg-surface-container-highest">
                      {clinic.image ? (
                        <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="w-12 h-12 text-on-surface-variant/20" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
                        {clinic.name}
                        {clinic.isVerified && <BadgeCheck className="w-4 h-4 text-primary" />}
                      </h3>
                      <p className="text-sm text-on-surface-variant">{clinic.city}, {clinic.province}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {/* Rating */}
            <tr>
              <td className="p-4 sticky left-0 bg-surface z-10 border-r border-outline-variant/20 font-medium text-on-surface">Rating</td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4 bg-surface">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-surface-container-highest rounded-md px-2 py-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-bold">{clinic.rating}</span>
                    </div>
                    <span className="text-sm text-on-surface-variant">({clinic.reviewCount} reviews)</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Next Available */}
            <tr>
              <td className="p-4 sticky left-0 bg-surface z-10 border-r border-outline-variant/20 font-medium text-on-surface">Availability</td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4 bg-surface">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className={clinic.nextAvailable === 'Tomorrow' || clinic.nextAvailable === 'Today' ? "text-green-600 font-medium" : "text-on-surface"}>
                      {clinic.nextAvailable}
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Wait Time */}
            <tr>
              <td className="p-4 sticky left-0 bg-surface z-10 border-r border-outline-variant/20 font-medium text-on-surface">Avg. Wait Time</td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4 bg-surface">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-on-surface-variant" />
                    <span>{clinic.waitTime}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Cost */}
            <tr>
              <td className="p-4 sticky left-0 bg-surface z-10 border-r border-outline-variant/20 font-medium text-on-surface">Cost Range</td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4 bg-surface font-medium text-on-surface">
                  {clinic.cost}
                </td>
              ))}
            </tr>

            {/* Insurance */}
            <tr>
              <td className="p-4 sticky left-0 bg-surface z-10 border-r border-outline-variant/20 font-medium text-on-surface align-top">Insurance</td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4 bg-surface align-top">
                  <div className="flex flex-wrap gap-1">
                    {clinic.insurances?.map((ins, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-1 rounded-md bg-surface-container text-xs text-on-surface-variant border border-outline-variant/20">
                        {ins.name}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Services */}
            <tr>
              <td className="p-4 sticky left-0 bg-surface z-10 border-r border-outline-variant/20 font-medium text-on-surface align-top">Services</td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4 bg-surface align-top">
                  <ul className="list-disc list-inside text-sm text-on-surface space-y-1">
                    {clinic.serviceCategories?.slice(0, 5).map((service, i) => (
                      <li key={i}>{service}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr className="bg-surface-container-low">
              <td className="p-4 sticky left-0 bg-surface-container-low z-10 border-r border-outline-variant/20"></td>
              {clinics.map((clinic) => (
                <td key={clinic.id} className="p-4">
                  <Button className="w-full">
                    Book Now
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
