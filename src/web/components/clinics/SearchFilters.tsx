'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useRouter } from '@/routing'; // Localized router
import { useSearchParams } from 'next/navigation';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Card } from '@/web/components/ui/card';
import { Checkbox } from '@/web/components/ui/checkbox';
import { getProvinces, getCities } from '@/lib/constants/locations';

// Constants for filters
const SPECIALTIES = ['Dentistry', 'Cardiology', 'Dermatology', 'Neurology'];
const INSURANCES = ['Salamat', 'Tamin', 'NiroohayeMosallah'];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SearchFiltersProps {
    // locale: string;
}

export default function SearchFilters({}: SearchFiltersProps) {
    const t = useTranslations('Clinics');
    const router = useRouter();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get('city') || '');
    const [province, setProvince] = useState(searchParams.get('province') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');

    // Parse multi-select filters from URL (comma-separated)
    const [specialties, setSpecialties] = useState<string[]>([]);
    const [insurances, setInsurances] = useState<string[]>([]);

    useEffect(() => {
        const specialtyParam = searchParams.get('specialty');
        setSpecialties(specialtyParam ? specialtyParam.split(',') : []);

        const insuranceParam = searchParams.get('insurance');
        setInsurances(insuranceParam ? insuranceParam.split(',') : []);
    }, [searchParams]);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (city) params.set('city', city); else params.delete('city');
        if (province) params.set('province', province); else params.delete('province');
        if (q) params.set('q', q); else params.delete('q');

        if (specialties.length > 0) params.set('specialty', specialties.join(','));
        else params.delete('specialty');

        if (insurances.length > 0) params.set('insurance', insurances.join(','));
        else params.delete('insurance');

        // useRouter from next-intl automatically handles locale prefix
        // Note: The page is currently at /search, but the router points to /clinics in the old code.
        // Assuming /search is the correct route based on the file path src/app/[locale]/(marketing)/search/page.tsx
        // But the previous code redirected to /clinics.
        // I will stick to /search as per file structure, unless /clinics is a rewrite.
        // The file structure shows `src/app/[locale]/(marketing)/search/page.tsx`, so the route is `/search`.
        // The previous code had `router.push(/clinics?${params.toString()});` which might be a mistake or legacy.
        // I will change it to use the current pathname or just push params.

        router.push(`/search?${params.toString()}`);
    };

    const handleClear = () => {
        setCity('');
        setProvince('');
        setQ('');
        setSpecialties([]);
        setInsurances([]);
        router.push(`/search`);
    };

    const toggleSpecialty = (value: string) => {
        setSpecialties(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const toggleInsurance = (value: string) => {
        setInsurances(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    return (
        <Card variant="bento" className="p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-on-surface">{t('filters')}</h2>
                <Button variant="ghost" size="sm" onClick={handleClear} className="font-bold">
                    {t('clearAll')}
                </Button>
            </div>

            <div className="space-y-6">
                {/* Search Input */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">{t('search')}</label>
                    <div className="relative">
                        <Input
                            type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder={t('searchPlaceholder') || 'Search...'}
                            className="pl-10 h-11"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
                    </div>
                </div>

                {/* Province Filter */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">{t('province')}</label>
                    <div className="relative">
                        <select
                            value={province}
                            onChange={(e) => {
                                setProvince(e.target.value);
                                setCity(''); // Reset city when province changes
                            }}
                            className="w-full px-4 py-2.5 bg-surface-variant/30 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-on-surface font-bold"
                        >
                            <option value="">{t('all')}</option>
                            {getProvinces().map((prov) => (
                                <option key={prov.value} value={prov.value}>
                                    {t(prov.label)}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                {/* City Filter */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">{t('city')}</label>
                    <div className="relative">
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface-variant/30 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer text-on-surface font-bold"
                            disabled={!province}
                        >
                            <option value="">{t('all')}</option>
                            {province && getCities(province).map((c) => (
                                <option key={c.value} value={c.value}>
                                    {t(c.label)}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    </div>
                </div>

                {/* Specialty Filter - Checkboxes */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('specialty')}</label>
                    <div className="space-y-3">
                        {SPECIALTIES.map((spec) => (
                            <div key={spec} className="flex items-center gap-3">
                                <Checkbox
                                    id={`spec-${spec}`}
                                    checked={specialties.includes(spec)}
                                    onCheckedChange={() => toggleSpecialty(spec)}
                                />
                                <label
                                    htmlFor={`spec-${spec}`}
                                    className="text-sm font-medium text-on-surface cursor-pointer select-none"
                                >
                                    {t(`specialties.${spec}`) !== `specialties.${spec}` ? t(`specialties.${spec}`) : spec}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insurance Filter - Checkboxes */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('insurance')}</label>
                    <div className="space-y-3">
                        {INSURANCES.map((ins) => (
                            <div key={ins} className="flex items-center gap-3">
                                <Checkbox
                                    id={`ins-${ins}`}
                                    checked={insurances.includes(ins)}
                                    onCheckedChange={() => toggleInsurance(ins)}
                                />
                                <label
                                    htmlFor={`ins-${ins}`}
                                    className="text-sm font-medium text-on-surface cursor-pointer select-none"
                                >
                                    {t(`insurances.${ins}`) !== `insurances.${ins}` ? t(`insurances.${ins}`) : ins}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleSearch}
                    className="w-full h-12 text-base mt-4"
                >
                    {t('applyFilters')}
                </Button>
            </div>
        </Card>
    );
}
