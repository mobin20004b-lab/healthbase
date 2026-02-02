import { getClinics, GetClinicsParams } from "@/services/clinics";
import SearchFilters from "@/web/components/clinics/SearchFilters";
import SearchPageClient from "./SearchPageClient";
import { getTranslations } from "next-intl/server";

export default async function SearchPage(props: {
  searchParams: Promise<GetClinicsParams>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations("Clinics");

  // Fetch data
  const { items, total, page, limit } = await getClinics({
    ...searchParams,
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 12,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-4 py-8">
       {/* Header */}
       <div className="mb-8">
           <h1 className="text-3xl font-bold text-on-surface mb-2">{t('title')}</h1>
           <p className="text-on-surface-variant">{t('subtitle')}</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Desktop Sidebar */}
           <div className="hidden lg:block col-span-1">
               <SearchFilters />
           </div>

           {/* Main Content */}
           <div className="col-span-1 lg:col-span-3">
               <SearchPageClient
                 clinics={items}
                 totalPages={totalPages}
                 currentPage={Number(searchParams.page) || 1}
               />
           </div>
       </div>
    </div>
  );
}
