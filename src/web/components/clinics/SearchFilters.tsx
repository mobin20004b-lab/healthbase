'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from '@/routing';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Card } from '@/web/components/ui/card';
import { Checkbox } from '@/web/components/ui/checkbox';
import { getProvinces, getCities } from '@/lib/constants/locations';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SearchFiltersProps {
    // locale: string;
}

export default function SearchFilters({}: SearchFiltersProps) {
    const t = useTranslations('Clinics');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get('city') || '');
    const [province, setProvince] = useState(searchParams.get('province') || '');
    const [q, setQ] = useState(searchParams.get('q') || '');

    // Multi-select states
    const [specialties, setSpecialties] = useState<string[]>(searchParams.getAll('specialty'));
    const [insurances, setInsurances] = useState<string[]>(searchParams.getAll('insurance'));

    // Derived values for effect dependencies
    const urlCity = searchParams.get('city') || '';
    const urlProvince = searchParams.get('province') || '';
    const urlQ = searchParams.get('q') || '';
    // Use JSON.stringify for stable array comparison
    const urlSpecialties = searchParams.getAll('specialty');
    const urlInsurances = searchParams.getAll('insurance');
    const specialtiesKey = JSON.stringify(urlSpecialties.sort());
    const insurancesKey = JSON.stringify(urlInsurances.sort());

    // Update state when URL changes (e.g. back button)
    useEffect(() => {
        setCity(urlCity);
        setProvince(urlProvince);
        setQ(urlQ);
        setSpecialties(urlSpecialties);
        setInsurances(urlInsurances);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlCity, urlProvince, urlQ, specialtiesKey, insurancesKey]);

    const handleSearch = () => {
        const params = new URLSearchParams(); // Start fresh or copy?
        // We generally want to keep other params if any, but here we control all filters.
        // If we want to keep pagination (page=1 usually on filter change), we should reset it.

        if (city) params.set('city', city);
        if (province) params.set('province', province);
        if (q) params.set('q', q);

        specialties.forEach(s => params.append('specialty', s));
        insurances.forEach(i => params.append('insurance', i));

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClear = () => {
        setCity('');
        setProvince('');
        setQ('');
        setSpecialties([]);
        setInsurances([]);
        router.push(pathname);
    };

    const toggleSpecialty = (value: string) => {
        setSpecialties(prev =>
            prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
        );
    };

    const toggleInsurance = (value: string) => {
        setInsurances(prev =>
            prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
        );
    };

    const specialtyOptions = [
        { value: 'Dentistry', label: 'specialties.Dentistry' },
        { value: 'Cardiology', label: 'specialties.Cardiology' },
        { value: 'Dermatology', label: 'specialties.Dermatology' },
        { value: 'Neurology', label: 'specialties.Neurology' },
    ];

    const insuranceOptions = [
        { value: 'Salamat', label: 'insurances.Salamat' },
        { value: 'Tamin', label: 'insurances.Tamin' },
        { value: 'NiroohayeMosallah', label: 'insurances.NiroohayeMosallah' },
    ];

    return (
        <Card variant="bento" className="p-6 sticky top-24 h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-on-surface">{t('filters')}</h2>
                <Button variant="ghost" size="sm" onClick={handleClear} className="font-bold">
                    {t('clearAll')}
                </Button>
            </div>

            <div className="space-y-6 pb-20"> {/* pb-20 for apply button space */}
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

                {/* Specialty Filter (Checkbox Group) */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('specialty')}</label>
                    <div className="space-y-3">
                        {specialtyOptions.map((option) => (
                            <div key={option.value} className="flex items-center gap-3">
                                <Checkbox
                                    id={`specialty-${option.value}`}
                                    checked={specialties.includes(option.value)}
                                    onChange={() => toggleSpecialty(option.value)}
                                />
                                <label
                                    htmlFor={`specialty-${option.value}`}
                                    className="text-sm font-medium text-on-surface cursor-pointer select-none"
                                >
                                    {t(option.label)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insurance Filter (Checkbox Group) */}
                <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-3">{t('insurance')}</label>
                    <div className="space-y-3">
                        {insuranceOptions.map((option) => (
                            <div key={option.value} className="flex items-center gap-3">
                                <Checkbox
                                    id={`insurance-${option.value}`}
                                    checked={insurances.includes(option.value)}
                                    onChange={() => toggleInsurance(option.value)}
                                />
                                <label
                                    htmlFor={`insurance-${option.value}`}
                                    className="text-sm font-medium text-on-surface cursor-pointer select-none"
                                >
                                    {t(option.label)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sticky bottom-0 pt-4 bg-surface pb-4">
                    <Button
                        onClick={handleSearch}
                        className="w-full h-12 text-base"
                    >
                        {t('applyFilters')}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
